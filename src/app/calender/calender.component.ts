import { Component, OnInit } from '@angular/core';
import { EventInterface } from '../types/event.interface';
import { CalenderService } from '../calender.service';
import { Router } from '@angular/router';
import { MONTHS } from '../data/months.data';
import { WEEKS } from '../data/week.data';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
})
export class CalenderComponent implements OnInit {
  weekdays: string[] = WEEKS;
  months: string[] = MONTHS;

  currentMonth: number = 0;
  currentYear: number = 0;
  firstDay: number = 0;
  lastDate: number = 0;

  events: EventInterface[] = [];

  days: { date: Date; currentMonth: boolean }[] = [];

  constructor(private calenderService: CalenderService) {}

  ngOnInit(): void {
    this.events = this.calenderService.events.map((e) => ({
      ...e,
      start: new Date(e.startDate),
      end: new Date(e.endDate),
    }));

    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.generateCalender();
  }

  generateCalender() {
    this.days = [];

    this.firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    this.lastDate = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();

    const prevMonthLastDate = new Date(
      this.currentYear,
      this.currentMonth,
      0
    ).getDate();

    // Previous month days
    for (let i = this.firstDay - 1; i >= 0; i--) {
      const date = new Date(
        this.currentYear,
        this.currentMonth - 1,
        prevMonthLastDate - i
      );
      this.days.push({ date, currentMonth: false });
    }

    // Current month days
    for (let day = 1; day <= this.lastDate; day++) {
      const date = new Date(this.currentYear, this.currentMonth, day);
      this.days.push({ date, currentMonth: true });
    }

    // Next month days
    let nextDay = 1;
    while (this.days.length < 42) {
      const date = new Date(this.currentYear, this.currentMonth + 1, nextDay++);
      this.days.push({ date, currentMonth: false });
    }
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
    return this.events
      .filter(
        (event) => date >= (event.start as Date) && date <= (event.end as Date)
      )
      .sort(
        (a, b) => (a.start as Date).getTime() - (b.start as Date).getTime()
      );
  }
}
