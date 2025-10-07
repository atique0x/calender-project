import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalenderComponent } from './calender/calender.component';
import { AuthComponent } from './auth/auth.component';
import { EventFormComponent } from './calender/event-form/event-form.component';

const routes: Routes = [
  { path: '', component: CalenderComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'event-form', component: EventFormComponent },
  { path: 'event-form/:id', component: EventFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
