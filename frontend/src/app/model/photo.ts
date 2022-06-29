import { BaseModel } from './base.model';
export class Photo extends BaseModel {
  storedFileName: string = '';
  alt: string = '';
  fileSize: number = 0;
}
