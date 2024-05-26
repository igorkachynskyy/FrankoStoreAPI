import axios from 'axios';
import { createHash } from 'crypto';

export class LiqPay {

   private public_key: string;
   private private_key: string;

   constructor(public_key: string, private_key: string) {
      this.public_key = public_key;
      this.private_key = private_key;
   }

   host: string = "https://www.liqpay.ua/api/";

   availableLanguages: string[] = ['ru', 'uk', 'en'];

   buttonTranslations: object = { 'ru': 'Оплатить', 'uk': 'Сплатити', 'en': 'Pay' };

   public async api(path, params) {
      if (!params.version) {
         throw new Error('version is null');
      }

      params.public_key = this.public_key;
      const data = Buffer.from(JSON.stringify(params)).toString('base64');
      const signature = this.str_to_sign(this.private_key + data + this.private_key);

      const dataToSend = new URLSearchParams();
      dataToSend.append('data', data);
      dataToSend.append('signature', signature);

      try {
         const response = await axios.post(this.host + path, dataToSend, {
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
            }
         });

         if (response.status === 200) {
            return response.data;
         } else {
            throw new Error(`Request failed with status code: ${response.status}`);
         }
      } catch (error) {
         throw error;
      }
   }


   public cnb_form(params) {
      let buttonText = this.buttonTranslations['uk'];
      if (params.language) {
         buttonText = this.buttonTranslations[params.language] || this.buttonTranslations['uk'];
      }

      params = this.cnb_params(params);
      const data = Buffer.from(JSON.stringify(params)).toString('base64');
      const signature = this.str_to_sign(this.private_key + data + this.private_key);

      return '<form method="POST" action="https://www.liqpay.ua/api/3/checkout" accept-charset="utf-8">' +
         '<input type="hidden" name="data" value="' + data + '" />' +
         '<input type="hidden" name="signature" value="' + signature + '" />' +
         '<script type="text/javascript" src="https://static.liqpay.ua/libjs/sdk_button.js"></script>' +
         '<sdk-button label="' + buttonText + '" background="#77CC5D" onClick="submit()"></sdk-button>' +
         '</form>';
   };


   public cnb_signature(params) {
      params = this.cnb_params(params);
      const data = Buffer.from(JSON.stringify(params)).toString('base64');
      return this.str_to_sign(this.private_key + data + this.private_key);
   };


   private cnb_params(params) {
      params.public_key = this.public_key;

      // Validate and convert version to number
      if (params.version) {
         if (typeof params.version === 'string' && !isNaN(Number(params.version))) {
            params.version = Number(params.version);
         } else if (typeof params.version !== 'number') {
            throw new Error('version must be a number or a string that can be converted to a number');
         }
      } else {
         throw new Error('version is null');
      }

      // Validate and convert amount to number
      if (params.amount) {
         if (typeof params.amount === 'string' && !isNaN(Number(params.amount))) {
            params.amount = Number(params.amount);
         } else if (typeof params.amount !== 'number') {
            throw new Error('amount must be a number or a string that can be converted to a number');
         }
      } else {
         throw new Error('amount is null');
      }

      // Ensure other parameters are strings
      const stringParams = ['action', 'currency', 'description', 'language'];
      for (const param of stringParams) {
         if (params[param] && typeof params[param] !== 'string') {
            params[param] = String(params[param]);
         } else if (!params[param] && param !== 'language') { // language is optional
            throw new Error(`${param} is null or not provided`);
         }
      }

      // Check if language is set and is valid
      if (params.language && !this.availableLanguages.includes(params.language)) {
         params.language = 'uk';
      }

      return params;
   };

   private str_to_sign(str) {
      if (typeof str !== 'string') {
         throw new Error('Input must be a string');
      }
      const sha1 = createHash('sha1');
      sha1.update(str);
      return sha1.digest('base64');
   };


   public cnb_object(params) {
      params.language = params.language || "uk";
      params = this.cnb_params(params);
      const data = Buffer.from(JSON.stringify(params)).toString('base64');
      const signature = this.str_to_sign(this.private_key + data + this.private_key);
      return { data: data, signature: signature };
   };

};