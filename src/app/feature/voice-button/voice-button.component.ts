import { Component, OnInit } from '@angular/core';
import { StreamerInfoService } from '@app/service/streamer-info.service'
import { StreamGroupService } from '@app/service/stream-group.service'
import { combineLatest } from 'rxjs'
import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'

export interface VoiceButtonVo {
  start: number,
  end: number,
  videoId: string,
  streamer: string,
  text: string
}

@Component({
  selector: 'app-voice-button',
  templateUrl: './voice-button.component.html',
  styleUrls: ['./voice-button.component.scss']
})
export class VoiceButtonComponent implements OnInit {

  currentStreamerInfo: StreamerInfoVo | undefined;
  streamers: Array<StreamerInfoVo> = []

  currentVoiceButton: VoiceButtonVo | undefined;
  voiceButtons: Array<VoiceButtonVo> = [{
    start: 3301,
    end: 3304,
    videoId: 'TnUH-uVkcwM',
    streamer: 'Ike',
    text: 'HUG'
  }]
  ytIframeSource: SafeUrl | undefined

  constructor(private streamerService: StreamerInfoService,
              private streamGroupService: StreamGroupService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {

    combineLatest([
      this.streamerService.streamerInfos$,
      this.streamGroupService.selectedGroup$
    ])
    .subscribe((results) => {
      const groups = results[1]
      this.streamers = results[0].filter((info) => {
        const find = groups.find((group) => group === info.group)
        return !!find
      })

      if (!this.currentStreamerInfo && this.streamers.length) {
        this.changeCurrStreamer(this.streamers[0])
      }
    })
  }
  playAgain(): void {
    if (!this.currentVoiceButton) {
      return
    }
    this.changeVoiceButton(this.currentVoiceButton)
  }
  stopPlay(): void {

  }
  changeVoiceButton(button: VoiceButtonVo): void {
    this.currentVoiceButton = button
    this.ytIframeSource = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${button.videoId}?start=${button.start}&end=${button.end}&autoplay=1`)
  }

  changeCurrStreamer(info: StreamerInfoVo): void {
    this.currentStreamerInfo = info

  }
}
