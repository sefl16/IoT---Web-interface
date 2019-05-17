import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerComponent} from './components/customer/customer.component';
import {LoginComponent} from './components/login/login.component';
import {SensorComponent} from './components/sensor/sensor.component';
import {ApartmentComponent} from './components/apartment/apartment.component';
import {AdminComponent} from './components/admin/admin.component';
import { UserViewComponent } from './components/user-view/user-view.component';
const routes: Routes = [
     {path: 'sensor/:id', component: SensorComponent},
     {path: 'login', component: LoginComponent},
     {path: 'apartment', component: ApartmentComponent},
     {path: 'admin', component: AdminComponent},
     {path: 'user/:id', component: UserViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
