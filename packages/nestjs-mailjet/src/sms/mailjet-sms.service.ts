import { Inject, Injectable } from "@nestjs/common";
import { MAILJET_SMS_MODULE_OPTIONS } from "../constants/mailjet.constants";
import { MailjetSMSModuleOptions } from "./interfaces";
import { default as SinchClient } from "sinch-rtc";

@Injectable()
export class MailjetSMSService {
  private readonly client: SinchClient;

  constructor(
    @Inject(MAILJET_SMS_MODULE_OPTIONS)
    options: MailjetSMSModuleOptions,
  ) {
    this.client = new SinchClient({
      applicationKey: options.applicationKey,
      capabilities: {
        messaging: true,
      },
    });
  }

  async sendVerificationCode(phoneNumber: string): Promise<void> {
    const ongoingVerification = this.client.createSmsVerification(phoneNumber);

    ongoingVerification.initiate().then(() => {});
  }

  async verifyCode(phoneNumber: string, code: string): Promise<void> {
    const ongoingVerification = this.client.createSmsVerification(phoneNumber);

    ongoingVerification.verify(code).then(() => {});
  }
}
