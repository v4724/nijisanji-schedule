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
import { CommonViewModule } from '@app/common-view/common-view.module';
import { StreamAnchorPointComponent } from './template-form-editor/components/stream-anchor-point/stream-anchor-point.component'
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse'
import { CreateModalComponent } from '@app/feature/ocr/create-modal/create-modal.component';
import { TemplateFormEditorComponent } from './template-form-editor/template-form-editor.component';
import { PolygonButtonComponent } from './template-form-editor/components/polygon-button/polygon-button.component';
import { TemplateFormResultComponent } from './template-form-result/template-form-result.component';
import { TemplateEditingCanvasComponent } from './template-form-editor/components/template-editing-canvas/template-editing-canvas.component';
import { MyCanvasComponent } from './components/canvas/my-canvas/my-canvas.component';
import { RectCanvasComponent } from './components/canvas/rect-canvas/rect-canvas.component';
import { RectListCanvasComponent } from './components/canvas/rect-list-canvas/rect-list-canvas.component'
import { DragDropModule } from '@angular/cdk/drag-drop'


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
    StreamAnchorPointComponent,
    CreateModalComponent,
    TemplateFormEditorComponent,
    PolygonButtonComponent,
    TemplateFormResultComponent,
    TemplateEditingCanvasComponent,
    MyCanvasComponent,
    RectCanvasComponent,
    RectListCanvasComponent
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
    CommonViewModule,
    MdbCollapseModule,
    DragDropModule,
  ]
})
export class OcrModule { }
