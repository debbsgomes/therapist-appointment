import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxStarsModule } from 'ngx-stars';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MockDataService } from './services/mock-data.service';
import { TherapistProfileComponent } from './therapist-profile/therapist-profile.component';
import { NavibarLoginComponent } from './shared/components/navibar-login/navibar-login.component';
import { WebsiteFooterComponent } from './shared/components/website-footer/website-footer.component';
import { RatingComponent } from './shared/components/rating/rating.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TherapistProfileComponent,
    NavibarLoginComponent,
    WebsiteFooterComponent,
    RatingComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxStarsModule,
    CommonModule,
    FormsModule
  ],
  providers: [MockDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
