import { Component, OnInit } from '@angular/core';
import { StreamType, StreamTypeService } from '@app/feature/schedule/toolbar/stream-type/stream-type.service'

@Component({
  selector: 'app-stream-type',
  templateUrl: './stream-type.component.html',
  styleUrls: ['./stream-type.component.scss']
})
export class StreamTypeComponent implements OnInit {

  StreamType = StreamType
  type: StreamType = StreamType.All

  constructor(private streamTypeService: StreamTypeService) { }

  ngOnInit(): void {
    this.streamTypeService.type$.subscribe(type => {
      this.type = type
    })
  }

  changeType(type: StreamType): void {
    this.streamTypeService.type$.next(type)
  }
}
