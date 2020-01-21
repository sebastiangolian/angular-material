import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CarDialogComponent } from './components/car-dialog/car-dialog.component';
import { CarComponent } from './components/car/car.component';
import { CarNewComponent } from './components/car-new/car-new.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'car', component: CarComponent },
  { path: 'car-dialog', component: CarDialogComponent },
  { path: 'car-new', component: CarNewComponent },
  { path: 'about', component: AboutComponent },
  { path: 'logout', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
