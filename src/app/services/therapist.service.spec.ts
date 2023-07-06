import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TherapistService } from './therapist.service';
import { Therapist } from '../therapist.model';

describe('TherapistService', () => {
  let service: TherapistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TherapistService],
    });
    service = TestBed.inject(TherapistService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve therapists', () => {
    const mockTherapists: Therapist[] = [
      {
        id: 1,
        name: 'John',
        photoUrl: 'http://example.com/johndoe.jpg',
        position: 'Psychologist',
        location: 'New York',
        rating: 4.5,
        reviews: 100,
        pricePerSection: 50,
        minutesIncluded: 60,
        description: 'Lorem ipsum dolor sit amet',
        availableHours: ['10:00 AM', '2:00 PM', '6:00 PM'],
      },
    ];

    service.getTherapists().subscribe((therapists) => {
      expect(therapists).toEqual(mockTherapists);
    });

    const req = httpMock.expectOne('http://localhost:3000/therapists');
    expect(req.request.method).toBe('GET');
    req.flush(mockTherapists);
  });

  it('should retrieve therapist by ID', () => {
    const mockTherapist: Therapist = {
      id: 1,
      name: 'John Doe',
      photoUrl: 'http://example.com/johndoe.jpg',
      position: 'Psychologist',
      location: 'New York',
      rating: 4.5,
      reviews: 100,
      pricePerSection: 50,
      minutesIncluded: 60,
      description: 'Lorem ipsum dolor sit amet',
      availableHours: ['10:00 AM', '2:00 PM', '6:00 PM'],
    };
    const therapistId = '1';

    service.getTherapistById(therapistId).subscribe((therapist) => {
      expect(therapist).toEqual(mockTherapist);
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/therapists/${therapistId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockTherapist);
  });
});
