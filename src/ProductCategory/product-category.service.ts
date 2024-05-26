import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductCategory } from "src/ProductCategory/entities/product-category";
import { CreateProductCategoryInput } from "src/ProductCategory/inputs/create-product-category.input";
import { FindOptionsProductCategoryInput } from "src/ProductCategory/inputs/find-options-product-category.input";
import { UpdateProductCategoryInput } from "src/ProductCategory/inputs/update-product-category.input";
import { FindOptionsWhere, In, Like, Repository } from "typeorm";


@Injectable()
export class ProductCategoryService {
   constructor(
      @InjectRepository(ProductCategory)
      private readonly productCategoryRepository: Repository<ProductCategory>
   ) { }

   async getProductCategories(findOptions?: FindOptionsProductCategoryInput) {
      const where: FindOptionsWhere<ProductCategory> = {};

      if (findOptions?.ids) {
         where.id = In(findOptions.ids)
      }

      if (findOptions?.name) {
         where.name = Like(`%${findOptions.name}%`);
      }

      if (findOptions?.startDateRange) {
         where.startDateRange = findOptions.startDateRange;
      }

      if (findOptions?.endDateRange) {
         where.endDateRange = findOptions.endDateRange;
      }

      return this.productCategoryRepository.find({ where: where })
   }

   async createProductCategory(productCategory: CreateProductCategoryInput) {
      const newProductCategory = new ProductCategory({
         name: productCategory.name,
         startDateRange: productCategory.startDateRange,
         endDateRange: productCategory.endDateRange
      });

      return this.productCategoryRepository.save(newProductCategory);
   }

   async updateProductCategory(id: number, productCategory: UpdateProductCategoryInput) {
      const newProductCategory = await this.productCategoryRepository.findOne({ where: { id: id } });

      if (!newProductCategory) throw new BadRequestException("No product category with such id!");

      newProductCategory.name = productCategory.name ? productCategory.name : newProductCategory.name;

      newProductCategory.endDateRange =
         productCategory.endDateRange ? productCategory.endDateRange : newProductCategory.endDateRange;
      newProductCategory.startDateRange =
         productCategory.startDateRange ? productCategory.startDateRange : newProductCategory.startDateRange;

      return this.productCategoryRepository.save(newProductCategory);
   }
}