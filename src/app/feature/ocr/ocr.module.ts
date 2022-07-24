import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcrComponent } from './ocr.component';
import { RouterModule, Routes } from '@angular/router'
import { CommonComponentModule } from '@app/common-component/common-component.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DirectiveModule } from '@app/directive/directive.module'
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation'
import { HttpClientModule } from '@angular/common/http'


const routes: Routes = [
  {
    path: '',
    component: OcrComponent,
    children: []
  }
]

@NgModule({
  declarations: [
    OcrComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonComponentModule,
    DirectiveModule,
    MdbFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MdbValidationModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class OcrModule { }
