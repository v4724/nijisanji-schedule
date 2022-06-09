import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component'
import { LayoutModule } from './layout/layout.module'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'schedule',
        loadChildren: () => import('./feature/schedule/schedule.module').then(m => m.ScheduleModule),
      },
      {
        path: 'member',
        loadChildren: () => import('./feature/member/member.module').then(m => m.MemberModule),
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
