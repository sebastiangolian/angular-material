import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CarDialogComponent } from './components/car-dialog/car-dialog.component';
import { CarOneSideComponent } from './components/car-one-side/car-one-side.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'car-one-side', component: CarOneSideComponent },
  { path: 'car-dialog', component: CarDialogComponent },
  { path: 'about', component: AboutComponent },
  { path: 'logout', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
