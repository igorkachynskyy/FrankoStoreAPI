import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DiscountType } from "./entities/discount-type";
import { Repository } from "typeorm";
import { User } from "src/User/entities/user.entity";
import { CreateDiscoutTypeInput } from "src/DiscountType/inputs/create-discount-type";
import { UpdateDiscountTypeInput } from "src/DiscountType/inputs/update-discount-type";
import { Product } from "src/Product/entities/product.entity";


@Injectable()
export class DiscountTypeService {
    constructor(
        @InjectRepository(DiscountType)
        private readonly discountTypeRepository: Repository<DiscountType>,
        @InjectRepository(User)
        private readonly userReposiotry: Repository<User>,
        @InjectRepository(Product)
        private readonly productReposiotry: Repository<Product>
    ) { }

    async grantDiscountTypeOnProduct(productId: number, discountTypeId: number) {
        const product = await this.productReposiotry.findOne({ where: { id: productId } });
        if (!product) throw new BadRequestException("Not valid or not existing prosuct id!");

        const discountType = await this.discountTypeRepository.findOne({ where: { id: discountTypeId } });
        if (!discountType) throw new BadRequestException("Not valid or not existing discount type id!");

        product.discountType = discountType;
        return this.productReposiotry.save(product);
    }

    async updateDiscountType(discountTypeId: number, discountType: UpdateDiscountTypeInput) {
        const newDiscountType = await this.discountTypeRepository.findOne({ where: { id: discountTypeId } });

        if (!newDiscountType) throw new BadRequestException("No discount type with such id!");

        newDiscountType.name = discountType.name ? discountType.name : newDiscountType.name;
        newDiscountType.percentage = discountType.percentage ? discountType.percentage : newDiscountType.percentage;

        return this.discountTypeRepository.save(newDiscountType);
    }

    async createDiscountType(discountType: CreateDiscoutTypeInput) {
        const newDiscountType = new DiscountType({
            name: discountType.name,
            percentage: discountType.percentage
        })

        return this.discountTypeRepository.save(newDiscountType);
    }

    async grantDiscountTypeForUser(userId: number, discountTypeId: number) {
        const user = await this.userReposiotry.findOne({ where: { id: userId } });
        if (!user) throw new BadRequestException("Not valid or not existing user id!");

        const discountType = await this.discountTypeRepository.findOne({ where: { id: discountTypeId } });
        if (!discountType) throw new BadRequestException("Not valid or not existing discount type id!");

        user.dicountType = discountType;
        return this.userReposiotry.save(user);
    }
}