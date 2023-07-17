import { Provider } from "@nestjs/common";
import { MAILJET_SMS_MODULE_OPTIONS } from "../constants/mailjet.constants";
import { MailjetSMSModuleOptions } from "./interfaces";

export function createMailjetSMSProviders(
  options: MailjetSMSModuleOptions
): Provider[] {
  return [
    {
      provide: MAILJET_SMS_MODULE_OPTIONS,
      useValue: options,
    },
  ];
}
