import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import * as moment from 'moment';
import { CreateFileInput } from './inputs/create-file.input';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import { UpdateFileInput } from './inputs/update-file.input';

@Injectable()
export class FileService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
  ) {
    AWS.config.update({
      accessKeyId: configService.get<string>('AWS_ACCESS_KEY'),
      secretAccessKey: configService.get<string>('AWS_ACCESS_SECRET'),
      region: configService.get<string>('AWS_REGION'),
    });

    this.s3 = new AWS.S3();
  }

  private s3: AWS.S3;

  private async uploadFile(fileName: string, fileExtension: string, file: string, folder: string) {
    const dateTimePrefix = moment().format('YYYY-MM-DD-HH-mm-ss-SSS');
    const key = `${folder}/${dateTimePrefix}_${fileName}.${fileExtension}`;
    const uploadParams: AWS.S3.PutObjectRequest = {
      Bucket: this.configService.get<string>('AWS_S3_BUCKET'),
      Key: key,
      Body: Buffer.from(file, 'base64'),
      ContentEncoding: 'base64',
    };

    try {
      await this.s3.upload(uploadParams).promise();
      return key;
    } catch (err) {
      throw new BadRequestException("File can't be uploaded!");
    }
  }

  private async deleteFile(path: string) {
    try {
      await this.s3
        .deleteObject({
          Bucket: this.configService.get<string>('AWS_S3_BUCKET'),
          Key: path,
        })
        .promise();
    } catch {
      throw new BadRequestException("File already deleted or doens't exists!");
    }
  }

  private async copyFile(oldPath: string, newPath: string): Promise<void> {
    const copyParams = {
      Bucket: this.configService.get<string>('AWS_S3_BUCKET'),
      CopySource: encodeURIComponent(`${this.configService.get<string>('AWS_S3_BUCKET')}/${oldPath}`),
      Key: newPath,
    };

    try {
      await this.s3.copyObject(copyParams).promise();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async getFile(path: string): Promise<string> {
    try {
      const object = await this.s3
        .getObject({
          Bucket: this.configService.get<string>('AWS_S3_BUCKET'),
          Key: path,
        })
        .promise();
      return object.Body.toString('base64');
    } catch {
      throw new BadRequestException("File doens't exists!");
    }
  }

  public async saveFile(fileDto: CreateFileInput, folder: string) {
    const file = new File({});
    file.fileName = fileDto.fileName;
    file.fileExtension = fileDto.fileExtension;
    file.size = fileDto.fileSize;
    file.path = await this.uploadFile(fileDto.fileName, fileDto.fileExtension, fileDto.file, folder);
    try {
      return await this.fileRepository.save(file);
    } catch {
      await this.deleteFile(file.path);
      throw new InternalServerErrorException('File uploaded but something went wrong!');
    }
  }

  public async updateFile(fileId: number, fileDto: UpdateFileInput, folder: string) {
    const file = await this.fileRepository.findOneOrFail({ where: { id: fileId } });
    if ((!fileDto.file && fileDto.file) || (!fileDto.fileSize && fileDto.file))
      throw new BadRequestException("File can't be without defined size.");

    file.fileName = fileDto.fileName || file.fileName;
    file.fileExtension = fileDto.fileExtension || file.fileExtension;

    if (file.fileName && !fileDto.file) {
      const dateTimePrefix = moment().format('YYYY-MM-DD-HH-mm-ss-SSS');
      const newPath = `${folder}/${dateTimePrefix}_${fileDto.fileName}`;
      await this.copyFile(file.path, newPath);
      await this.deleteFile(file.path);
      file.path = newPath;
    } else if (file.fileName && fileDto.file) {
      await this.deleteFile(file.path);
      file.path = await this.uploadFile(fileDto.fileName, fileDto.fileExtension, fileDto.file, folder);
    }
    file.size = fileDto.fileSize || file.size;
    return this.fileRepository.save(file);
  }

  public async removeFileRecord(fileId: number) {
    const file: File | null = await this.fileRepository.findOneBy({ id: fileId });

    if (!file) throw new NotFoundException('No file with this id!');

    await this.deleteFile(file.path);
    return await this.fileRepository.delete({ id: file.id });
  }
}
