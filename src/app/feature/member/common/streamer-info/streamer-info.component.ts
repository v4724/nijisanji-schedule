import { Component, Input, OnInit } from '@angular/core'
import { timezoneEntries } from '@app/model/enum/Timezone'
import { initStreamerInfoVo, StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'

@Component({
  selector: 'app-streamer-info',
  templateUrl: './streamer-info.component.html',
  styleUrls: ['./streamer-info.component.scss']
})
export class StreamerInfoComponent implements OnInit {

  @Input() item: StreamerInfoVo = initStreamerInfoVo()
  @Input() isNew: boolean = true

  timezones = timezoneEntries

  constructor() { }

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
