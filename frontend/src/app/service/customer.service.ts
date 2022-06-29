import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<Customer> {

  constructor(
    http: HttpClient
  ) {
    super(http, 'customer');
  }
}
