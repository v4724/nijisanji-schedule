import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RainbowLoaderComponent } from '@app/common-component/rainbow-loader/rainbow-loader.component';
import { ToastComponent } from './toast/toast.component'

@NgModule({
  declarations: [
    RainbowLoaderComponent,
    ToastComponent
  ],
  imports: [
    CommonModule

  ],
  exports: [
    RainbowLoaderComponent,
    ToastComponent
  ]
})
export class CommonComponentModule { }
