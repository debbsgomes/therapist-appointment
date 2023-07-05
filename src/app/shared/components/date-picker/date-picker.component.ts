import { Component } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  selected: Date | null = null;
  currentDate: Date = new Date();
  calendarDays: (number | null)[][] = [];
  displayMonth: string = '';

  constructor() {
    this.generateCalendarDays();
    this.updateDisplayMonth();
  }

  changeMonth(direction: number): void {
    const currentMonth = this.currentDate.getMonth();
    const newMonth = currentMonth + direction;
    this.currentDate.setMonth(newMonth);
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
}
