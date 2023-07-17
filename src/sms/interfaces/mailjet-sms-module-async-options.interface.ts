/* eslint-disable @typescript-eslint/no-explicit-any */
import { ModuleMetadata, Type } from "@nestjs/common";
import { MailjetSMSModuleOptions } from "./mailjet-sms-module-options.interface";

export interface MailjetSMSOptionsFactory {
  createMailjetOptions():
    | Promise<MailjetSMSModuleOptions>
    | MailjetSMSModuleOptions;
}

export interface MailjetSMSModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  inject?: any[];
  useClass?: Type<MailjetSMSOptionsFactory>;
  useExisting?: Type<MailjetSMSOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<MailjetSMSModuleOptions> | MailjetSMSModuleOptions;
}
