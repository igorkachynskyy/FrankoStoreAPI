import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Supplier } from "src/Supplier/entities/supplier.entity";
import { CreateSupplierInput } from "src/Supplier/inputs/create-supplier.input";
import { UpdateSupplierInput } from "src/Supplier/inputs/update-supplier.input";
import { Repository } from "typeorm";

@Injectable()
export class SupplierService {
   constructor(
      @InjectRepository(Supplier)
      private readonly supplierRepository: Repository<Supplier>
   ) { }


   async getSuppliers() {
      return this.supplierRepository.find({});
   }

   async createSupplier(supplier: CreateSupplierInput) {
      const newSupplier = new Supplier({
         address: supplier.address,
         companyName: supplier.companyName,
         email: supplier.email,
         phoneNumber: supplier.phoneNumber,
         website: supplier.website
      })

      return this.supplierRepository.save(newSupplier);
   }

   async updateSupplier(id: number, supplier: UpdateSupplierInput) {
      const newSupplier = await this.supplierRepository.findOne({ where: { id: id } });

      if (!newSupplier) {
         throw new BadRequestException("No supplier with such id!");
      }

      newSupplier.address = supplier.address ? supplier.address : newSupplier.address;
      newSupplier.companyName = supplier.companyName ? supplier.companyName : newSupplier.companyName;
      newSupplier.email = supplier.email ? supplier.email : newSupplier.email;
      newSupplier.phoneNumber = supplier.phoneNumber ? supplier.phoneNumber : newSupplier.phoneNumber;
      newSupplier.website = supplier.website ? supplier.website : newSupplier.website;

      return this.supplierRepository.save(newSupplier);
   }
}