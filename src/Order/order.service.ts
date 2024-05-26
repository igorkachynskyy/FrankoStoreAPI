import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LiqPayService } from "src/LiqPay/liqpay.service";
import { OrderProduct } from "src/Order/entities/order-product.entity";
import { Order } from "src/Order/entities/order.entity";
import { ProductQuantity } from "src/Order/entities/product-quantity";
import { OrderStatusEnum } from "src/Order/enums/order-status.enum";
import { CreateOrderInput } from "src/Order/inputs/create-order.input";
import { FindOptionsOrderInput } from "src/Order/inputs/find-options-order.input";
import { Product } from "src/Product/entities/product.entity";
import { User } from "src/User/entities/user.entity";
import { Between, FindOptionsWhere, In, Repository } from "typeorm";

@Injectable()
export class OrderService {
   constructor(
      @InjectRepository(Order)
      private readonly orderRepository: Repository<Order>,
      @InjectRepository(OrderProduct)
      private readonly orderProductRepository: Repository<OrderProduct>,
      @InjectRepository(Product)
      private readonly productRepository: Repository<Product>,
      private readonly liqPayService: LiqPayService
   ) { }

   async getAllOrders(findOptions?: FindOptionsOrderInput) {
      const where: FindOptionsWhere<Order> = {};

      if (findOptions?.ids) {
         where.id = In(findOptions.ids);
      }

      if (findOptions?.customerIds) {
         where.customer = { id: In(findOptions?.customerIds) };
      }

      if (findOptions?.executorIds) {
         where.executor = { id: In(findOptions?.executorIds) };
      }

      if (findOptions?.statuses) {
         where.status = In(findOptions.statuses);
      }

      if (findOptions?.summaryPayment) {
         where.summaryPayment = Between(findOptions.summaryPayment.min, findOptions.summaryPayment.max);
      }

      if (findOptions?.updatedAt) {
         where.updatedAt = Between(findOptions.updatedAt.start, findOptions.updatedAt.end);
      }

      if (findOptions?.createdAt) {
         where.createdAt = Between(findOptions.createdAt.start, findOptions.createdAt.end);
      }

      const orders = await this.orderRepository.find({ where: where, skip: findOptions?.skip, take: findOptions?.take, relations: { customer: true, executor: true } })

      for (const order of orders) {
         order.products = [];
         const orderProducts = await this.orderProductRepository.find({ where: { order: { id: order.id } }, relations: { order: true, product: { categories: true, images: true, discountType: true }, } });

         for (const orderProduct of orderProducts) {
            order.products.push({ product: orderProduct.product, quantity: orderProduct.quantity })
         }
         order.paymentUrl = await this.liqPayService.initiatePayment(order);
         order.isPaid = await this.isPaidOrder(order.id);
      }

      return orders;

   }


   async createOrder(order: CreateOrderInput) {

      const orderProducts: OrderProduct[] = [];

      let summaryPayment = 0;

      const products: ProductQuantity[] = [];
      for (const item of order.products) {
         const product = await this.productRepository.findOne({ where: { id: item.productId }, relations: { categories: true, discountType: true, images: true } })
         products.push({ product: product, quantity: item.quantity });
         if (!product) throw new BadRequestException(`No such product with id ${item.productId}`)
         summaryPayment += product.retailPrice * item.quantity;
      }

      let newOrder = await this.orderRepository.save(new Order({
         customer: order.client,
         summaryPayment: summaryPayment,
         status: OrderStatusEnum.processing,
         isSelfDelivery: order.isSelfDelivery,
         deliveryAddress: order.deliveryAddress,
      }))

      for (const item of order.products) {
         const product = await this.productRepository.findOne({ where: { id: item.productId } });
         const orderProduct = new OrderProduct({
            order: newOrder,
            product: product,
            quantity: item.quantity,
            price: product.retailPrice * item.quantity
         });

         this.orderProductRepository.save(orderProduct);
      }

      newOrder = await this.orderRepository.findOneOrFail({
         where: { id: newOrder.id },
         relations: { customer: true, executor: true }
      });

      newOrder.products = products;

      newOrder.paymentUrl = await this.liqPayService.initiatePayment(newOrder);
      return newOrder;

   }

   async captureOrderPayment(orderId: number, executor: User) {
      const order = await this.orderRepository.findOne({ where: { id: orderId } })

      if (!order) throw new BadRequestException("No order with such id!");
      order.executor = executor;
      order.status = OrderStatusEnum.success;

      await this.liqPayService.capturePayment(orderId);

      return this.orderRepository.save(order);
   }

   async releaseOrderPayment(orderId: number, executor: User) {
      const order = await this.orderRepository.findOne({ where: { id: orderId } })

      if (!order) throw new BadRequestException("No order with such id!");
      order.executor = executor;
      order.status = OrderStatusEnum.reversed;

      await this.liqPayService.releasePayment(orderId);
      return this.orderRepository.save(order);
   }

   async isPaidOrder(orderId: number) {
      const paymentStatus = (await this.liqPayService.getPaymentStatus(orderId)).status;
      return OrderStatusEnum[paymentStatus] === OrderStatusEnum.hold_wait
   }
}