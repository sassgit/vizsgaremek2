import { map, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {

  public finfo$ = this.activatedRoute.params.pipe(map(params => `"${params['id']}" `));

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

}
