import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { StatusEnum } from '../../types/status.enum';

import { CalenderService } from 'src/app/services/calender.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';
  title: string = '';
  description: string = '';
  status: StatusEnum = StatusEnum.Pending;

  statusOptions = Object.values(StatusEnum);
  isUpdate = false;

  constructor(
    private calenderService: CalenderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isUpdate = true;
      const event = this.calenderService.getEventById(id);
      if (event) {
        this.title = event.title;
        this.description = event.description;
        this.status = event.status;
        this.startDate = event.startDate;
        this.endDate = event.endDate;
      }
    }

    this.route.queryParams.subscribe((params) => {
      if (params['date']) {
        this.startDate = params['date'];
        this.endDate = params['date'];
      }
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const { title, description, status, startDate, endDate } = form.value;

    if (this.isUpdate) {
      this.calenderService.updateEvent(
        this.route.snapshot.paramMap.get('id')!,
        {
          title,
          description,
          status,
          startDate,
          endDate,
        }
      );
    } else {
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
}
