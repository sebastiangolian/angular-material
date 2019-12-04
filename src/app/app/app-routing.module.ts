import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PostComponent } from './components/post/post.component';
import { CarComponent } from './components/car/car.component';
import { CarOneSideComponent } from './components/car-one-side/car-one-side.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars-one-side', component: CarOneSideComponent },
  { path: 'posts', component: PostComponent },
  { path: 'about', component: AboutComponent },
  { path: 'logout', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
