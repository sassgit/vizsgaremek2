import { map } from 'rxjs';
import { SummaryService } from './../../service/summary.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  summary$ = this.summaryService.get().pipe(map(e => [e]));

    constructor(
    private summaryService: SummaryService,
  ) { }

  ngOnInit(): void {
  }

  }
