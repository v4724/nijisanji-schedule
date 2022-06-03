import { Component, Input, OnInit } from '@angular/core'
import { StreamerInfoService } from '@app/service/streamer-info.service'

@Component({
  selector: 'app-tbd-tag',
  templateUrl: './tbd-tag.component.html',
  styleUrls: ['./tbd-tag.component.scss']
})
export class TBDTagComponent implements OnInit {

  @Input() item!: any;
  @Input() key: string = '';

  constructor(
    private streamerInfoService: StreamerInfoService) { }

  ngOnInit(): void {
  }

  get colorClass(): string {
    if (this.item.streamer) {
      const info = this.streamerInfoService.findStreamerInfo(this.item.streamer)
      return info?.color ?? '';
    }
    return ''
  }
}
