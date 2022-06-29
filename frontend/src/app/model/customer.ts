import { BaseModel } from './base.model';
export class Customer extends BaseModel {
  fullName: string = '';
  zip?: string;
  city?: string;
  streetAddress?: string;
  country?: string;
  email?: string;
  password?: string;
}
