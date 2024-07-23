import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CredipayOrder, CredipayOrderResponse } from 'src/types/order';

@Injectable()
export class CredipayClientService {
  constructor(private readonly httpService: HttpService) {}

  async createCredipayOrder(
    orderBody: CredipayOrder,
  ): Promise<CredipayOrderResponse> {
    try {
      const response =
        await this.httpService.axiosRef.post<CredipayOrderResponse>(
          '/orders',
          orderBody,
        );

      return response.data;
    } catch (e) {
      console.log(e, 'error');
      throw e;
    }
  }
}
