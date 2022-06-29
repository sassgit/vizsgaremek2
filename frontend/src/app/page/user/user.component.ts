import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  list$ = this.userService.getAll();

  editVisible: boolean = false;

  editObj: User = new User();

  deleteConfirmVisible: boolean = false;
  deleteObj: User = new User();

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  tableButtonClick($event:[string, User]){
    if ($event[0] === 'edit') {
      this.editVisible = true;
      this.userService.getOne($event[1]._id as string).subscribe({
        next: entity => this.editObj = entity
      })
    } else if ($event[0] === 'delete') {
      this.deleteObj = $event[1];
      this.deleteConfirmVisible = true;
    }
  }

  editOkButton(entity: User): void {
    this.editVisible = false;
    (entity._id ? this.userService.update(entity) : this.userService.create(entity))
      .subscribe({ next: () => this.list$ = this.userService.getAll() });
  }

  deleteConfirmed($event: User) {
    this.deleteConfirmVisible = false;
    this.userService.delete($event._id as string).subscribe({
      next: (response) => {
        this.list$ = this.userService.getAll();
      }
    })
  }

  createClick() : void {
    this.editObj = new User();
    this.editVisible = true;
  }

  ngOnInit(): void {
  }

}
