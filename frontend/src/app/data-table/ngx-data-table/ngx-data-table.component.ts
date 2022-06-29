import { Observable, of } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


export interface INgxTableColumn {
  title: string;
  key: string;
  interpreter?: string;
  divButton?: {id: string, class: string, text: string} [];
}

@Component({
  selector: 'ngx-data-table',
  templateUrl: './ngx-data-table.component.html',
  styleUrls: ['./ngx-data-table.component.scss']
})
export class NgxDataTableComponent< T extends {[x: string]: any}> implements OnInit {

  @Input() list: T[] = [];

  @Input() columns: INgxTableColumn[] = [];

  @Input() pageSize: number = 10;

  @Input() interpreter: Function | null = null;

  @Output() onButtonClick: EventEmitter<[string, T]> = new EventEmitter<[string, T]>();

  @Output() onRowClick: EventEmitter<T> = new EventEmitter<T>();

  startSlice: number = 0;

  endSlice: number = 10;

  maxPage: number = 11;

  page: number = 1;

  constructor() { }

  interpret(interpreter: string | undefined, data: any): Observable<any> {
    if (!interpreter || !this.interpreter)
      return data;
    else
      return this.interpreter(interpreter, data);
  }

  get pageCount(): number {
    return Math.ceil(this.list.length / this.pageSize);
  }

  get pageList(): {text: string, page: number}[] {
    const length = this.pageCount;
    if(length <= this.maxPage)
      return Array.from({length}).map((e, i) => ({text: (i + 1).toString(), page: i + 1}));
    else {
      let start = this.page - Math.floor(this.maxPage / 2);
      if (start < 1)
        start = 1;
      else if (start + this.maxPage> this.pageCount)
        start = this.pageCount - this.maxPage + 1;
      return Array.from({length: this.maxPage}).map((e, i) => ({
        text: i == 0 && start > 1 || i == this.maxPage - 1 && i + start < length
          ? '...'
          : (i + start).toString(),
        page: (i + start)
      }));
    }
  }

  jumpToPage(pageNum: number): void {
    this.page = pageNum = Math.min(Math.max(1, pageNum), this.pageCount);
    this.startSlice = this.pageSize * (pageNum - 1);
    this.endSlice = this.startSlice + this.pageSize;
    if (this.endSlice > this.list.length){
      this.endSlice = this.list.length;
      this.startSlice = Math.max(0, this.endSlice - this.pageSize);
    }
  }

  raiseButtonClick(name: string, entity: T): void {
    this.onButtonClick.emit([name, entity]);
  }

  raiseRowClick(entity: T): void {
    this.onRowClick.emit(entity);
  }


  ngOnInit(): void {
  }

}
