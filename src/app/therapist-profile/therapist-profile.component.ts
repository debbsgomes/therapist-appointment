import { Component, Input, Inject } from '@angular/core';
import { MockDataService } from './../services/mock-data.service';
import { Router } from '@angular/router';
import { TherapistService } from '../services/therapist.service';
import { Therapist } from '../therapist.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-therapist-profile',
  templateUrl: './therapist-profile.component.html',
  styleUrls: ['./therapist-profile.component.scss'],
  
})
export class TherapistProfileComponent {
  therapists: Therapist[] = [];
  dbData: any

  constructor(
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    private therapistService: TherapistService,
    private mockDataService: MockDataService
    ) { }

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const therapistId = params.get('id');
        if (therapistId) {
          this.therapistService.getTherapistById(therapistId).subscribe(
            therapist => {
              if (therapist) {
                this.therapists = [therapist];
              }
            }
          );
        }
      });
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
}