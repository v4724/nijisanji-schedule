import { Component, Input, OnInit } from '@angular/core'
import { findStreamerInfo, StreamerInfo } from '@app/feature/schedule/data/StreamerInfo'

@Component({
  selector: 'app-tbd-tag',
  templateUrl: './tbd-tag.component.html',
  styleUrls: ['./tbd-tag.component.scss']
})
export class TBDTagComponent implements OnInit {

  @Input() item!: any;
  @Input() key: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  get colorClass(): string {
    if (this.item.streamer) {
      const info = findStreamerInfo(this.item.streamer)
      return info?.color ?? '';
    }
    return ''
  }
}
