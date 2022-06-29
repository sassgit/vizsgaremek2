import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ArtistService } from './../../service/artist.service';
import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/model/artist';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  list$ = this.artistService.getAll();

  editVisible: boolean = false;

  editObj: Artist = new Artist();

  deleteConfirmVisible: boolean = false;
  deleteObj: Artist = new Artist();

  constructor(
    private artistService: ArtistService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  tableButtonClick($event:[string, Artist]){
    if ($event[0] === 'edit') {
      this.editVisible = true;
      this.artistService.getOne($event[1]._id as string).subscribe({
        next: entity => this.editObj = entity
      });
    } else if ($event[0] === 'delete') {
      this.deleteObj = $event[1];
      this.deleteConfirmVisible = true;
    }
  }

  editOkButton(entity: Artist): void {
    this.editVisible = false;
    (entity._id ? this.artistService.update(entity) : this.artistService.create(entity))
      .subscribe({ next: () => this.list$ = this.artistService.getAll()});
  }


  deleteConfirmed($event: Artist) {
    this.deleteConfirmVisible = false;
    this.artistService.delete($event._id as string).subscribe({
      next: (response) => {
        this.list$ = this.artistService.getAll();
      }
    })
  }

  createClick() : void {
    this.editObj = new Artist();
    this.editVisible = true;
  }

}
