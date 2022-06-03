import { InjectionToken, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { VoiceButtonComponent } from '@app/feature/voice-button/voice-button.component'
import { DirectiveModule } from '@app/directive/directive.module';
import { VoiceDetailComponent } from './voice-detail/voice-detail.component';
import { EditVoiceDetailModalComponent } from './edit-voice-detail-modal/edit-voice-detail-modal.component'
import {
  MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
  MatAutocompleteModule,
  MatAutocompleteTrigger
} from '@angular/material/autocomplete'
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation'



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
    MatAutocompleteModule,
    MdbValidationModule,
    ReactiveFormsModule,
    DirectiveModule
  ],
  providers: [
  ]
})
export class VoiceButtonModule { }
