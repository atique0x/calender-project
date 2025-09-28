import { Injectable } from '@angular/core';
import { EventInterface } from './types/event.interface';
import { EVENTS } from './data/event.data';

@Injectable()
export class CalenderService {
  private STORAGE_KEY = 'events';
  events: EventInterface[] = [];

  constructor() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    this.events = stored ? JSON.parse(stored) : EVENTS;
    this.saveEvents();
  }

  addNewEvents(eventsData: EventInterface) {
    this.events.push(eventsData);
    this.saveEvents();
  }

  private saveEvents() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.events));
  }
}
