import { Injectable } from '@angular/core';
import { EventInterface } from '../types/event.interface';
import { EVENTS } from '../data/event.data';

@Injectable()
export class CalenderService {
  private readonly STORAGE_KEY = 'events';
  events: EventInterface[] = [];

  constructor() {
    this.loadEvents();
  }

  getEvents(firstDate: Date, lastDate: Date): EventInterface[] {
    return this.events.filter(
      (event) =>
        event.start &&
        event.end &&
        event.start <= lastDate &&
        event.end >= firstDate
    );
  }

  addNewEvent(event: EventInterface) {
    const newEvent: EventInterface = {
      ...event,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
    };
    this.events = [...this.events, newEvent];
    this.saveEvents();
  }

  getEventById(id: string): EventInterface | undefined {
    return this.events.find((event) => event.id === id);
  }

  updateEvent(id: string, event: Partial<EventInterface>) {
    const index: number = this.events.findIndex((event) => event.id === id);
    if (index !== -1) {
      this.events[index] = { ...this.events[index], ...event };
    }
    this.saveEvents();
  }

  private loadEvents() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    const rawEvents: EventInterface[] = stored ? JSON.parse(stored) : EVENTS;
    this.events = this.initializeEvents(rawEvents);
  }

  private initializeEvents(rawEvents: EventInterface[]) {
    return rawEvents.map((e) => ({
      ...e,
      start: new Date(e.startDate),
      end: new Date(e.endDate),
    }));
  }

  private saveEvents() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.events));
  }
}
