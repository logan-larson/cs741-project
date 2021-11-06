import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HeaderComponent } from './components/home/header/header.component';
import { IndependentEventListComponent } from './components/home/program-event-list/independent-event-list.component';
import { EventComponent } from './components/home/program-event-list/event/event.component';
import { AddEventComponent } from './components/home/add-event/add-event.component';
import { EventViewerComponent } from './components/home/event-viewer/event-viewer.component';
import { VolunteerSectionComponent } from './components/home/event-viewer/volunteer-section/volunteer-section.component';
import { EventDetailsComponent } from './components/home/event-viewer/event-details/event-details.component';
import { ProgramComponent } from './components/home/program-list/program/program.component';
import { AddProgramComponent } from './components/home/add-program/add-program.component';
import { ProgramListComponent } from './components/home/program-list/program-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    IndependentEventListComponent,
    EventComponent,
    AddEventComponent,
    EventViewerComponent,
    VolunteerSectionComponent,
    EventDetailsComponent,
    ProgramComponent,
    AddProgramComponent,
    ProgramListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
