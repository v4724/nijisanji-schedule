import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { timezoneEntries } from '@app/model/enum/Timezone'
import { initVoiceButton, VoiceButtonInfoVo } from '@app/model/vo/VoiceButtonInfoVo'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'

@Component({
  selector: 'app-voice-detail',
  templateUrl: './voice-detail.component.html',
  styleUrls: ['./voice-detail.component.scss']
})
export class VoiceDetailComponent implements OnInit, OnChanges {

  @Input() item: VoiceButtonInfoVo = initVoiceButton()
  @Input() isNew: boolean = true

  timezones = timezoneEntries
  ytIframeSource: SafeUrl | undefined
  constructor(
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  ngOnChanges (changes: SimpleChanges) {
    if (this.isVideoValid) {
      this.changeYtInfo(false)
    }
  }

  get isVideoValid(): boolean {
    return this.item.start >= 1 &&
      this.item.end > this.item.start &&
      !!this.item?.videoId
  }

  get isValid(): boolean {
    return this.isVideoValid &&
      !!this.item?.streamer &&
      !!this.item?.text
  }

  changeYtInfo(autoplay: boolean): void {
    const autoplayParam = autoplay ? 1 : 0

    if (this.isVideoValid) {
      this.ytIframeSource = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.item.videoId}?start=${this.item.start}&end=${this.item.end}&autoplay=${autoplayParam}`)
    } else {
      this.ytIframeSource = ''
    }
  }
}
