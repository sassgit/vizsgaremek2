import { environment } from './../../../environments/environment';
import { Observable, of } from 'rxjs';
import { Photo } from './../../model/photo';
import { Router } from '@angular/router';
import { PhotoService } from './../../service/photo.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  fileSizeKbMode = 'fileSizeKb';

  public interpreterBound!: Function;

  imagesUrl = `${environment.apiUrl}images`

  list$ = this.photoService.getAll();

  editObj: Photo = new Photo();
  editVisible: boolean = false;

  deleteConfirmVisible: boolean = false;
  deleteObj: Photo = new Photo();

  constructor(
    private photoService: PhotoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.interpreterBound = this.interpreterCallBack.bind(this);
  }

  fileSizeKb(data: any): string {
    if (isFinite(data))
    {
      const num = Number(data);
      if (num < 1024 * 8)
        return num.toFixed(0)
      else if (num < 1024*1024 * 8)
        return `${(Number(data) / 1024).toFixed(1)} KiB`;
      else
        return `${(Number(data) / 1024/1024).toFixed(1)} MiB`;
    } else
    return '-';
  }

  interpreterCallBack(mode: string, data: any) {
    if (mode === this.fileSizeKbMode) {
      return this.fileSizeKb(data);
    } else
      return '';
  }

  tableButtonClick($event:[string, Photo]) {
    if ($event[0] === 'edit') {
      this.editVisible = true;
      this.photoService.getOne($event[1]._id as string).subscribe(
        { next: entity => this.editObj = entity }
      );
    } else if ($event[0] === 'delete') {
      this.deleteObj = $event[1];
      this.deleteConfirmVisible = true;
    }
  }

  editOkButton(entity: Photo): void {
    this.editVisible = false;
    ( entity._id ? this.photoService.update(entity) : this.photoService.create(entity) )
      .subscribe({ next: (e) => this.list$ = this.photoService.getAll() });
  }

  deleteConfirmed($event: Photo) {
    this.deleteConfirmVisible = false;
    this.photoService.delete($event._id as string).subscribe({
      next: (response) => {
        this.list$ = this.photoService.getAll();
      }
    })
  }

  onFileSelected(event: Event): void {
    const file: File | undefined = (event.target as HTMLInputElement)?.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('uploadFile', file);
      this.photoService.post(formData)
        .subscribe({
          next: (response: Photo) => this.list$ = this.photoService.getAll(),
          error: err => console.error(err),
        });
    }
  }

}
