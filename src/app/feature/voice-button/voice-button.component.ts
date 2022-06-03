import { Component, OnDestroy, OnInit } from '@angular/core'
import { StreamerInfoService } from '@app/service/streamer-info.service'
import { StreamGroupService } from '@app/service/stream-group.service'
import { combineLatest, Subject, Subscription } from 'rxjs'
import { initStreamerInfoVo, StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { initVoiceButton, VoiceButtonInfoVo } from '@app/model/vo/VoiceButtonInfoVo'
import { VoiceButtonInfoService } from '@app/service/voice-button-info.service'
import * as lodash from 'lodash'
import { AdminService } from '@app/service/admin.service'
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-voice-button',
  templateUrl: './voice-button.component.html',
  styleUrls: ['./voice-button.component.scss']
})
export class VoiceButtonComponent implements OnInit, OnDestroy {

  currentStreamerInfo: StreamerInfoVo | undefined;
  streamers: Array<StreamerInfoVo> = []

  currentVoiceButton: VoiceButtonInfoVo | undefined;
  voiceButtons: Array<VoiceButtonInfoVo> = []
  filterVoiceButtons: Array<VoiceButtonInfoVo> = []
  voiceButtonInfoVo = initVoiceButton()

  keyword: string = ''
  ytIframeSource: SafeUrl | undefined

  private modelChanged: Subject<string> = new Subject<string>();
  private subscription: Subscription | undefined;

  constructor(private streamerService: StreamerInfoService,
              private streamGroupService: StreamGroupService,
              private voiceButtonInfoService: VoiceButtonInfoService,
              public adminService: AdminService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {

    combineLatest([
      this.streamerService.streamerInfos$,
      this.streamGroupService.selectedGroup$
    ])
    .subscribe((results) => {
      // const groups = results[1]
      // this.streamers = results[0].filter((info) => {
      //   const find = groups.find((group) => group === info.group)
      //   return !!find
      // })
      this.streamers = results[0]

      if (!this.currentStreamerInfo && this.streamers.length) {
        this.changeCurrStreamer(this.streamers[0])
      }
    })

    this.subscription = this.modelChanged
                            .pipe(
                              debounceTime(200),
                            )
                            .subscribe(() => {
                              this.updateFilterVoiceButton();
                            });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  playAgain(): void {
    if (!this.currentVoiceButton) {
      return
    }
    this.changeVoiceButton(this.currentVoiceButton)
  }
  stopPlay(): void {

  }

  changeVoiceButton(button: VoiceButtonInfoVo): void {
    this.currentVoiceButton = button
    this.ytIframeSource = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${button.videoId}?start=${button.start}&end=${button.end}&autoplay=1&rel=0`)
  }

  changeCurrStreamer(info: StreamerInfoVo): void {
    this.currentStreamerInfo = info

    this.voiceButtonInfoService
        .getByStreamer(info.name, false)
        .subscribe((result) => {
          this.voiceButtons = lodash.cloneDeep(result)
          this.updateFilterVoiceButton()
        })
  }

  forceReloadVoiceButton(): void {
    if (!this.currentStreamerInfo) {
      return
    }

    this.voiceButtonInfoService
        .getByStreamer(this.currentStreamerInfo.name, true)
        .subscribe((result) => {
          this.voiceButtons = lodash.cloneDeep(result)
          this.updateFilterVoiceButton()
        })
  }

  keywordChanged() {
    this.modelChanged.next();
  }

  updateFilterVoiceButton(): void {
    this.filterVoiceButtons = this.voiceButtons.filter((info) => {
      return this.keyword.length ? info.text.toLowerCase().includes(this.keyword.toLowerCase()) : true
    })
  }

  editVoiceButtonInfo($event: Event, info?: VoiceButtonInfoVo): void {
    $event.stopPropagation()
    this.adminService.openVoiceButtonInfoModal(false, info)
  }
}
