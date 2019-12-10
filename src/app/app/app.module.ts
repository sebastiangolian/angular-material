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
import { CarComponent } from './components/car/car.component';
import { CarAddComponent } from './components/car/dialog/car-add/car-add.component';
import { CarEditComponent } from './components/car/dialog/car-edit/car-edit.component';
import { CarDeleteComponent } from './components/car/dialog/car-delete/car-delete.component';
import { CarOneSideComponent } from './components/car-one-side/car-one-side.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CarComponent,
    CarAddComponent,
    CarEditComponent,
    CarDeleteComponent,
    CarOneSideComponent
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
  entryComponents: [HomeComponent]
})
export class AppModule { }
