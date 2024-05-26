import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Order } from "src/Order/entities/order.entity"
import { LiqPay } from "src/LiqPay/utils/LiqPay";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Currency, PaymentAction, PaymentData } from "src/LiqPay/dtos/payment-data";
import { OrderStatusEnum } from "src/Order/enums/order-status.enum";
import { createHash } from 'crypto'

@Injectable()
export class LiqPayService {
   constructor(
      private readonly configService: ConfigService,
      @InjectRepository(Order)
      private readonly orderRepository: Repository<Order>
   ) {
   }

   liqpay: LiqPay = new LiqPay(
      this.configService.get<string>('PUBLIC_LIQPAY_KEY'),
      this.configService.get<string>('PRIVATE_LIQPAY_KEY')
   );

   async initiatePayment(order: Order): Promise<string> {
      const paymentData = new PaymentData();
      paymentData.amount = order.summaryPayment;
      paymentData.currency = Currency.UAH;
      paymentData.description = `Payment for order ${order.id}`;
      paymentData.order_id = order.id;
      paymentData.action = PaymentAction.Hold;

      //const response = await this.liqpay.api('request', paymentData);
      return this.liqpay.cnb_form(paymentData);
   }

   async capturePayment(orderId: number) {
      const paymentStatus = (await this.getPaymentStatus(orderId)).status;
      if (OrderStatusEnum[paymentStatus] === OrderStatusEnum.hold_wait) {
         return this.liqpay.api('request', {
            action: PaymentAction.Capture,
            version: '3',
            order_id: orderId,
         });
      }
      throw new BadRequestException("Can't make this operation!")
   }

   async releasePayment(orderId: number) {
      const paymentStatus = (await this.getPaymentStatus(orderId)).status;
      if (OrderStatusEnum[paymentStatus] === OrderStatusEnum.hold_wait) {
         return this.liqpay.api('request', {
            action: PaymentAction.Release,
            version: '3',
            order_id: orderId,
         });
      }
      throw new BadRequestException("Can't make this operation!")

   }

   async getPaymentStatus(orderId: number) {

      return this.liqpay.api('request', {
         action: PaymentAction.Status,
         version: '3',
         order_id: orderId,
      });
   }


   async processCallback(data: string, receivedSignature: string) {
      const privateKey = this.configService.get<string>('PRIVATE_LIQPAY_KEY');

      const expectedSignature = createHash('sha1')
         .update(privateKey + data + privateKey)
         .digest('base64');

      if (receivedSignature !== expectedSignature) {
         throw new BadRequestException('Invalid signature');
      }

      const decodedData = JSON.parse(
         Buffer.from(data, 'base64').toString('utf8'),
      );

      const { order_id, status, amount, currency, transaction_id, description } = decodedData;

      const order = await this.orderRepository.findOne({ where: { id: order_id } });

      if (!order) throw new BadRequestException("No order with such id!")

      if (amount !== order.summaryPayment) {
         await this.releasePayment(order_id);
         throw new BadRequestException("Amount not equal to the summary payment of order!");
      }

      order.status = OrderStatusEnum[status];

      await this.orderRepository.save(order);

      return { received: true };
   }
}