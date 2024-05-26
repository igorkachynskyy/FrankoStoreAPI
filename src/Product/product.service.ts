import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository, FindOptionsWhere, In, Like, Between } from "typeorm";
import { ProductCategory } from "../ProductCategory/entities/product-category";
import { FileService } from "src/File/file.service";
import { CreateProductInput } from "./inputs/create-product.input";
import { File } from "src/File/entities/file.entity";
import { FindOptionsProductInput } from "./inputs/find-options-product.input";
import { UpdateProductInput } from "./inputs/update-product.input";
import { ProductCategoryService } from "src/ProductCategory/product-category.service";


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(ProductCategory)
        private readonly productCategoryRepository: Repository<ProductCategory>,
        private readonly fileService: FileService,
        private readonly productCategoryServices: ProductCategoryService
    ) { }

    async getProducts(findOptions?: FindOptionsProductInput) {

        const where: FindOptionsWhere<Product> = {};

        if (findOptions?.ids) {
            where.id = In(findOptions.ids);
        }

        if (findOptions?.name) {
            where.name = Like(`%${findOptions.name}%`)
        }

        if (findOptions?.retailPrice) {
            where.retailPrice = Between(findOptions.retailPrice.min || 0, findOptions.retailPrice.max || Number.MAX_VALUE);
        }

        if (findOptions?.description) {
            where.description = Like(`%${findOptions.description}%`);
        }

        if (findOptions?.height) {
            where.height = Between(findOptions.height.min || 0, findOptions.height.max || Number.MAX_VALUE)
        }

        if (findOptions?.width) {
            where.width = Between(findOptions.width.min || 0, findOptions.width.max || Number.MAX_VALUE)
        }

        if (findOptions?.length) {
            where.length = Between(findOptions.length.min || 0, findOptions.length.max || Number.MAX_VALUE)
        }

        if (findOptions?.sizes) {
            where.size = In(findOptions.sizes);
        }

        if (findOptions?.amount) {
            where.amount = Between(findOptions.amount.min || 0, findOptions.amount.max || Number.MAX_VALUE)
        }

        if (findOptions?.categories) {
            const ids = (await this.productCategoryServices.getProductCategories(findOptions.categories)).map((category) => category.id);
            where.categories = { id: In(ids) }
        }

        return this.productRepository.find({ where: where, skip: findOptions?.skip, take: findOptions?.take, relations: { images: true, categories: true } })
    }

    async createProduct(product: CreateProductInput) {

        const categories: ProductCategory[] = [];

        for (let i = 0; i < product.categories.length; i++) {
            const category = await this.productCategoryRepository.findOne({ where: { name: product.categories[i].name } })
            if (category) {
                categories.push(category);
                continue;
            }

            categories.push(await this.productCategoryRepository.save(product.categories[i]))
        }

        const images: File[] = [];

        for (let i = 0; i < product.images.length; i++) {
            images.push(await this.fileService.saveFile(product.images[i], "products"))
        }

        const newProduct = new Product({
            name: product.name,
            categories: categories,
            height: product.height,
            width: product.width,
            length: product.length,
            size: product.size,
            retailPrice: product.retailPrice,
            description: product.description,
            images: images
        });

        return this.productRepository.save(newProduct);
    }


    async updateProduct(id: number, product: UpdateProductInput) {
        const newProduct = await this.productRepository.findOne({ where: { id: id } });
        newProduct.name = product.name || newProduct.name;
        newProduct.description = product.description || newProduct.description;
        newProduct.retailPrice = product.retailPrice || newProduct.retailPrice;
        newProduct.amount = product.amount || newProduct.amount;
        newProduct.height = product.height || newProduct.height;
        newProduct.length = product.length || newProduct.length;
        newProduct.width = product.width || newProduct.width;
        newProduct.size = product.size || newProduct.size;

        const categories: ProductCategory[] = [];
        for (let i = 0; i < product.categories.length; i++) {
            const category = await this.productCategoryRepository.findOne({ where: { name: product.categories[i].name } })
            if (category) {
                categories.push(category);
                continue;
            }

            categories.push(await this.productCategoryRepository.save(product.categories[i]))
        }

        newProduct.categories = categories;

        const images: File[] = [];

        for (let i = 0; i < product.images.length; i++) {
            images.push(await this.fileService.saveFile(product.images[i], "products"))
        }

        for (let i = 0; i < newProduct.images.length; i++) {
            await this.fileService.removeFileRecord(newProduct.images[i].id);
        }

        newProduct.images = images;

        return this.productRepository.save(newProduct);
    }
}