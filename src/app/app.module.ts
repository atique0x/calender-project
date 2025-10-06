import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AuthService } from './services/auth.service';
import { CalenderService } from './services/calender.service';

import { AppComponent } from './app.component';
import { CalenderComponent } from './calender/calender.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { EventFormComponent } from './calender/event-form/event-form.component';
import { ModalEventComponent } from './shared/modal-event/modal-event.component';

@NgModule({
  declarations: [
    AppComponent,
    CalenderComponent,
    AuthComponent,
    HeaderComponent,
    EventFormComponent,
    ModalEventComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [CalenderService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
