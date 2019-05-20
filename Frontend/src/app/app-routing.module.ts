import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {SensorComponent} from './components/sensor/sensor.component';
import {ApartmentViewComponent} from './components/apartment-view/apartment-view.component';
import {ComplexesComponent} from './components/complexes/complexes.component';
import {AdminComponent} from './components/admin/admin.component';
import {UserViewComponent} from './components/user-view/user-view.component';
import {HomeComponent} from './components/home/home.component';

import { AuthGuard } from './auth-guard';

const routes: Routes = [
     {path: 'apartment/:id', component: ApartmentViewComponent, canActivate: [AuthGuard]},
     {path: 'login', component: LoginComponent},
     {path: 'complexes', component: ComplexesComponent, canActivate: [AuthGuard]},
     //Add canActivate: [AuthGuard] to admin for safe routing
     {path: 'admin', component: AdminComponent},
     {path: 'user/:id', component: UserViewComponent, canActivate: [AuthGuard]},
     {path: 'sensor-view/:id', component: SensorComponent},
     {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
