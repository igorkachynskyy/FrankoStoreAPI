import { Body, Controller, Post } from "@nestjs/common";
import { LiqPayService } from "src/LiqPay/liqpay.service";

@Controller('payment')
export class LiqPayController {
   constructor(private readonly liqPayService: LiqPayService) { }

   @Post('callback')
   async handleCallback(
      @Body('data') data: string,
      @Body('signature') signature: string,
   ) {
      return this.liqPayService.processCallback(data, signature);
   }
}