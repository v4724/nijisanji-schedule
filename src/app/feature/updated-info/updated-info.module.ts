import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { UpdatedInfoComponent } from '@app/feature/updated-info/updated-info.component'
import { CommonComponentModule } from '@app/common-component/common-component.module'

const routes: Routes = [
  {
    path: '',
    component: UpdatedInfoComponent,
  }
]

@NgModule({
  declarations: [
    UpdatedInfoComponent
  ],
  imports: [
    CommonModule,
    CommonComponentModule,
    RouterModule.forChild(routes),
  ]
})
export class UpdatedInfoModule { }
