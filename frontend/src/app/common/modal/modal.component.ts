import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  private mvisible: boolean = false;
  @Input() set visible(value: boolean) {
    if (this.mvisible != value)
      this.visibleChange.emit(this.mvisible = value);
  }

  @Input() okButtonText: string = 'Ment';
  @Input() okButtonClass: string = 'btn btn-primary';
  @Input() cancelButtonText: string = 'Mégsem';
  @Input() cancelButtonClass: string = 'btn btn-secondary';

  @Input() innerWidth: string = '80%';

  @Input() zIndex: number = 10000;

  @Output() onOkButtonClick = new EventEmitter();
  @Output() onCancelButtonClick = new EventEmitter();

  get visible(): boolean {
    return this.mvisible;
  }
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  okButtonClick(): void {
    this.onOkButtonClick.emit();
  }
  cancelButtonClick(): void {
    this.visible = false;
    this.onCancelButtonClick.emit();
  }

}
