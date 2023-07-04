import { MockDataService } from './../services/mock-data.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TherapistService } from '../services/therapist.service';
import { Therapist } from '../therapist.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  therapists: Therapist[] = [];
  dbData: any;


  constructor(
    private therapistService: TherapistService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private mockDataService: MockDataService
    ) {}

    ngOnInit(): void {
      this.getTherapists();
    }

    getTherapists(): void {
      this.therapistService.getTherapists().subscribe(
        therapists => {
          this.therapists = therapists;
          console.log(this.therapists);
        },
        error => console.log(error)
      );
    }

    getDbData(): void {
      this.mockDataService.getDbData().subscribe(
        data => {
          this.dbData = data;
          console.log(this.dbData);
        },
        error => console.log(error)
      );
    }

    isLoggedIn(): boolean {
      return this.authenticationService.isLoggedIn;
    }
  
    selectTherapist(therapist: Therapist): void {
      if (this.authenticationService.isLoggedIn) {
        this.router.navigate(['/therapist-profile', therapist.id]);
      } else {
        // Handle when user is not logged in
        console.log("Please log in to view therapist profile.");
      }
    }

    
}
