import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router'
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse'
import { LoginComponent } from '@app/layout/login/login.component'
import { CommonComponentModule } from '@app/common-component/common-component.module';
import { UpdatedBellComponent } from './updated-bell/updated-bell.component'
import { TimezoneComponent } from '@app/layout/timezone/timezone.component'
import { FormsModule } from '@angular/forms';
import { ThemeColorComponent } from './theme-color/theme-color.component'

@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    UpdatedBellComponent,
    TimezoneComponent,
    ThemeColorComponent,
  ],
	imports: [
		CommonModule,
		RouterModule,
    FormsModule,
		MdbCollapseModule,
		CommonComponentModule
	]
})
export class LayoutModule { }
