import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FeatStreamerComponent } from './feat-streamer/feat-streamer.component'
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation'

@NgModule({
  declarations: [
    FeatStreamerComponent
  ],
  imports: [
    CommonModule,
    MdbFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MdbValidationModule,
    ReactiveFormsModule,
  ],
  exports: [
    FeatStreamerComponent
  ]
})
export class CommonViewModule { }
