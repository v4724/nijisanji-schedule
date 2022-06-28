import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms'
import { FormsModule } from '@angular/forms'
import { VoiceButtonComponent } from '@app/feature/voice-button/voice-button.component'
import { DirectiveModule } from '@app/directive/directive.module';
import { VoiceDetailComponent } from './voice-detail/voice-detail.component';
import { EditVoiceDetailModalComponent } from './edit-voice-detail-modal/edit-voice-detail-modal.component'



const routes: Routes = [
  {
    path: '',
    component: VoiceButtonComponent,
    children: []
  }
]


@NgModule({
  declarations: [VoiceButtonComponent, VoiceDetailComponent, EditVoiceDetailModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MdbFormsModule,
    FormsModule,
    DirectiveModule
  ]
})
export class VoiceButtonModule { }
