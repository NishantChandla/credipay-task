import { Module } from '@nestjs/common';
import { CredipayClientService } from './credipay-client.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.getOrThrow('credipayBaseUrl'),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CREDIPAY-API-KEY': configService.getOrThrow('credipayApiKey'),
        },
      }),
    }),
  ],
  providers: [CredipayClientService],
  exports: [CredipayClientService],
})
export class CredipayClientModule {}
