import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { WeekComponent } from './week/week.component';
import { MonthComponent as MonthComponent2 } from './month-2/month.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { StreamTypeComponent } from './toolbar/stream-type/stream-type.component';
import { StreamGroupComponent } from './toolbar/stream-group/stream-group.component'
import { DateComponent } from './date/date.component';
import { ScheduleCheckedListComponent } from './schedule-checked-list/schedule-checked-list.component';
import { DisplayTextComponent } from './common/display-text/display-text.component';
import { IconDefComponent } from './common/icon-def/icon-def.component';
import { SelectionComponent } from './toolbar/stream-group/selection/selection.component';
import { ButtonComponent } from './toolbar/stream-group/button/button.component';
import { MascotImgComponent } from './common/mascot-img/mascot-img.component';
import { TBDTagComponent } from './common/tbd-tag/tbd-tag.component';
import { NewStreamComponent } from './new-stream/new-stream.component'
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms'
import { CommonComponentModule } from '@app/common-component/common-component.module'
import { StreamDetailComponent } from './common/stream-detail/stream-detail.component';
import { EditModalComponent } from './common/edit-modal/edit-modal.component'
import { DirectiveModule } from '@app/directive/directive.module'
import { CommonViewModule } from '@app/common-view/common-view.module'

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    children: [{
      path:'',
      redirectTo: 'week',
      pathMatch: 'full',
    },{
      path: 'week',
      component: WeekComponent
    }, {
      path: 'month',
      component: MonthComponent2
    }, {
      path: 'date',
      component: DateComponent
    }, {
      path: 'new',
      component: NewStreamComponent
    }]
  }
]

@NgModule({
  declarations: [
    ScheduleComponent,
    WeekComponent,
    MonthComponent2,
    ToolbarComponent,
    StreamTypeComponent,
    StreamGroupComponent,
    DateComponent,
    ScheduleCheckedListComponent,
    DisplayTextComponent,
    IconDefComponent,
    SelectionComponent,
    ButtonComponent,
    MascotImgComponent,
    TBDTagComponent,
    NewStreamComponent,
    StreamDetailComponent,
    EditModalComponent
  ],
  imports: [
    CommonComponentModule,
    RouterModule.forChild(routes),
    MdbFormsModule,
    FormsModule,
    CommonModule,
    CommonViewModule,
    DirectiveModule
  ]
})
export class ScheduleModule { }
