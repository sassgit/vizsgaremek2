import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { AuthGuardService } from './service/auth-guard.service';
import { ArtistComponent } from './page/artist/artist.component';
import { CustomerComponent } from './page/customer/customer.component';
import { LoginComponent } from './page/login/login.component';
import { OrderComponent } from './page/order/order.component';
import { PaintingComponent } from './page/painting/painting.component';
import { PhotoComponent } from './page/photo/photo.component';
import { UserComponent } from './page/user/user.component';
import { HomeComponent } from './page/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'artist',
    component: ArtistComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedRoles: ['root', 'edit', 'read'],
      forbiddenInfo: 'Művészek',
    },
  },
  {
    path: 'customer',
    component: CustomerComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedRoles: ['root', 'edit', 'read'],
      forbiddenInfo: 'Vevők',
    },
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedRoles: ['root', 'edit', 'read'],
      forbiddenInfo: 'Rendelések',
    },
  },
  {
    path: 'painting',
    component: PaintingComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedRoles: ['root', 'edit', 'read'],
      forbiddenInfo: 'Festmények',
    },
  },
  {
    path: 'photo',
    component: PhotoComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedRoles: ['root', 'edit', 'read'],
      forbiddenInfo: 'Festményfotók',
    },
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedRoles: ['root'],
      forbiddenInfo: 'Felhasználók',
    },
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'forbidden/:id',
    component: ForbiddenComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
