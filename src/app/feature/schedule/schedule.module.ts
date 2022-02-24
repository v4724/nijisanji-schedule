import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
  }
]

@NgModule({
  declarations: [
    ScheduleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ScheduleModule { }
