import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Photo } from '../model/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService extends BaseService<Photo> {

  constructor(
    http: HttpClient
  ) {
    super(http, 'photo');
  }

  post(formData: FormData): Observable<Photo> {
    return this.http.post<Photo>(this.apiUrl, formData);
  }

}
