import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Roles } from "src/Auth/decorators/roles.decorator";
import { AccessJwtAuthenticationGuard } from "src/Auth/guards/access-jwt-authentication.guard";
import { RoleAuthorizationGuard } from "src/Auth/guards/role-authorization.guard";
import { Order } from "src/Order/entities/order.entity";
import { CreateOrderInput } from "src/Order/inputs/create-order.input";
import { FindOptionsOrderInput } from "src/Order/inputs/find-options-order.input";
import { OrderService } from "src/Order/order.service";
import { User } from "src/User/entities/user.entity";
import { RoleEnum } from "src/User/enums/role.enum";
import { CurrentUser } from "src/common/decorators/current-user.decorator";


@Resolver()
@UseGuards(AccessJwtAuthenticationGuard, RoleAuthorizationGuard)
export class OrderResolver {
   constructor(
      private readonly orderService: OrderService
   ) { }

   @Query(() => [Order])
   async getOrders(@Args('findOptions', { nullable: true }) findOptions: FindOptionsOrderInput) {
      return await this.orderService.getAllOrders(findOptions);
   }

   @Mutation(() => Order)
   async createOrder(@Args('order') order: CreateOrderInput, @CurrentUser() user: User) {
      order.client = user;
      return await this.orderService.createOrder(order);
   }

   @Mutation(() => Number)
   @Roles(RoleEnum.Admin, RoleEnum.Manager)
   async capturePayment(@Args('orderId') orderId: number, @CurrentUser() user: User) {
      return await this.orderService.captureOrderPayment(orderId, user) ? 1 : 0
   }

   @Mutation(() => Number)
   @Roles(RoleEnum.Admin, RoleEnum.Manager)
   async releasePayment(@Args('orderId') orderId: number, @CurrentUser() user: User) {
      return await this.orderService.releaseOrderPayment(orderId, user) ? 1 : 0
   }
}