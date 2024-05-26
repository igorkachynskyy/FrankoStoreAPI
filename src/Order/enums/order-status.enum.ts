import { registerEnumType } from "@nestjs/graphql";


export enum OrderStatusEnum {
   error = 'error',
   failure = 'failure',
   reversed = 'reversed',
   subscribed = 'subscribed',
   success = 'success',
   unsubscribed = 'unsubscribed',
   three_ds_verify = '3ds_verify',
   captcha_verify = 'captcha_verify',
   cvv_verify = 'cvv_verify',
   ivr_verify = 'ivr_verify',
   otp_verify = 'otp_verify',
   password_verify = 'password_verify',
   phone_verify = 'phone_verify',
   pin_verify = 'pin_verify',
   receiver_verify = 'receiver_verify',
   sender_verify = 'sender_verify',
   senderapp_verify = 'senderapp_verify',
   wait_qr = 'wait_qr',
   wait_sender = 'wait_sender',
   cash_wait = 'cash_wait',
   hold_wait = 'hold_wait',
   invoice_wait = 'invoice_wait',
   prepared = 'prepared',
   processing = 'processing',
   wait_accept = 'wait_accept',
   wait_card = 'wait_card',
   wait_compensation = 'wait_compensation',
   wait_lc = 'wait_lc',
   wait_reserve = 'wait_reserve',
   wait_secure = 'wait_secure'
}

registerEnumType(OrderStatusEnum, {
   name: 'OrderStatusEnum',
});