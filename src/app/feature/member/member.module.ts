import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { ScheduleComponent } from '@app/feature/schedule/schedule.component'
import { WeekComponent } from '@app/feature/schedule/week/week.component'
import { MonthComponent as MonthComponent2 } from '@app/feature/schedule/month-2/month.component'
import { DateComponent } from '@app/feature/schedule/date/date.component'
import { NewStreamComponent } from '@app/feature/schedule/new-stream/new-stream.component'
import { MemberComponent } from '@app/feature/member/member.component'


const routes: Routes = [
  {
    path: '',
    component: MemberComponent,
    children: []
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MemberModule { }
