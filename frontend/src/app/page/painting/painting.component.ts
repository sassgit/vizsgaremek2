import { PhotoService } from './../../service/photo.service';
import { ArtistService } from './../../service/artist.service';
import { Photo } from './../../model/photo';
import { of, Observable } from 'rxjs';
import { Artist } from './../../model/artist';
import { Router } from '@angular/router';
import { PaintingService } from './../../service/painting.service';
import { Component, OnInit } from '@angular/core';
import { Painting } from 'src/app/model/painting';

@Component({
  selector: 'app-painting',
  templateUrl: './painting.component.html',
  styleUrls: ['./painting.component.scss']
})
export class PaintingComponent implements OnInit {

  list$ = this.paintingService.getAll();


  public interpreterBound!: Function;

  public artistInterpreterMode = 'artist.fullName';
  public photoInterpreterMode = 'photos.length';

  editVisible: boolean = false;

  editObj: Painting = new Painting();

  artistSelectVisible: boolean = false;
  artistList$: Observable<Artist[]> = of([]);

  photoSelectVisible: boolean = false;
  photoList$: Observable<Photo[]> = of([]);

  deleteConfirmVisible: boolean = false;
  deleteObj: Painting = new Painting();

  constructor(
    private paintingService: PaintingService,
    private artistService: ArtistService,
    private photoService: PhotoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.interpreterBound = this.interpreterCallBack.bind(this);
  }

  interpreterCallBack(mode: string, data: any) {
    if (mode === this.artistInterpreterMode) {
      return data?.fullName;
    } else if (mode === this.photoInterpreterMode) {
      return data.length;
    } else {
      return '';
    }
  }

  tableButtonClick($event:[string, Painting]){
    if ($event[0] === 'edit') {
      this.editVisible = true;
      this.paintingService.getOne($event[1]._id as string).subscribe(
        { next: entity => this.editObj = entity }
      );
    } else if ($event[0] === 'delete') {
      this.deleteObj = $event[1];
      this.deleteConfirmVisible = true;
    }
  }


  changeArtist(entity: Painting): void {
    this.artistSelectVisible = true;
    this.editObj = entity;
    this.artistList$ = this.artistService.getAll();
  }

  artistSelect(entity: Artist): void {
    this.editObj.artist = entity;
    this.artistSelectVisible = false;
  }

  getArtistName(entity: Painting): string {
    return `${(entity.artist as Artist)?.fullName} (${(entity.artist as Artist)?.artistName})`;
  }

  deletePhoto(entity: Painting, photo: Photo| string): void {
    entity.photos = entity.photos.filter(e => e != photo);
  }

  editOkButton(entity: Painting): void {
    this.editVisible = false;
    ( entity._id ? this.paintingService.update(entity) : this.paintingService.create(entity) )
      .subscribe({ next: (e) => this.list$ = this.paintingService.getAll() });
  }

  photoSelect(entity: Photo): void {
    (this.editObj.photos as any).push(entity)
    this.photoSelectVisible = false;
  }


  selectPhoto(entity: Painting): void {
    this.editObj = entity;
    this.photoSelectVisible = true;
    this.photoList$ = this.photoService.getAll();
  }


  deleteConfirmed($event: Painting) {
    this.deleteConfirmVisible = false;
    this.paintingService.delete($event._id as string).subscribe({
      next: (response) => {
        this.list$ = this.paintingService.getAll();
      }
    })
  }

  createClick() : void {
    this.editObj = new Painting();
    this.editVisible = true;
  }

}
