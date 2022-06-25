import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms'
import { FormsModule } from '@angular/forms'
import { VoiceButtonComponent } from '@app/feature/voice-button/voice-button.component'
import { DirectiveModule } from '@app/directive/directive.module'



const routes: Routes = [
  {
    path: '',
    component: VoiceButtonComponent,
    children: []
  }
]


@NgModule({
  declarations: [VoiceButtonComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MdbFormsModule,
    FormsModule,
    DirectiveModule
  ]
})
export class VoiceButtonModule { }
