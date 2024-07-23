import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';
import { DatabaseConfig } from './config/database.config';

@Module({
  imports: [
    OrdersModule,
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
