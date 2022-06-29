import { PaintingService } from './../../service/painting.service';
import { CustomerService } from './../../service/customer.service';
import { Painting } from './../../model/painting';
import { Customer } from './../../model/customer';
import { Order } from './../../model/order';
import { of, Observable, switchMap } from 'rxjs';
import { OrderService } from './../../service/order.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  list$ = this.orderService.getAll();

  public interpreterBound!: Function;

  public customerInterpreterMode = 'customer.fullName';
  public paintingInterpreterMode = 'paintings.length';

  public artistInterpreterMode = 'artist.fullName';
  public photoInterpreterMode = 'photos.length';


  editVisible: boolean = false;

  customerSelectVisible: boolean = false;
  editObj: Order = new Order();
  customerList$: Observable<Customer[]> = of([]);

  paintingSelectVisible: boolean = false;
  paintingList$: Observable<Painting[]> = of([]);

  deleteConfirmVisible: boolean = false;
  deleteObj: Order = new Order();

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private paintingService: PaintingService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.interpreterBound = this.interpreterCallBack.bind(this);
  }

  interpreterCallBack(mode: string, data: any) {
    if (mode === this.customerInterpreterMode) {
      return data?.fullName;
    } else if (mode === this.paintingInterpreterMode) {
      return data.length;
    } else if (mode === this.artistInterpreterMode) {
      return data.fullname;
    } else if (mode === this.photoInterpreterMode) {
      return data.length;
    } else {
      return '';
    }
  }

  tableButtonClick($event:[string, Order]){
    if ($event[0] === 'edit') {
      this.editVisible = true;
      this.orderService.getOne($event[1]._id as string).subscribe({
        next: entity => this.editObj = entity
      })
    } else if ($event[0] === 'delete') {
      this.deleteObj = $event[1];
      this.deleteConfirmVisible = true;
    }
  }

  editOkButton(entity: Order): void {
    this.editVisible = false;
    (entity._id ? this.orderService.update(entity) : this.orderService.create(entity))
      .subscribe({ next: () => this.list$ = this.orderService.getAll()});
  }

  getCustomerName(entity: Order): string {
    return (entity.customer as Customer)?.fullName;
  }

  changeCustomer(entity: Order): void {
    this.customerSelectVisible = true;
    this.editObj = entity;
    this.customerList$ = this.customerService.getAll();
  }

  customerSelect(entity: Customer): void {
    this.editObj.customer = entity;
    this.customerSelectVisible = false;
  }

  paintingSelect(entity: Painting): void {
    (this.editObj.paintings as any).push(entity)
    this.paintingSelectVisible = false;
  }


  selectPainting(entity: Order): void {
    this.editObj = entity;
    this.paintingSelectVisible = true;
    this.paintingList$ = this.paintingService.getAll();
  }

  deletePainting(entity: Order, painting: Painting| string): void {
    entity.paintings = entity.paintings.filter(e => e != painting);
  }

  deleteConfirmed($event: Order): void {
    this.deleteConfirmVisible = false;
    this.orderService.delete($event._id as string).subscribe({
      next: (response) => {
        this.list$ = this.orderService.getAll();
      }
    })
  }

  createOrderClick(): void {
    this.editObj = new Order();
    this.editVisible = true;
  }

}
