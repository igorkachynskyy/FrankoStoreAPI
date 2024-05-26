import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Public } from "src/Auth/decorators/public.decorator";
import { Roles } from "src/Auth/decorators/roles.decorator";
import { AccessJwtAuthenticationGuard } from "src/Auth/guards/access-jwt-authentication.guard";
import { RoleAuthorizationGuard } from "src/Auth/guards/role-authorization.guard";
import { ProductCategory } from "src/ProductCategory/entities/product-category";
import { CreateProductCategoryInput } from "src/ProductCategory/inputs/create-product-category.input";
import { FindOptionsProductCategoryInput } from "src/ProductCategory/inputs/find-options-product-category.input";
import { UpdateProductCategoryInput } from "src/ProductCategory/inputs/update-product-category.input";
import { ProductCategoryService } from "src/ProductCategory/product-category.service";
import { RoleEnum } from "src/User/enums/role.enum";


@Resolver()
@UseGuards(AccessJwtAuthenticationGuard, RoleAuthorizationGuard)
export class ProductCategoryResolver{
   constructor(
      private readonly productCategoryService: ProductCategoryService
   ){}

   @Query(() => [ProductCategory])
   @Public()
   async getProductCategories(@Args('findOptions', {nullable:true}) findOptions:FindOptionsProductCategoryInput){      
      return this.productCategoryService.getProductCategories(findOptions);
   }

   @Mutation(() => ProductCategory)
   @Roles(RoleEnum.Admin, RoleEnum.Manager)
   async createProductCategory(@Args('productCategory') productCategory:CreateProductCategoryInput){
      return this.productCategoryService.createProductCategory(productCategory);
   }

   @Mutation(() => ProductCategory)
   @Roles(RoleEnum.Admin, RoleEnum.Manager)
   async updateProductCategory(@Args('id') id:number ,@Args('productCategory') productCategory:UpdateProductCategoryInput){
      return this.productCategoryService.updateProductCategory(id, productCategory);
   }

}