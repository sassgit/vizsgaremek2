import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './../model/user';


export interface IAuth {
  accessToken: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = `${environment.apiUrl}login`;

  user$ = new BehaviorSubject<User | null>(null);

  accessToken$ = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    const loginStorage = sessionStorage.getItem(environment.loginSessionName);
    if (loginStorage) {
      const login:IAuth = JSON.parse(loginStorage) as IAuth;
      this.accessToken$.next(login.accessToken);
      this.user$.next(login.user);
    }
    this.user$.subscribe( {
      next: user => {
        if (user)
          this.router.navigate(['/']);
        else {
          sessionStorage.removeItem(environment.loginSessionName);
          this.router.navigate(['/', 'login']);
          this.accessToken$.next('');
        }
      }
    })
   }

   login(user: User): void {
    this.http.post<IAuth>(this.loginUrl, user).subscribe({
      next: (response: IAuth) => {
        sessionStorage.setItem(environment.loginSessionName, JSON.stringify(response));
        this.accessToken$.next(response.accessToken);
        this.user$.next(response.user);
      },
      error: (err) => console.error(err),
    })
   }

   logout(): void {
    this.user$.next(null);
   }

}
