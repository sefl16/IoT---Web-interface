import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {SensorComponent} from './components/sensor/sensor.component';
import {DeviceComponent} from './components/device/device.component';
import {ApartmentComponent} from './components/apartment/apartment.component';
import {AdminComponent} from './components/admin/admin.component';
import { UserViewComponent } from './components/user-view/user-view.component';
const routes: Routes = [
     {path: 'apartment/:id', component: DeviceComponent},
     {path: 'login', component: LoginComponent},
     {path: 'complexes', component: ApartmentComponent},
     {path: 'admin', component: AdminComponent},
     {path: 'user/:id', component: UserViewComponent},
     {path: 'sensor-view/:id', component: SensorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
