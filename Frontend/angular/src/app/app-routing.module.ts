import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }  from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ApartmentComponent } from './apartment/apartment.component';

import {CustomerComponent} from './components/customer/customer.component';
import {LoginComponent} from './components/login/login.component';
import {SensorComponent} from './components/sensor/sensor.component';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'about/:id', component: ApartmentComponent},
  {path: 'customer', component: CustomerComponent},
   {path: 'sensor', component: SensorComponent},
   {path: 'login', component: LoginComponent},
   {path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
