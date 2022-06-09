import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router'
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse'
import { LoginComponent } from '@app/layout/login/login.component'

@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent
  ],
	imports: [
		CommonModule,
		RouterModule,
		MdbCollapseModule
	]
})
export class LayoutModule { }
