import { Component, OnInit } from '@angular/core';
import { StreamService } from '@app/service/stream.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private streamService: StreamService) { }

  ngOnInit(): void {
    // this.streamService.where(1656086400000, 1656172799195).subscribe((result) => {
    //   console.log('result', result)
    // })
  }

}
