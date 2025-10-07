import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { StatusEnum } from '../../types/status.enum';

import { CalenderService } from 'src/app/services/calender.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent implements OnInit {
  title: string = '';
  description: string = '';
  status: StatusEnum = StatusEnum.Pending;
  startDate: string = '';
  endDate: string = '';

  statusOptions = Object.values(StatusEnum);

  constructor(private calenderService: CalenderService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const { title, description, status, startDate, endDate } = form.value;
    this.calenderService.addNewEvent({
      id: crypto.randomUUID(),
      title,
      description,
      status,
      startDate,
      endDate,
    });
    form.resetForm({ status: StatusEnum.Pending });
  }
}
