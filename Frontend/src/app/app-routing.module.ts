import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {SensorComponent} from './components/sensor/sensor.component';
import {DeviceComponent} from './components/device/device.component';
import {ApartmentComponent} from './components/apartment/apartment.component';
import {AdminComponent} from './components/admin/admin.component';
import {UserViewComponent} from './components/user-view/user-view.component';
import {HomeComponent} from './components/home/home.component';

import { AuthGuard } from './auth-guard';

const routes: Routes = [
     {path: 'apartment/:id', component: DeviceComponent, canActivate: [AuthGuard]},
     {path: 'login', component: LoginComponent},
     {path: 'complexes', component: ApartmentComponent, canActivate: [AuthGuard]},
     {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
     {path: 'user/:id', component: UserViewComponent, canActivate: [AuthGuard]},
     {path: 'sensor-view/:id', component: SensorComponent},
     {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
