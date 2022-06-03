import { Component, Input, OnInit } from '@angular/core'
import { timezoneEntries } from '@app/model/enum/Timezone'
import { initStreamerInfoVo, StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { TimezoneService } from '@app/layout/timezone/timezone.service'

@Component({
  selector: 'app-streamer-info',
  templateUrl: './streamer-info.component.html',
  styleUrls: ['./streamer-info.component.scss']
})
export class StreamerInfoComponent implements OnInit {

  @Input() item: StreamerInfoVo = initStreamerInfoVo()
  @Input() isNew: boolean = true

  constructor(public tzService: TimezoneService) { }

  ngOnInit(): void {
  }

  get isValid(): boolean {
    return !!this.item?.img &&
      !!this.item?.timezone &&
      !!this.item?.group &&
      !!this.item?.name &&
      !!this.item?.channelId
  }
}
