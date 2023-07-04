import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-therapist-profile',
  templateUrl: './therapist-profile.component.html',
  styleUrls: ['./therapist-profile.component.scss']
})
export class TherapistProfileComponent {
  @Input() psychologist: any; // Type appropriately based on the psychologist data structure
  //@Input() testimonial: string;
}