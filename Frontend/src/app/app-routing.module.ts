import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerComponent} from './components/customer/customer.component';
import {LoginComponent} from './components/login/login.component';
import {SensorComponent} from './components/sensor/sensor.component';
import {ApartmentComponent} from './components/apartment/apartment.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AdminComponent} from './components/admin/admin.component';
const routes: Routes = [
    {path: 'customer', component: CustomerComponent},
     {path: 'sensor/:id', component: SensorComponent},
     {path: 'login', component: LoginComponent},
     {path: 'apartment', component: ApartmentComponent},
     {path: 'dashboard', component: DashboardComponent},
     {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
