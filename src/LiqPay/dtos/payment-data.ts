import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";


export enum Currency {
   UAH = "UAH",
   USD = "USD"
}

export enum PaymentAction {
   Pay = 'pay',
   Hold = 'hold',
   Paysplit = 'paysplit',
   Subscribe = 'subscribe',
   Auth = 'auth',
   Regular = 'regular',
   Capture = 'capture',
   Release = 'release',
   Status = 'status'
}

export class PaymentData {
   amount: number;
   currency: Currency;
   description: string;
   order_id: number;
   action: PaymentAction;
   server_url: string = `${process.env.SERVER_DOMAIN}/liqpay-callback`; // Your server callback URL
   version: String = '3'
}