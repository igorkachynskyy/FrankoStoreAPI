import { Module } from "@nestjs/common";
import { NovaPostService } from "src/NovaPost/nova-post.service";
import { NovaPostResolver } from "src/NovaPost/nove-post.resolver";


@Module({
   providers: [NovaPostService, NovaPostResolver]
})
export class NovaPostModule { }