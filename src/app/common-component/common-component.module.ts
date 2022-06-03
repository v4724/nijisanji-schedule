import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RainbowLoaderComponent } from '@app/common-component/rainbow-loader/rainbow-loader.component';
import { ToastComponent } from './toast/toast.component'
import { PopoverComponent } from '@app/common-component/popover/popover.component'

@NgModule({
  declarations: [
    RainbowLoaderComponent,
    ToastComponent,
    PopoverComponent
  ],
  imports: [
    CommonModule

  ],
  exports: [
    RainbowLoaderComponent,
    ToastComponent,
    PopoverComponent
  ]
})
export class CommonComponentModule { }
