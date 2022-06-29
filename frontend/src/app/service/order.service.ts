import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<Order> {

  constructor(
    http: HttpClient,
  ) {
    super(http, 'order');
  }

  override prepareToSend(entity: Order): void {
    super.prepareToSend(entity);
    entity.customer = typeof entity.customer === 'string' ? entity.customer : entity.customer?._id as string;
    if (entity.paintings)
      entity.paintings = entity.paintings.map(e => typeof e === 'string' ? e : e?._id) as string[];
  }

}
