import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HomeComponent } from './home/home.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { NavbarComponent } from './navbar/navbar.component'
import { AllBookingComponent } from './all-booking/all-booking.component'
import { HttpClientModule } from '@angular/common/http';

//Table Module
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'


@NgModule({
    declarations: [AppComponent, HomeComponent, SidebarComponent, NavbarComponent, AllBookingComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, NgbModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
