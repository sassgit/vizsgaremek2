import { BaseModel } from './base.model';
export class Artist extends BaseModel {
  fullName: string = '';
  artistName?: string;
  otherInfo?: string;
}
