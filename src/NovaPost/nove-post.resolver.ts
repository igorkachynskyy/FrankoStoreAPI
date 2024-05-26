import { Args, Query, Resolver } from "@nestjs/graphql";
import { NovaPostService } from "src/NovaPost/nova-post.service";

@Resolver()
export class NovaPostResolver {
  constructor(private readonly novaPostService: NovaPostService) {}

  @Query(() => String)
  async getSettlements(@Args("cityName") cityName: string) {
    return JSON.stringify(
      (await this.novaPostService.getSettlements(cityName)).data
    );
  }

  @Query(() => String)
  async getStreets(
    @Args("settlementRef") settlementRef: string,
    @Args("streetName") streetName: string,
    @Args("limit") limit: number
  ) {
    return JSON.stringify(
      (await this.novaPostService.getStreets(settlementRef, streetName, limit))
        .data
    );
  }

  @Query(() => String)
  async getWarehouses(
    @Args("cityName") cityName: string,
    @Args("streetName") streetName: string,
    @Args("limit") limit: number
  ) {
    return JSON.stringify(
      (await this.novaPostService.getWarehouses(cityName, streetName, limit))
        .data
    );
  }

  @Query(() => String)
  async getCities(@Args("findString") findString?: string) {
    return JSON.stringify(await this.novaPostService.getCities(findString));
  }

  @Query(() => String)
  async getCityStreets(
    @Args("cityRef") cityRef: string,
    @Args("findString") findString: string
  ) {
    return JSON.stringify(
      await this.novaPostService.getCitiesStreets(cityRef, findString)
    );
  }
}
