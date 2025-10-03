import { Component, OnInit } from '@angular/core';

import { MONTHS } from '../data/months.data';
import { EventInterface } from '../types/event.interface';
import { CalenderService } from '../calender.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
})
export class CalenderComponent implements OnInit {
  months: string[] = MONTHS;

  currentMonth: number = 0;
  currentYear: number = 0;

  events: EventInterface[] = [];
  days: { date: Date; currentMonth: boolean }[] = [];

  constructor(private calenderService: CalenderService) {}

  ngOnInit(): void {
    this.getEvents();

    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.generateCalender();
  }

  onPrevious() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalender();
  }

  onNext() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalender();
  }

  getEventsForDay(date: Date): EventInterface[] {
    return this.events.filter(
      (event) => date >= (event.start as Date) && date <= (event.end as Date)
    );
  }

  private getEvents() {
    this.events = this.calenderService.events
      .map((e) => ({
        ...e,
        start: new Date(e.startDate),
        end: new Date(e.endDate),
      }))
      .sort(
        (a, b) => (a.start as Date).getTime() - (b.start as Date).getTime()
      );
  }

  private generateCalender() {
    this.days = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const lastDate = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();

    const prevMonthLastDate = new Date(
      this.currentYear,
      this.currentMonth,
      0
    ).getDate();

    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(
        this.currentYear,
        this.currentMonth - 1,
        prevMonthLastDate - i
      );
      this.days.push({ date, currentMonth: false });
    }

    for (let day = 1; day <= lastDate; day++) {
      const date = new Date(this.currentYear, this.currentMonth, day);
      this.days.push({ date, currentMonth: true });
    }

    for (let nextDay = 1; this.days.length < 42; nextDay++) {
      const date = new Date(this.currentYear, this.currentMonth + 1, nextDay);
      this.days.push({ date, currentMonth: false });
    }
  }
}
