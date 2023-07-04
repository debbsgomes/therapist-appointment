import { TherapistProfileComponent } from './therapist-profile/therapist-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'therapist-profile/:id', component: TherapistProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
