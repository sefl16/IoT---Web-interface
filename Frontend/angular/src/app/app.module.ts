import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule }    from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ShowapiComponent } from './showapi/showapi.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { ChartsModule } from 'ng2-charts';
import { ApartmentComponent } from './apartment/apartment.component';

//Julia
import { SensorComponent } from './components/sensor/sensor.component';
import { DeviceComponent } from './components/device/device.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';

//Christian
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    ShowapiComponent,
    AboutComponent,
    HomeComponent,
    NavComponent,
    ApartmentComponent,
    AdminComponent,
    LoginComponent,
    CustomerComponent,
    DeviceComponent,
    SensorComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
