import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DatePickerComponent } from './date-picker.component';
import { Router } from '@angular/router';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DatePickerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should generate calendar days correctly', () => {
    component.changeMonth(-1);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    currentDate.setMonth(currentMonth - 1);

    const expectedFirstDay = new Date(
      currentDate.getFullYear(),
      currentMonth - 1,
      1
    );
    const expectedLastDay = new Date(
      currentDate.getFullYear(),
      currentMonth,
      0
    );

    const calendarDays = component.calendarDays;

    expect(calendarDays.length).toBeGreaterThan(0);

    const firstWeek = calendarDays[0];
    expect(firstWeek.length).toBe(7);
    expect(firstWeek[0]).toBeNull();
    expect(firstWeek[6]).toBeGreaterThan(0);

    for (let i = 1; i < firstWeek.length - 1; i++) {
      const day = firstWeek[i];
      if (day !== null) {
        expect(day).toBeGreaterThanOrEqual(expectedFirstDay.getDate());
        expect(day).toBeLessThanOrEqual(expectedLastDay.getDate());
      }
    }

    const lastWeek = calendarDays[calendarDays.length - 1];
    expect(lastWeek.length).toBe(7);
    for (let i = 0; i < lastWeek.length; i++) {
      const day = lastWeek[i];
      if (day !== null) {
        expect(day).toBeLessThanOrEqual(expectedLastDay.getDate());
      }
    }
  });

  it('should update the display month correctly', () => {
    const currentDate = new Date();
    const formattedMonth = currentDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
    expect(component.displayMonth).toBe(formattedMonth);
  });

  it('should navigate to the appointment page when a day is selected', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');

    const day = 15;
    component.selectDay(day);
    expect(navigateSpy).toHaveBeenCalledWith(['/appointment', day]);
  });
});
