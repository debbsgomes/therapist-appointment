import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  currentDate: Date = new Date();
  calendarDays: (number | null)[][] = [];
  displayMonth: string = '';
  selectedDay: number | null = null;

  constructor(private router: Router) {
    this.generateCalendarDays();
    this.updateDisplayMonth();
    this.setDisplayMonth();
    }

  changeMonth(direction: number): void {
    // Update the month based on the direction
    const currentMonth = this.currentDate.getMonth();
    const newMonth = currentMonth + direction;
    this.currentDate.setMonth(newMonth);

    // Regenerate the calendar days and update the display month
    this.generateCalendarDays();
    this.updateDisplayMonth();
  }

  private generateCalendarDays(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    this.calendarDays = [];
    let week: (number | null)[] = Array(7).fill(null);
    let dayCount = 1;

    // Fill in empty cells for the first week
    for (let i = 0; i < firstDay.getDay(); i++) {
      week[i] = null;
    }

    // Populate calendar days
    for (let i = firstDay.getDay(); i < 7; i++) {
      week[i] = dayCount;
      dayCount++;
    }
    this.calendarDays.push(week);

    // Populate the rest of the calendar days
    while (dayCount <= lastDay.getDate()) {
      week = Array(7).fill(null);
      for (let i = 0; i < 7 && dayCount <= lastDay.getDate(); i++) {
        week[i] = dayCount;
        dayCount++;
      }
      this.calendarDays.push(week);
    }
  }

  private updateDisplayMonth(): void {
    this.displayMonth = formatDate(this.currentDate, 'MMMM yyyy', 'en-US');
  }

  isClickable(day: number | null): boolean {
    return day !== null && day !== 0 && day !== 7; // Exclude Sundays (day 0) from being clickable
  }

  isSelected(day: number | null): boolean {
    return day === this.selectedDay;
  }

  selectDay(day: number | null): void {
    if (this.isClickable(day)) {
      this.selectedDay = day;
      this.highlightSelectedDay();
      this.router.navigate(['/appointment', day]);
    }
  }

  private highlightSelectedDay(): void {
    const selectedCell = document.querySelector(`.mat-calendar-body-cell[data-day="${this.selectedDay}"]`);
    if (selectedCell) {
      selectedCell.classList.add('selected-cell');
    }
  }

  private setDisplayMonth(): void {
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    this.displayMonth = this.currentDate.toLocaleDateString('en-US', options);
  }
}