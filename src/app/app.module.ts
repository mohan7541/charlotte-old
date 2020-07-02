import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {CommonModule} from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RootComponent } from './components/root/root.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PeopleComponent, EditPeopleDialog } from './components/people/people.component';
import { AngularMaterialModule } from './angular-material.module';
import { EdgeComponent, EditEdgeDialog } from './components/edge/edge.component';
import {EditPlacesDialog, PlacesComponent} from './components/places/places.component';
import { ItemComponent, EditItemDialog } from './components/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RootComponent,
    DashboardComponent,
    PeopleComponent,
    EditPeopleDialog,
    EdgeComponent,
    EditEdgeDialog,
    PlacesComponent,
    EditPlacesDialog,
    ItemComponent,
    EditItemDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
