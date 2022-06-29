import { HttpClient } from '@angular/common/http';
import { User } from './../model/user';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  constructor(
    http: HttpClient
  ) {
    super(http, 'user');
   }
}
