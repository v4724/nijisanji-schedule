import { Component, OnInit } from '@angular/core';
import { RainbowLoaderService } from '@app/common-component/rainbow-loader/rainbow-loader.service'

@Component({
  selector: 'app-rainbow-loader',
  templateUrl: './rainbow-loader.component.html',
  styleUrls: ['./rainbow-loader.component.scss']
})
export class RainbowLoaderComponent implements OnInit {

  constructor(public rainbowService: RainbowLoaderService) { }

  ngOnInit(): void {
  }

}
