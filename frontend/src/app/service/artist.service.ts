import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Artist } from '../model/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService extends BaseService<Artist> {

  constructor(
    http: HttpClient
  ) {
    super(http, 'artist');
  }
}
