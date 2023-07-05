import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Therapist } from '../therapist.model';

@Injectable({
  providedIn: 'root'
})
export class TherapistService {

  private therapistsURL = 'http://localhost:3000/therapists';
  
  constructor(private http: HttpClient) {}

  getTherapists(): Observable<Therapist[]> {
    return this.http.get<any[]>(this.therapistsURL).pipe(
      map(data => data.map(this.mapToTherapist))
    );
  }

  getTherapistById(id: string): Observable<Therapist | undefined> {
    const therapistURL = `${this.therapistsURL}/${id}`;
    return this.http.get<any>(therapistURL).pipe(
      map(data => this.mapToTherapist(data))
    );
  }

  private mapToTherapist(data: any): Therapist {
    return {
      id: data.id,
      name: data.name,
      photoUrl: data.photoUrl,
      position: data.position,
      location: data.location,
      rating: data.rating,
      reviews: data.reviews,
      pricePerSection: data.pricePerSection,
      minutesIncluded: data.minutesIncluded,
      description: data.description,
      availableHours: data.availableHours
    };
  }
}
