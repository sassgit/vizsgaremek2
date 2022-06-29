import { Artist } from './../model/artist';
import { Photo } from './../model/photo';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Painting } from '../model/painting';

@Injectable({
  providedIn: 'root'
})
export class PaintingService extends BaseService<Painting> {

  constructor(
    http: HttpClient
  ) {
    super(http, 'painting');
   }


  override prepareToSend(entity: Painting): void {
    super.prepareToSend(entity);
    if (entity.photos)
      entity.photos.map(e => typeof e === 'string' ? e : e?._id);
    entity.artist = typeof entity.artist === 'string' ? entity.artist : entity?.artist?._id as string;
  }
}
