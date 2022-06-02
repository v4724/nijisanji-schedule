import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RainbowLoaderComponent } from '@app/common-component/rainbow-loader/rainbow-loader.component'

@NgModule({
  declarations: [
    RainbowLoaderComponent
  ],
  imports: [
    CommonModule

  ],
  exports: [
    RainbowLoaderComponent
  ]
})
export class CommonComponentModule { }
