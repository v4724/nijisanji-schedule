import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { WeekComponent } from './week/week.component';
import { MonthComponent } from './month/month.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TimezoneComponent } from './toolbar/timezone/timezone.component';
import { StreamTypeComponent } from './toolbar/stream-type/stream-type.component';
import { StreamGroupComponent } from './toolbar/stream-group/stream-group.component'
import { DateComponent } from './date/date.component';
import { ScheduleCheckedListComponent } from './schedule-checked-list/schedule-checked-list.component';
import { DisplayTextComponent } from './common/display-text/display-text.component';
import { IconDefComponent } from './common/icon-def/icon-def.component';
import { SelectionComponent } from './toolbar/stream-group/selection/selection.component';
import { ButtonComponent } from './toolbar/stream-group/button/button.component';
import { MascotImgComponent } from './common/mascot-img/mascot-img.component';
import { DateWeekComponent } from './date-week/date-week.component'

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    children: [{
      path: '',
      component: WeekComponent
    }, {
      path: 'month',
      component: MonthComponent
    }, {
      path: 'date',
      component: DateComponent
    }, {
      path: 'date-week',
      component: DateWeekComponent
    }]
  }
]

@NgModule({
  declarations: [
    ScheduleComponent,
    WeekComponent,
    MonthComponent,
    ToolbarComponent,
    TimezoneComponent,
    StreamTypeComponent,
    StreamGroupComponent,
    DateComponent,
    ScheduleCheckedListComponent,
    DisplayTextComponent,
    IconDefComponent,
    SelectionComponent,
    ButtonComponent,
    MascotImgComponent,
    DateWeekComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ScheduleModule { }
