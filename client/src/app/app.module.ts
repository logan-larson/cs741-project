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
import { IndependentEventListComponent } from './components/home/independent-event-list/independent-event-list.component';
import { EventComponent } from './components/home/independent-event-list/event/event.component';
import { AddEventComponent } from './components/home/add-event/add-event.component';
import { EventViewerComponent } from './components/home/event-viewer/event-viewer.component';
import { VolunteerSectionComponent } from './components/home/event-viewer/volunteer-section/volunteer-section.component';
import { EventDetailsComponent } from './components/home/event-viewer/event-details/event-details.component';
import { DonorSectionComponent } from './components/home/event-viewer/donor-section/donor-section.component';
import { MakeDonationComponent } from './components/home/make-donation/make-donation.component';
import { SideBarComponent } from './components/home/side-bar/side-bar.component';
import { RegistrationsListComponent } from './components/home/registrations-list/registrations-list.component';
import { RegistrationComponent } from './components/home/registrations-list/registration/registration.component';
import { DonationsListComponent } from './components/home/donations-list/donations-list.component';
import { DonationComponent } from './components/home/donations-list/donation/donation.component';
import { UsersListComponent } from './components/home/users-list/users-list.component';
import { UserComponent } from './components/home/users-list/user/user.component';
import { ReportComponent } from './components/home/report/report.component';
import { HelpComponent } from './components/home/help/help.component';

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
    DonorSectionComponent,
    MakeDonationComponent,
    SideBarComponent,
    RegistrationsListComponent,
    RegistrationComponent,
    DonationsListComponent,
    DonationComponent,
    UsersListComponent,
    UserComponent,
    ReportComponent,
    HelpComponent
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
