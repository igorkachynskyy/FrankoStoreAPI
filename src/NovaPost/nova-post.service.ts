import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class NovaPostService {
  constructor(private readonly configService: ConfigService) {}

  async getCities(findString?: string) {
    const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: this.configService.get<string>("NOVA_POST_API_KEY"),
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: {
          Limit: "40",
          FindByString: findString,
          Page: 1,
        },
      }),
    });

    if (!response.ok) {
      throw new InternalServerErrorException("Something went wrong");
    }

    return await response.json();
  }

  async getSettlements(cityName: string) {
    const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: this.configService.get<string>("NOVA_POST_API_KEY"),
        modelName: "Address",
        calledMethod: "searchSettlements",
        methodProperties: {
          CityName: cityName,
          Limit: "10",
          Page: "1",
        },
      }),
    });

    if (!response.ok) {
      throw new InternalServerErrorException("Something went wrong");
    }

    return await response.json();
  }

  async getStreets(settlementRef: string, streetName: string, limit: number) {
    const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: this.configService.get<string>("NOVA_POST_API_KEY"),
        modelName: "Address",
        calledMethod: "searchSettlementStreets",
        methodProperties: {
          StreetName: streetName,
          SettlementRef: settlementRef,
          Limit: limit,
        },
      }),
    });

    if (!response.ok) {
      throw new InternalServerErrorException("Something went wrong");
    }

    return await response.json();
  }

  async getWarehouses(cityName: string, streetName: string, limit: number) {
    const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: this.configService.get<string>("NOVA_POST_API_KEY"),
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: {
          Language: "UA",
          CityName: cityName,
          Limit: limit,
          FindByString: streetName,
        },
      }),
    });

    if (!response.ok) {
      throw new InternalServerErrorException("Something went wrong");
    }

    return await response.json();
  }

  async getCitiesStreets(cityRef: string, findString: string) {
    const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: this.configService.get<string>("NOVA_POST_API_KEY"),
        modelName: "Address",
        calledMethod: "getStreet",
        methodProperties: {
          FindByString: findString,
          Limit: "20",
          CityRef: cityRef,
          Page: "1",
        },
      }),
    });

    if (!response.ok) {
      throw new InternalServerErrorException("Something went wrong");
    }

    return await response.json();
  }
}
