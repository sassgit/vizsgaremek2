import { BaseModel } from './base.model';
import { Customer } from "./customer"
import { Painting } from "./painting";

export class Order extends BaseModel {
  customer: string | Customer = '';
  paintings: (string | Painting)[] = [];
  remark?: string;
  status: string = '';
  bill?: String;
  billStatus?: String;
  price: number = 0;
}
