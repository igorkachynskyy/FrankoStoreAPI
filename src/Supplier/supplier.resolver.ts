import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Roles } from "src/Auth/decorators/roles.decorator";
import { AccessJwtAuthenticationGuard } from "src/Auth/guards/access-jwt-authentication.guard";
import { RoleAuthorizationGuard } from "src/Auth/guards/role-authorization.guard";
import { Supplier } from "src/Supplier/entities/supplier.entity";
import { CreateSupplierInput } from "src/Supplier/inputs/create-supplier.input";
import { UpdateSupplierInput } from "src/Supplier/inputs/update-supplier.input";
import { SupplierService } from "src/Supplier/supplier.service";
import { RoleEnum } from "src/User/enums/role.enum";

@Resolver()
@UseGuards(AccessJwtAuthenticationGuard, RoleAuthorizationGuard)
export class SupplierResolver {
   constructor(
      private readonly supplierService: SupplierService
   ) { }


   @Query(() => [Supplier])
   @Roles(RoleEnum.Admin, RoleEnum.Manager)
   async getSuppliers() {
      return this.supplierService.getSuppliers();
   }

   @Mutation(() => Supplier)
   @Roles(RoleEnum.Admin, RoleEnum.Manager)
   async createSupplier(@Args('supplier') supplier: CreateSupplierInput) {
      return this.supplierService.createSupplier(supplier);
   }

   @Mutation(() => Supplier)
   @Roles(RoleEnum.Admin, RoleEnum.Manager)
   async updateSupplier(@Args('id') id: number, @Args('supplier') supplier: UpdateSupplierInput) {
      return this.supplierService.updateSupplier(id, supplier);
   }
}