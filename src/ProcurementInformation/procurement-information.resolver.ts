import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Roles } from "src/Auth/decorators/roles.decorator";
import { AccessJwtAuthenticationGuard } from "src/Auth/guards/access-jwt-authentication.guard";
import { RoleAuthorizationGuard } from "src/Auth/guards/role-authorization.guard";
import { ProcurementInformation } from "src/ProcurementInformation/entities/procurement-information.entity";
import { CreateProcurementInformationInput } from "src/ProcurementInformation/inputs/create-procurement-information.input";
import { FindOptionsProcurementInformationInput } from "src/ProcurementInformation/inputs/find-options-procurement-information.input";
import { UpdateProcurementInformationInput } from "src/ProcurementInformation/inputs/update-procurement-infomation.input";
import { CheckProcurementInformationRelatedObjectsPipe } from "src/ProcurementInformation/pipes/check-related-objects-existing";
import { ProcurementInformationService } from "src/ProcurementInformation/procurement-information.service";
import { RoleEnum } from "src/User/enums/role.enum";

@Resolver()
@UseGuards(AccessJwtAuthenticationGuard, RoleAuthorizationGuard)
export class ProcurementInformationResolver {

   constructor(
      private readonly procurementInformationService: ProcurementInformationService
   ) { }

   @Query(() => [ProcurementInformation])
   @Roles(RoleEnum.Admin, RoleEnum.Manager)
   async getProcrumentInformations(@Args('findOptions', { nullable: true }) findOptions: FindOptionsProcurementInformationInput) {
      return this.procurementInformationService.getAllProcurementInformations(findOptions)
   }

   @Mutation(() => ProcurementInformation)
   @Roles(RoleEnum.Admin, RoleEnum.Manager)
   async createProcurementInformation(
      @Args('procurementInformation', CheckProcurementInformationRelatedObjectsPipe)
      procurementInformation: CreateProcurementInformationInput
   ) {
      return this.procurementInformationService.createProcurementInformation(procurementInformation);
   }

   @Mutation(() => ProcurementInformation)
   @Roles(RoleEnum.Admin, RoleEnum.Manager)
   async updateProcurementInformation(
      @Args('id') id: number,
      @Args('procurementInformation', CheckProcurementInformationRelatedObjectsPipe)
      procurementInformation: UpdateProcurementInformationInput
   ) {
      return this.procurementInformationService.updateProcurementInformation(id, procurementInformation);
   }


}