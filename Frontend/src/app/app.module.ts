import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SensorComponent } from './components/sensor/sensor.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { DeviceComponent } from './components/device/device.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { ApartmentComponent } from './components/apartment/apartment.component';
import { AlertComponent } from './alert/alert.component'
import { JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptor } from './jwt-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { UserViewComponent } from './components/user-view/user-view.component';

export function tokenGetter() {
  return localStorage.getItem('currentUser');
}

@NgModule({
  declarations: [
    AppComponent,
    SensorComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    ApartmentComponent,
    AlertComponent,
    UserViewComponent,
    DeviceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['127.0.0.1:8080'],
        blacklistedRoutes: ['example.com/examplebadroute/']
      }
    })

  ],
    providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
