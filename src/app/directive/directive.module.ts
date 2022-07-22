import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollBorderDirective } from '@app/directive/scroll-border.directive';
import { ThemeDirective } from '@app/directive/theme.directive'



@NgModule({
  declarations: [
    ScrollBorderDirective,
    ThemeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ScrollBorderDirective,
    ThemeDirective
  ]
})
export class DirectiveModule { }
