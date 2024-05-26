import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProcurementInformation } from "src/ProcurementInformation/entities/procurement-information.entity";
import { CreateProcurementInformationInput } from "src/ProcurementInformation/inputs/create-procurement-information.input";
import { FindOptionsProcurementInformationInput } from "src/ProcurementInformation/inputs/find-options-procurement-information.input";
import { UpdateProcurementInformationInput } from "src/ProcurementInformation/inputs/update-procurement-infomation.input";
import { Product } from "src/Product/entities/product.entity";
import { ProductService } from "src/Product/product.service";
import { Supplier } from "src/Supplier/entities/supplier.entity";
import { Between, FindOptionsWhere, In, Like, Repository } from "typeorm";

@Injectable()
export class ProcurementInformationService {
   constructor(
      @InjectRepository(ProcurementInformation)
      private readonly procurementInformationRepository: Repository<ProcurementInformation>,
      @InjectRepository(Product)
      private readonly productRepository: Repository<Product>,
      @InjectRepository(Supplier)
      private readonly supplierRepository: Repository<Supplier>,
      private readonly productService: ProductService
   ) { }

   async getAllProcurementInformations(findOptions?: FindOptionsProcurementInformationInput) {
      const where: FindOptionsWhere<ProcurementInformation> = {};

      if (findOptions?.amount) {
         where.amount = Between(findOptions.amount.min || 0, findOptions.amount.max || Number.MAX_VALUE);
      }

      if (findOptions?.description) {
         where.description = Like(`%${findOptions.description}%`)
      }

      if (findOptions?.orderedDate) {
         const futureDate = new Date();
         futureDate.setFullYear(futureDate.getFullYear() + 100)
         where.deliveredDate =
            Between(findOptions.orderedDate.start || new Date(), findOptions.orderedDate.end || futureDate)
      }

      if (findOptions?.product) {
         const products = (await this.productService.getProducts(findOptions.product)).map((item) => item.id);
         where.product = { id: In(products) }
      }

      if (findOptions?.purchasePrice) {
         where.purchasePrice = Between(findOptions.purchasePrice.min || 0, findOptions.purchasePrice.max || Number.MAX_VALUE);
      }

      if (findOptions?.supplierCompanyName) {
         where.supplier = { companyName: Like(`%${findOptions.supplierCompanyName}%`) }
      }

      return this.procurementInformationRepository.find({ where: where, relations: { product: true, supplier: true } })
   }

   async createProcurementInformation(procurementInformation: CreateProcurementInformationInput) {
      const newProcurementInformation = new ProcurementInformation({
         amount: procurementInformation.amount,
         description: procurementInformation.description,
         orderedDate: procurementInformation.orderedDate,
         product: await this.productRepository.findOneOrFail({ where: { id: procurementInformation.productId } }),
         purchasePrice: procurementInformation.purchasePrice,
         supplier: await this.supplierRepository.findOneOrFail({ where: { id: procurementInformation.supplierId } })
      })

      return this.procurementInformationRepository.save(newProcurementInformation);
   }

   async updateProcurementInformation(procurementInformationId: number, procurementInformation: UpdateProcurementInformationInput) {
      const newProcurementInformation = await this.procurementInformationRepository.findOne(
         { where: { id: procurementInformationId }, relations: { product: true, supplier: true } });

      if (!newProcurementInformation) {
         throw new BadRequestException("No procurement information with such id!");
      }

      newProcurementInformation.amount = procurementInformation.amount || newProcurementInformation.amount;
      newProcurementInformation.deliveredDate = procurementInformation.deliveredDate || newProcurementInformation.deliveredDate;
      newProcurementInformation.product =
         procurementInformation.productId ?
            await this.productRepository.findOne({ where: { id: procurementInformation.productId } }) : newProcurementInformation.product;
      if (!newProcurementInformation.isDelivered && procurementInformation.isDelivered) {
         newProcurementInformation.product.amount += newProcurementInformation.amount;
         await this.productRepository.save(newProcurementInformation.product);
      }
      newProcurementInformation.description = procurementInformation.description || newProcurementInformation.description;
      newProcurementInformation.orderedDate = procurementInformation.orderedDate || newProcurementInformation.orderedDate;
      newProcurementInformation.purchasePrice = procurementInformation.purchasePrice || newProcurementInformation.purchasePrice;
      newProcurementInformation.supplier = procurementInformation.supplierId ?
         await this.supplierRepository.findOneOrFail({ where: { id: procurementInformation.supplierId } }) : newProcurementInformation.supplier;

      return this.procurementInformationRepository.save(newProcurementInformation);
   }
}