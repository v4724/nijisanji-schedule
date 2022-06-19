import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component'
import { LayoutModule } from './layout/layout.module'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{
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
        loadChildren: () => import('./feature/updated-info/updated-info.module').then(m => m.UpdatedInfoModule),
      },
    ]
  }
]

@NgModule({
  imports: [
    LayoutModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
