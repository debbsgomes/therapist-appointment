import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxStarsModule } from 'ngx-stars';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MockDataService } from './services/mock-data.service';
import { TherapistProfileComponent } from './therapist-profile/therapist-profile.component';
import { NavibarLoginComponent } from './shared/components/navibar-login/navibar-login.component';
import { WebsiteFooterComponent } from './shared/components/website-footer/website-footer.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TherapistProfileComponent,
    NavibarLoginComponent,
    WebsiteFooterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxStarsModule
    
  ],
  providers: [MockDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
