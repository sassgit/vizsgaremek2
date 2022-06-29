import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Summary } from './../model/summary';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  apiUrl = `${environment.apiUrl}summary`;

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Summary> {
    return this.http.get<Summary>(this.apiUrl);
  }

}
