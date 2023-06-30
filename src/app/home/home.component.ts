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


  constructor(
    private therapistService: TherapistService,
    @Inject(Router) private router: Router
    ) {}

    ngOnInit(): void {
      this.getTherapists();
    }

    getTherapists(): void {
      this.therapistService.getTherapists().subscribe(
        therapists => {
          this.therapists = therapists;
          console.log(this.therapists); // Add this line to check the retrieved data
        },
        error => console.log(error)
      );
    }
  
    selectTherapist(therapist: Therapist): void {
      this.router.navigate(['/therapists', therapist.id]);
    }
}
