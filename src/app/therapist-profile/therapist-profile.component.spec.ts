import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TherapistProfileComponent } from './therapist-profile.component';
import { TherapistService } from '../services/therapist.service';
import { MockDataService } from '../services/mock-data.service';
import { Therapist } from '../therapist.model';

describe('TherapistProfileComponent', () => {
  let component: TherapistProfileComponent;
  let fixture: ComponentFixture<TherapistProfileComponent>;
  let mockTherapistService: any;
  let mockMockDataService: any;

  beforeEach(async () => {
    const mockTherapist = { id: 1, name: 'John' } as Therapist;
    mockTherapistService = {
      getTherapistById: jest.fn().mockReturnValue(of(mockTherapist)),
    };
    mockMockDataService = {
      getDbData: jest.fn().mockReturnValue(of({ data: 'mockData' })),
    };

    await TestBed.configureTestingModule({
      declarations: [TherapistProfileComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({ get: (param: string) => '1' }) },
        },
        { provide: TherapistService, useValue: mockTherapistService },
        { provide: MockDataService, useValue: mockMockDataService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapistProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve therapist data when initialized', () => {
    expect(mockTherapistService.getTherapistById).toHaveBeenCalledWith('1');
    expect(component.therapists).toEqual([{ id: 1, name: 'John' }]);
  });

  it('should retrieve db data when getDbData is called', () => {
    component.getDbData();
    expect(mockMockDataService.getDbData).toHaveBeenCalled();
    expect(component.dbData).toEqual({ data: 'mockData' });
  });
});
