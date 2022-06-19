import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { MemberComponent } from '@app/feature/member/member.component';
import { EditStreamerInfoModalComponent } from './edit-streamer-info-modal/edit-streamer-info-modal.component';
import { StreamerInfoComponent } from './common/streamer-info/streamer-info.component'
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms'
import { FormsModule } from '@angular/forms'


const routes: Routes = [
  {
    path: '',
    component: MemberComponent,
    children: []
  }
]

@NgModule({
  declarations: [
    EditStreamerInfoModalComponent,
    StreamerInfoComponent,
    MemberComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MdbFormsModule,
    FormsModule
  ]
})
export class MemberModule { }
