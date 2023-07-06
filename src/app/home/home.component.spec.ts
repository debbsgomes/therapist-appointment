import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { of, throwError } from 'rxjs';

import { HomeComponent } from './home.component';

import { TherapistService } from '../services/therapist.service';
import { AuthenticationService } from './../services/authentication.service';
import { MockDataService } from './../services/mock-data.service';

import { Therapist } from '../therapist.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let therapistService: TherapistService;
  let router: Router;
  let authenticationService: AuthenticationService;
  let mockDataService: MockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        TherapistService,
        AuthenticationService,
        MockDataService,
      ],
    });

    therapistService = TestBed.inject(TherapistService);
    router = TestBed.inject(Router);
    authenticationService = TestBed.inject(AuthenticationService);
    mockDataService = TestBed.inject(MockDataService);

    component = new HomeComponent(
      therapistService,
      router,
      authenticationService,
      mockDataService
    );
  });

  describe('Component Initialization', () => {
    it('should call getTherapists in ngOnInit', () => {
      const getTherapistsSpy = jest.spyOn(component, 'getTherapists');

      component.ngOnInit();

      expect(getTherapistsSpy).toHaveBeenCalled();
    });

    it('should set therapists and log them when getTherapists service call succeeds', () => {
      const therapists: Therapist[] = [
        { 
          id: 1,
          name: 'Therapist 1',
          photoUrl: 'https://example.com/therapist1.jpg',
          position: 'Psychologist',
          location: 'New York',
          rating: 4.5,
          reviews: 7,
          pricePerSection: 50,
          minutesIncluded: 60,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          availableHours: [],
        },
        {
          id: 2,
          name: 'Therapist 2',
          photoUrl: 'https://example.com/therapist2.jpg',
          position: 'Counselor',
          location: 'Los Angeles',
          rating: 4.8,
          reviews: 8,
          pricePerSection: 60,
          minutesIncluded: 45,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          availableHours: [],
        },
      ];
      const getTherapistsSpy = jest.spyOn(therapistService, 'getTherapists').mockReturnValue(of(therapists));
      const consoleLogSpy = jest.spyOn(console, 'log');

      component.getTherapists();

      expect(getTherapistsSpy).toHaveBeenCalled();
      expect(component.therapists).toEqual(therapists);
      expect(consoleLogSpy).toHaveBeenCalledWith(component.therapists);
    });

    it('should log the error when getTherapists service call fails', () => {
      const error = 'Failed to retrieve therapists';
      const getTherapistsSpy = jest.spyOn(therapistService, 'getTherapists').mockReturnValue(throwError(error));
      const consoleLogSpy = jest.spyOn(console, 'log');

      component.getTherapists();

      expect(getTherapistsSpy).toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenCalledWith(error);
    });

    it('should set dbData and log it when getDbData service call succeeds', () => {
      const data = { /* mocked data object */ };
      const getDbDataSpy = jest.spyOn(mockDataService, 'getDbData').mockReturnValue(of(data));
      const consoleLogSpy = jest.spyOn(console, 'log');

      component.getDbData();

      expect(getDbDataSpy).toHaveBeenCalled();
      expect(component.dbData).toEqual(data);
      expect(consoleLogSpy).toHaveBeenCalledWith(component.dbData);
    });

    it('should log the error when getDbData service call fails', () => {
      const error = 'Failed to retrieve data';
      const getDbDataSpy = jest.spyOn(mockDataService, 'getDbData').mockReturnValue(throwError(error));
      const consoleLogSpy = jest.spyOn(console, 'log');

      component.getDbData();

      expect(getDbDataSpy).toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenCalledWith(error);
    });

    it('should return the value from the authenticationService for isLoggedIn', () => {
      authenticationService.isLoggedIn = true;

      const result = component.isLoggedIn();

      expect(result).toBe(true);
    });

    it('should navigate to therapist profile when user is logged in', () => {
      const therapist: Therapist = {id: 1,
      name: 'Therapist 1',
      photoUrl: 'https://example.com/therapist1.jpg',
      position: 'Psychologist',
      location: 'New York',
      rating: 4.5,
      reviews: 7,
      pricePerSection: 50,
      minutesIncluded: 60,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      availableHours: []};
      const navigateSpy = jest.spyOn(router, 'navigate');

      authenticationService.isLoggedIn = true;

      component.selectTherapist(therapist);

      expect(navigateSpy).toHaveBeenCalledWith(['/therapist-profile', therapist.id]);
    });

    it('should log a message when user is not logged in', () => {
      const therapist: Therapist = {id: 1,
        name: 'Therapist 1',
        photoUrl: 'https://example.com/therapist1.jpg',
        position: 'Psychologist',
        location: 'New York',
        rating: 4.5,
        reviews: 7,
        pricePerSection: 50,
        minutesIncluded: 60,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        availableHours: []};
      const consoleLogSpy = jest.spyOn(console, 'log');

      authenticationService.isLoggedIn = false;

      component.selectTherapist(therapist);

      expect(consoleLogSpy).toHaveBeenCalledWith('Please log in to view therapist profile.');
    });
  });
});