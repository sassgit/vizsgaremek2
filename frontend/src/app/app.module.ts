import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JwtInterceptor } from './service/jwt-interceptor';
import { AuthService } from './service/auth.service';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { DataTableModule } from './data-table/data-table.module';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { ArtistComponent } from './page/artist/artist.component';
import { CustomerComponent } from './page/customer/customer.component';
import { OrderComponent } from './page/order/order.component';
import { PaintingComponent } from './page/painting/painting.component';
import { PhotoComponent } from './page/photo/photo.component';
import { UserComponent } from './page/user/user.component';
import { ModalComponent } from './common/modal/modal.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    ArtistComponent,
    CustomerComponent,
    OrderComponent,
    PaintingComponent,
    PhotoComponent,
    UserComponent,
    ModalComponent,
    ForbiddenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      deps: [
        AuthService,
      ],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
