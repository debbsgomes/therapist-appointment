import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  

  @Input() rating!: number;
  maxStars = 5;

  constructor() {
    this.rating = 0;
  }

  get fullStars(): number[] {
    const roundedRating = Math.floor(this.rating);
    return Array(roundedRating).fill(0);
  }

  get hasHalfStar(): boolean {
    return this.rating % 1 !== 0;
  }
}


