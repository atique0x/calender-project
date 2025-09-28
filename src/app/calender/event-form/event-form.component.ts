import { Component, OnInit } from '@angular/core';

import { StatusEnum } from '../../types/status.enum';

import { EventInterface } from 'src/app/types/event.interface';
import { CalenderService } from 'src/app/calender.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';
  statusOptions = Object.values(StatusEnum);

  constructor(private calenderService: CalenderService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const { title, description, status, startDate, endDate } = form.value;
    const newEvent: EventInterface = {
      id: crypto.randomUUID(),
      title,
      description,
      status,
      startDate,
      endDate,
    };
    this.calenderService.addNewEvents(newEvent);
    form.reset();
  }
}
