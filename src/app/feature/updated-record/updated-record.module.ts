import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { UpdatedRecordComponent } from '@app/feature/updated-record/updated-record.component'
import { CommonComponentModule } from '@app/common-component/common-component.module'

const routes: Routes = [
  {
    path: '',
    component: UpdatedRecordComponent,
  }
]

@NgModule({
  declarations: [
    UpdatedRecordComponent
  ],
  imports: [
    CommonModule,
    CommonComponentModule,
    RouterModule.forChild(routes),
  ]
})
export class UpdatedRecordModule { }
