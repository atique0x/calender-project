import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { MONTHS } from '../data/months.data';

import { EventInterface } from '../types/event.interface';
import { CalenderService } from '../services/calender.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
})
export class CalenderComponent implements OnInit, OnDestroy {
  months: string[] = MONTHS;

  currentMonth: number = 0;
  currentYear: number = 0;
  today: Date = new Date();

  events: EventInterface[] = [];
  days: { date: Date; currentMonth: boolean }[] = [];

  eventSlots: { [key: string]: (EventInterface | null)[] } = {};

  visibleRows: number = 3;
  modalDate: Date | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private calenderService: CalenderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initQueryParams();
    this.generateCalender();
  }

  onPrevious() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.setQueryParams();
    this.generateCalender();
  }

  onNext() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.setQueryParams();
    this.generateCalender();
  }

  onToday() {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.setQueryParams();
    this.generateCalender();
  }

  setQueryParams() {
    this.router.navigate([''], {
      queryParams: {
        date: `${this.currentYear}-${String(this.currentMonth + 1).padStart(
          2,
          '0'
        )}-01`,
      },
    });
  }

  getSlotsForDate(date: Date): (EventInterface | null)[] {
    return this.eventSlots[date.toDateString()] || [];
  }

  isStart(date: Date, slotIndex: number): boolean {
    const event = this.getSlotsForDate(date)[slotIndex];
    if (!event) return false;
    return (
      event.start!.toDateString() === date.toDateString() || date.getDay() === 0
    );
  }

  isEnd(date: Date, slotIndex: number): boolean {
    const event = this.getSlotsForDate(date)[slotIndex];
    if (!event) return false;
    return event.end!.toDateString() === date.toDateString();
  }

  isToday(date: Date): boolean {
    return (
      date.getDate() === this.today.getDate() &&
      date.getMonth() === this.today.getMonth() &&
      date.getFullYear() === this.today.getFullYear()
    );
  }

  getEventCount(date: Date): number {
    return this.getSlotsForDate(date).filter(Boolean).length;
  }

  openDayModal(date: Date) {
    this.modalDate = date;
  }

  closeModal() {
    this.modalDate = null;
  }

  getEventsForModal(date: Date): EventInterface[] {
    return this.getSlotsForDate(date).filter((e) => e) as EventInterface[];
  }

  private initQueryParams() {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        if (params['date']) {
          const [year, month] = params['date'].split('-');
          this.currentYear = parseInt(year);
          this.currentMonth = parseInt(month) - 1;
        } else {
          const today = new Date();
          this.currentMonth = today.getMonth();
          this.currentYear = today.getFullYear();
        }
      });
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

    this.loadEvents();
  }

  private loadEvents() {
    this.events = this.calenderService
      .getEvents(this.days[0].date, this.days[this.days.length - 1].date)
      .sort(
        (a, b) =>
          a.start!.getTime() - b.start!.getTime() ||
          b.end!.getTime() - a.end!.getTime()
      );
    this.mapEventsToSlots();
  }

  private mapEventsToSlots() {
    this.eventSlots = {};
    const slots: { slot: number; end: Date }[] = [];

    for (const event of this.events) {
      let assignedSlot = -1;

      for (let slot of slots) {
        if (event.start! > slot.end) {
          assignedSlot = slot.slot;
          slot.end = event.end!;
          break;
        }
      }

      if (assignedSlot === -1) {
        assignedSlot = slots.length;
        slots.push({
          slot: assignedSlot,
          end: event.end!,
        });
      }

      for (
        let date = new Date(event.start!);
        date <= event.end!;
        date.setDate(date.getDate() + 1)
      ) {
        const key = date.toDateString();
        if (!this.eventSlots[key]) this.eventSlots[key] = [];
        this.eventSlots[key][assignedSlot] = event;
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
