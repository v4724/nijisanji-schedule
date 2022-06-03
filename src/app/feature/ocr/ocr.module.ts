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
import { CommonViewModule } from '@app/common-view/common-view.module';
import { AnchorDetailComponent } from './anchor-detail/anchor-detail.component';
import { AnchorPointComponent } from './components/anchor-point/anchor-point.component';
import { StreamAnchorPointComponent } from './components/stream-anchor-point/stream-anchor-point.component'
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse'
import { PointBoundaryComponent } from '@app/feature/ocr/components/point-boundary/point-boundary.component'
import { EditModalComponent } from '@app/feature/ocr/edit-modal/edit-modal.component'
import { CreateModalComponent } from '@app/feature/ocr/create-modal/create-modal.component'


const routes: Routes = [
  {
    path: '',
    component: OcrComponent,
    children: []
  }
]

@NgModule({
  declarations: [
    OcrComponent,
    AnchorDetailComponent,
    AnchorPointComponent,
    StreamAnchorPointComponent,
    PointBoundaryComponent,
    EditModalComponent,
    CreateModalComponent
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
    CommonViewModule,
    MdbCollapseModule,
  ]
})
export class OcrModule { }
