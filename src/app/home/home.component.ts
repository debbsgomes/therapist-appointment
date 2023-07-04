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
    @Inject(Router) private router: Router,
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
  
    selectTherapist(therapist: Therapist): void {
      this.router.navigate(['/therapists', therapist.id]);
    }

    isLoggedIn(): boolean {
      return this.authenticationService.isLoggedIn;
    }
}
