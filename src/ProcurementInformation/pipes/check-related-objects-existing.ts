import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProcurementInformationInput } from 'src/ProcurementInformation/inputs/create-procurement-information.input';
import { UpdateProcurementInformationInput } from 'src/ProcurementInformation/inputs/update-procurement-infomation.input';
import { Product } from 'src/Product/entities/product.entity';
import { Supplier } from 'src/Supplier/entities/supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CheckProcurementInformationRelatedObjectsPipe implements PipeTransform<CreateProcurementInformationInput | UpdateProcurementInformationInput, Promise<CreateProcurementInformationInput | UpdateProcurementInformationInput>> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>
  ) { }

  async transform(value: CreateProcurementInformationInput | UpdateProcurementInformationInput): Promise<CreateProcurementInformationInput | UpdateProcurementInformationInput> {

    if (value.productId) {
      const product: Product | null = await this.productRepository.findOne({ where: { id: value.productId } })
      if (!product) {
        throw new BadRequestException("Product with such id doesn't exists!");
      }
    }

    if (value.supplierId) {
      const supplier: Supplier | null = await this.supplierRepository.findOne({ where: { id: value.supplierId } })

      if (!supplier) {
        throw new BadRequestException("Supplier with such id doesn't exists!")
      }
    }
    return value;
  }
}
