import { AuthService } from './../../service/auth.service';
import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.logout();
  }

  onLogin(): void {
    this.auth.login(this.user);
  }

}
