import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { StreamerInfoService } from '@app/service/streamer-info.service'

@Component({
  selector: 'app-feat-streamer',
  templateUrl: './feat-streamer.component.html',
  styleUrls: ['./feat-streamer.component.scss']
})
export class FeatStreamerComponent implements OnInit, OnDestroy {

  @Input() smallStyle:boolean = false
  @Input() featStreamers: string[] = []

  searchFeatStreamer: string = ''
  findFeatStreamerInfo: StreamerInfoVo | undefined

  constructor(private streamerInfoService: StreamerInfoService) { }

  ngOnInit(): void {
  }

  ngOnDestroy () {

  }

  findFeatStreamerInfoChanged(value: string): void {
    this.findFeatStreamerInfo = this.streamerInfoService.findStreamerInfo(value)
  }

  addFeatStreamer(): void {
    const name = this.findFeatStreamerInfo?.name

    if (name) {
      if (this.featStreamers.includes(name)) {
        return
      }
      this.featStreamers.push(name)
    }
  }

  enterToAddFeatStreamer(): void {
    this.addFeatStreamer()
    this.searchFeatStreamer = ''
    this.findFeatStreamerInfo = undefined
  }

  removeFeatStreamer(streamer: string): void {
    const index = this.featStreamers.indexOf(streamer)
    if (index > -1) {
      this.featStreamers.splice(index, 1)
    }
  }
}
