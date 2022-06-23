import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollBorderDirective } from '@app/directive/scroll-border.directive'



@NgModule({
  declarations: [
    ScrollBorderDirective],
  imports: [
    CommonModule
  ],
  exports: [
    ScrollBorderDirective
  ]
})
export class DirectiveModule { }
