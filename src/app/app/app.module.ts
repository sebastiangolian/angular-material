import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatMenuModule, MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatListModule, MatDividerModule, MatAutocompleteModule, MatGridListModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatSidenavModule, MatStepperModule, MatTabsModule, MatExpansionModule, MatButtonToggleModule, MatChipsModule, MatDialogModule, MatTooltipModule, MatSnackBarModule, MatTableModule, MatSortModule, MatPaginatorModule, MatTreeModule, MatNativeDateModule, MatBadgeModule, MatRippleModule } from '@angular/material';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PostComponent } from './components/post/post.component';
import { CarComponent } from './components/car/car.component';
import { IssueComponent } from './components/issue/issue.component';
import { IssueAddComponent } from './components/issue/dialogs/issue-add/issue-add.component';
import { IssueEditComponent } from './components/issue/dialogs/issue-edit/issue-edit.component';
import { IssueDeleteComponent } from './components/issue/dialogs/issue-delete/issue-delete.component';
import { CommitComponent } from './components/commit/commit.component';
import { CommitAddComponent } from './components/commit/dialogs/commit-add/commit-add.component';
import { CommitEditComponent } from './components/commit/dialogs/commit-edit/commit-edit.component';
import { CommitDeleteComponent } from './components/commit/dialogs/commit-delete/commit-delete.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PostComponent,
    CarComponent,
    IssueComponent,
    IssueAddComponent,
    IssueEditComponent,
    IssueDeleteComponent,
    CommitComponent,
    CommitAddComponent,
    CommitEditComponent,
    CommitDeleteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTreeModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatDividerModule,
    MatRippleModule
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [CommitEditComponent]
})
export class AppModule { }
