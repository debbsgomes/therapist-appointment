import { Component, OnInit } from '@angular/core';
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
    private router: Router
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

  isLoggedIn(): boolean {
    // Replace this with your actual authentication logic
    return true;
  }

  selectTherapist(therapist: Therapist): void {
    if (this.isLoggedIn()) {
      this.router.navigate(['/therapist-profile', therapist.id]);
    } else {
      // Handle when user is not logged in
      console.log("Please log in to view therapist profile.");
    }
  }
}
