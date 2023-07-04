import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MockDataService } from './services/mock-data.service';
import { TherapistProfileComponent } from './therapist-profile/therapist-profile.component';
import { NavibarLoginComponent } from './shared/components/navibar-login/navibar-login.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TherapistProfileComponent,
    NavibarLoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [MockDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
