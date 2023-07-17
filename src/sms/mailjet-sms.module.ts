import { DynamicModule, Module, Provider } from "@nestjs/common";
import { MailjetSMSService } from "./mailjet-sms.service";
import { MailjetSMSModuleOptions } from "./interfaces";
import { createMailjetSMSProviders } from "./mailjet-sms.provider";
import {
  MailjetSMSModuleAsyncOptions,
  MailjetSMSOptionsFactory,
} from "./interfaces/mailjet-sms-module-async-options.interface";
import { MAILJET_SMS_MODULE_OPTIONS } from "../constants/mailjet.constants";

@Module({
  providers: [MailjetSMSService],
  exports: [MailjetSMSService],
})
export class MailjetSMSModule {
  static forRoot(options: MailjetSMSModuleOptions): DynamicModule {
    return {
      module: MailjetSMSModule,
      providers: createMailjetSMSProviders(options),
    };
  }

  static forRootAsync(options: MailjetSMSModuleAsyncOptions): DynamicModule {
    const providers = [...this.createAsyncProviders(options)];

    return {
      module: MailjetSMSModule,
      imports: options.imports || [],
      providers,
    };
  }

  private static createAsyncProviders(
    options: MailjetSMSModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProviders(options)];
    }

    return [
      this.createAsyncOptionsProviders(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProviders(
    options: MailjetSMSModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: MAILJET_SMS_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: MAILJET_SMS_MODULE_OPTIONS,
      useFactory: async (optionsFactory: MailjetSMSOptionsFactory) =>
        await optionsFactory.createMailjetOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
