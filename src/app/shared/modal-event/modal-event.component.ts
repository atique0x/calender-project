import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EventInterface } from 'src/app/types/event.interface';

@Component({
  selector: 'app-modal-event',
  templateUrl: './modal-event.component.html',
  styleUrls: ['./modal-event.component.css'],
})
export class ModalEventComponent implements OnInit {
  @Input() date: Date | null = null;
  @Input() events: EventInterface[] = [];
  @Output() close = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.close.emit();
  }
}
