import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core'
import { initVoiceButton, VoiceButtonInfoVo } from '@app/model/vo/VoiceButtonInfoVo'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import * as lodash from 'lodash'
import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { StreamerInfoService } from '@app/service/streamer-info.service'
import { FormControl } from '@angular/forms'
import { MatAutocomplete } from '@angular/material/autocomplete'

@Component({
  selector: 'app-voice-detail',
  templateUrl: './voice-detail.component.html',
  styleUrls: ['./voice-detail.component.scss']
})
export class VoiceDetailComponent implements OnInit, OnChanges {

  @Input() item: VoiceButtonInfoVo = initVoiceButton()
  @Input() isNew: boolean = true

  editItem: VoiceButtonInfoVo = initVoiceButton()
  ytIframeSource: SafeUrl | undefined

  streamerKeyword = ''
  streamers: Array<StreamerInfoVo> = []
  filterStreamers: Array<StreamerInfoVo> = []

  myControl = new FormControl('');

  start: string = '00:00:00'
  end: string = '00:00:00'
  constructor(private streamerService: StreamerInfoService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.streamerService.streamerInfos$.subscribe((result) => {
      this.streamers = result
      this.streamerKeywordChanged()
    })
  }

  ngOnChanges (changes: SimpleChanges) {
    if (changes.item.firstChange && !changes.isNew.currentValue) {
      this.editItem = lodash.cloneDeep(changes.item.currentValue)
      if (this.isVideoValid) {
        this.changeYtInfo(false)
      }
      this.start = this.toYTTime(this.editItem.start)
      this.end = this.toYTTime(this.editItem.end)
    } else if (changes.isNew.currentValue) {
      this.startChanged()
      this.endChanged()
    }
  }

  get editedItem(): VoiceButtonInfoVo {
    return this.editItem
  }

  get isVideoValid(): boolean {
    return this.editItem.start >= 1 &&
      this.editItem.end > this.editItem.start &&
      !!this.editItem?.videoId
  }

  get isValidStreamer(): boolean {
    const find = this.streamers.find((info) => info.name === this.editItem.streamer)
    return !!find
  }

  get isValid(): boolean {
    return this.isVideoValid &&
      this.isValidStreamer &&
      !!this.editItem?.text
  }

  changeYtInfo(autoplay: boolean): void {
    const autoplayParam = autoplay ? 1 : 0

    if (this.isVideoValid) {
      this.ytIframeSource = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.editItem.videoId}?start=${this.editItem.start}&end=${this.editItem.end}&autoplay=${autoplayParam}&rel=0`)
    } else {
      this.ytIframeSource = ''
    }
  }

  minusStart(): void {
    this.editItem.start -= 1
    this.start = this.toYTTime(this.editItem.start)
  }
  plusStart(): void {
    this.editItem.start += 1
    this.start = this.toYTTime(this.editItem.start)
  }
  startChanged(): void {
    this.editItem.start = this.fromYTTime(this.start)
  }
  minusEnd(): void {
    this.editItem.end -= 1
    this.end = this.toYTTime(this.editItem.end)
  }
  plusEnd(): void {
    this.editItem.end += 1
    this.end = this.toYTTime(this.editItem.end)
  }
  endChanged(): void {
    this.editItem.end = this.fromYTTime(this.end)
  }

  toYTTime(second: number): string {
    const hour = Math.floor(second / 3600)
    const min = Math.floor(second % 3600 / 60)
    const sec = second % 3600 % 60
    return`${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  fromYTTime(time: string): number {
    const split = time.split(":")
    let sec = Number.parseInt(split[0]) * 3600 + Number.parseInt(split[1]) * 60 + Number.parseInt(split[2])
    return sec
  }

  streamerKeywordChanged(auto?: MatAutocomplete): void {
    const upperKeyword = this.editItem.streamer.toUpperCase()
    this.filterStreamers = this.streamers.filter((info)=> {
      return upperKeyword.length ? info.name.toUpperCase().includes(upperKeyword) : true
    })
  }

}
