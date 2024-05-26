import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Roles } from "src/Auth/decorators/roles.decorator";
import { AccessJwtAuthenticationGuard } from "src/Auth/guards/access-jwt-authentication.guard";
import { RoleAuthorizationGuard } from "src/Auth/guards/role-authorization.guard";
import { RoleEnum } from "src/User/enums/role.enum";
import { DiscountTypeService } from "./discount-type.service";
import { User } from "src/User/entities/user.entity";
import { Product } from "src/Product/entities/product.entity";
import { DiscountType } from "src/DiscountType/entities/discount-type";
import { CreateDiscoutTypeInput } from "src/DiscountType/inputs/create-discount-type";
import { UpdateDiscountTypeInput } from "src/DiscountType/inputs/update-discount-type";


@Resolver()
@UseGuards(AccessJwtAuthenticationGuard, RoleAuthorizationGuard)
export class DiscountTypeResolver {

    constructor(
        private readonly discountTypeService: DiscountTypeService
    ) { }

    @Mutation(() => User)
    @Roles(RoleEnum.Admin, RoleEnum.Manager)
    async grantDiscountTypeForUser(@Args('userId') userId: number, @Args('discountTypeId') discountTypeId: number) {
        return this.discountTypeService.grantDiscountTypeForUser(userId, discountTypeId);
    }

    @Mutation(() => Product)
    @Roles(RoleEnum.Admin, RoleEnum.Manager)
    async grantDiscountTypeOnProduct(@Args('productId') productId: number, @Args('discountTypeId') discountTypeId: number) {
        return this.discountTypeService.grantDiscountTypeOnProduct(productId, discountTypeId);
    }

    @Mutation(() => DiscountType)
    @Roles(RoleEnum.Admin, RoleEnum.Manager)
    async createDiscountType(@Args('discountType') discountType: CreateDiscoutTypeInput) {
        return this.discountTypeService.createDiscountType(discountType);
    }

    @Mutation(() => DiscountType)
    @Roles(RoleEnum.Admin, RoleEnum.Manager)
    async updateDiscountType(@Args('id') id: number, @Args('discountType') discountType: UpdateDiscountTypeInput) {
        return this.discountTypeService.updateDiscountType(id, discountType);
    }

}