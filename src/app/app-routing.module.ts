import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component'
import { LayoutModule } from './layout/layout.module'
import { WebsiteInfoComponent } from '@app/feature/website-info/website-info.component'

const routes: Routes = [
  {
    path: '',
    component: WebsiteInfoComponent
  },
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'schedule',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./feature/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'schedule',
        loadChildren: () => import('./feature/schedule/schedule.module').then(m => m.ScheduleModule),
      },
      {
        path: 'streamer',
        loadChildren: () => import('./feature/member/member.module').then(m => m.MemberModule),
      },
      {
        path: 'message',
        loadChildren: () => import('./feature/updated-record/updated-record.module').then(m => m.UpdatedRecordModule),
      },
      {
        path: 'voiceButton',
        loadChildren: () => import('./feature/voice-button/voice-button.module').then(m => m.VoiceButtonModule),
      },
      {
        path: 'setting',
        loadChildren: () => import('./feature/setting/setting.module').then(m => m.SettingModule),
      },
      {
        path: 'ocr',
        loadChildren: () => import('./feature/ocr/ocr.module').then(m => m.OcrModule),
      },
    ],
  },
]

@NgModule({
  imports: [
    LayoutModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
