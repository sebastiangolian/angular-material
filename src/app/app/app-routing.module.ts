import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CarDialogComponent } from './components/car-dialog/car-dialog.component';
import { CarComponent } from './components/car/car.component';
import { PeriodicComponent } from './components/periodic/periodic.component';
import { FightersComponent } from './components/fighters/fighters.component';
import { PostComponent } from './components/post/post.component';
import { IssueComponent } from './components/issue/issue.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'car', component: CarComponent },
  { path: 'car-dialog', component: CarDialogComponent },
  { path: 'periodic', component: PeriodicComponent },
  { path: 'about', component: AboutComponent },
  { path: 'logout', component: HomeComponent },
  { path: 'fighters', component: FightersComponent },
  { path: 'posts', component: PostComponent },
  { path: 'issue', component: IssueComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
