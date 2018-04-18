import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { AddUserComponent } from './user/add-user/add-user.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { ViewTaskComponent } from './task/view-task/view-task.component';

import { DataTableModule } from 'primeng/datatable';
import { SliderModule } from 'primeng/slider';


@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    AddProjectComponent,
    AddTaskComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonRangeSliderModule,
    NgxMyDatePickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
