import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { WeekComponent } from './week/week.component';
import { MonthComponent } from './month/month.component'

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    children: [{
      path: 'week',
      component: WeekComponent
    }, {
      path: 'month',
      component: MonthComponent
    }]
  }
]

@NgModule({
  declarations: [
    ScheduleComponent,
    WeekComponent,
    MonthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ScheduleModule { }
