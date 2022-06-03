import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { RouterModule, Routes } from '@angular/router'
import { CommonComponentModule } from '@app/common-component/common-component.module'
import { DirectiveModule } from '@app/directive/directive.module'

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
  }
]


@NgModule({
  declarations: [
    SettingComponent
  ],
  imports: [
    CommonModule,
    CommonComponentModule,
    DirectiveModule,
    RouterModule.forChild(routes),
  ]
})
export class SettingModule { }
