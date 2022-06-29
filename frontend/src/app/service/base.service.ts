import { BaseModel } from './../model/base.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends BaseModel> {

  list: T[] = [];

  apiUrl = `${environment.apiUrl}${this.entityName}`;

  constructor(
    protected http: HttpClient,
    @Inject(String) private entityName: string,
  ) { }

  create(entity: T): Observable<T> {
    this.prepareToSend(entity);
    return this.http.put<T>(this.apiUrl, entity);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }

  getOne(id: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  update(entity: T): Observable<T> {
    const id = entity._id;
    this.prepareToSend(entity);
    return this.http.patch<T>(`${this.apiUrl}/${id}`, entity);
  }

  delete(id: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${id}`);
  }

  protected prepareToSend(entity: T): void {
    delete entity._id;
  };

}
