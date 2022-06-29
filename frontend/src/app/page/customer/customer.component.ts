import { Observable, of } from 'rxjs';
import { Customer } from './../../model/customer';
import { Router } from '@angular/router';
import { CustomerService } from './../../service/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  list$ = this.customerService.getAll();

  editVisible: boolean = false;

  editObj: Customer = new Customer();

  deleteConfirmVisible: boolean = false;
  deleteObj: Customer = new Customer();

  constructor(
    private customerService: CustomerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  tableButtonClick($event:[string, Customer]){
    if ($event[0] === 'edit') {
      this.editVisible = true;
      this.customerService.getOne($event[1]._id as string).subscribe({
        next: entity => this.editObj = entity
      });
    } else if ($event[0] === 'delete') {
      this.deleteObj = $event[1];
      this.deleteConfirmVisible = true;
    }
  }

  editOkButton(entity: Customer): void {
    this.editVisible = false;
    (entity._id ? this.customerService.update(entity) : this.customerService.create(entity)).subscribe({
      next: () => this.list$ = this.customerService.getAll() });
  }

  deleteConfirmed($event: Customer) {
    this.deleteConfirmVisible = false;
    this.customerService.delete($event._id as string).subscribe({
      next: (response) => {
        this.list$ = this.customerService.getAll();
      }
    })
  }

  createClick() : void {
    this.editObj = new Customer();
    this.editVisible = true;
  }


}
