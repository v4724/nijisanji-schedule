import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { StreamerInfoService } from '@app/service/streamer-info.service'
import { StreamGroupService } from '@app/service/stream-group.service'
import { AdminService } from '@app/service/admin.service'
import { combineLatest, Subscription } from 'rxjs'
import { FormControl } from '@angular/forms'
import { MatAutocomplete } from '@angular/material/autocomplete'
import { TimezoneService } from '@app/layout/timezone/timezone.service'
import { RainbowLoaderService } from '@app/common-component/rainbow-loader/rainbow-loader.service'
import { StreamService } from '@app/service/stream.service'
import { ToastService } from '@app/common-component/toast/toast.service'
import { OcrAnchorService } from '@app/service/ocr-anchor.service'
import * as lodash from 'lodash'
import { ScheduleTemplateVo } from '@app/model/vo/ScheduleTemplate/ScheduleTemplateVo'
import { TemplateEditorService } from '@app/feature/ocr/template-form-editor/template-editor.service'
import { TemplateResultService } from '@app/feature/ocr/template-form-result/template-result.service'
import { OcrService } from '@app/feature/ocr/ocr.service'


export interface OCRStream {
  hourSystem: string,
  title: string,
  date: string,
  time: string,
  timezone: string,
  timestamp: number,
  scheduleOrigDisplayText: string,   // display
  scheduleTzDisplayText: string,   // display
  createdStatus: string,  // loading
  formControl: FormControl, // form

  searchFeatStreamer: string, // form
  findFeatStreamerInfo?: StreamerInfoVo, // form
  featStreamers: string[], // form
}

export interface OCRSchedule {
  month: string,
  date: string,
  streams: Array<OCRStream>
}

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.scss']
})
export class OcrComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('image') image: ElementRef | undefined
  @ViewChild('scheduleTemplateImgContent') scheduleTemplateImgContentRef: ElementRef | undefined

  currentStreamerInfo: StreamerInfoVo | undefined;

  streamerKeyword = ''
  streamers: Array<StreamerInfoVo> = []
  filterStreamers: Array<StreamerInfoVo> = []

  myControl = new FormControl('');

  searchFeatStreamer: string = ''
  findFeatStreamerInfo: StreamerInfoVo | undefined = undefined

  subscriptions: Array<Subscription> = []

  scheduleTemplates: Array<ScheduleTemplateVo> = []
  constructor(private streamerService: StreamerInfoService,
              private streamGroupService: StreamGroupService,
              public tzService: TimezoneService,
              public adminService: AdminService,
              private loadingService: RainbowLoaderService,
              private streamService: StreamService,
              private toastService: ToastService,
              private ocrAnchorService: OcrAnchorService,
              public templateEditorService: TemplateEditorService,
              public templateFormResultService: TemplateResultService,
              public service: OcrService) {
  }

  ngOnDestroy(): void {
     this.subscriptions.forEach((s) => {
       if (s) {
         s.unsubscribe()
       }
     })
  }

  ngOnInit(): void {

    const s = this.service.currentStreamerInfo$.subscribe((info) => {
      this.reloadAnchors()
    })
    this.subscriptions.push(s)

    const s1 = combineLatest([
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
          this.changeCurrStreamer('Ike')
          // @ts-ignore
          this.streamerKeyword = 'Ike'
        }
      })
    this.subscriptions.push(s1)

    const s2 = this.templateEditorService.currentRect$.subscribe((rect) => {
      if (rect && this.scheduleTemplateImgContentRef) {
        const minX = rect.minX
        const minY = rect.minY

        if (!rect.exist) {
          return
        }
        const viewportWidthCenterX = this.scheduleTemplateImgContentRef.nativeElement.offsetWidth / 2
        const viewportHeightCenterY = this.scheduleTemplateImgContentRef.nativeElement.offsetHeight / 2
        const scrollX = (minX - viewportWidthCenterX) < 0 ? 0 : viewportWidthCenterX
        const scrollY = (minY - viewportHeightCenterY) < 0 ? 0 : viewportHeightCenterY
        this.scheduleTemplateImgContentRef.nativeElement.scroll(scrollX, scrollY)
      }
    })
    this.subscriptions.push(s2)
  }

  ngAfterViewInit () {
  }

  showTextAnnotationChange (e: any) {
    this.service.showTextAnnotation$.next(e.target.checked)
  }

  updateRatio(imageElement: HTMLImageElement) {
    const clientHeight = imageElement.clientHeight
    // const clientHeight = 1296
    const naturalHeight = imageElement.naturalHeight
    const ratio = clientHeight/naturalHeight

    const clientWidth = imageElement.clientWidth

    this.service.zoomRatio$.next(ratio)
    this.service.clientWidth$.next(clientWidth)
  }

  load (e: HTMLImageElement): void {
    this.updateRatio(e)
    this.templateFormResultService.loadTextAnnotation()
  }

  loadTextAnnotationEditingUrl(e: HTMLImageElement) {
    this.templateEditorService.updateEditingUrlCanvasSize(e)
    this.updateRatio(e)
    const imgUri = this.templateEditorService.editingUrl$.getValue()

    this.service.getTextAnnotation(imgUri)
        .subscribe()
  }

  changeStreamerKeyword(auto?: MatAutocomplete): void {
    const upperKeyword = this.streamerKeyword.toString().toUpperCase()
    this.filterStreamers = this.streamers.filter((info)=> {
      return upperKeyword.length ? info.name.toUpperCase().includes(upperKeyword) : true
    })

  }

  async changeCurrStreamer(name: string) {
    if (name === this.currentStreamerInfo?.name) {
      return
    }

    const streamerInfo = this.streamers.find(info => info.name === name)
    await this.ocrAnchorService.getByStreamer(name, false).toPromise()

    if (streamerInfo !== this.currentStreamerInfo) {
      this.currentStreamerInfo = streamerInfo
      this.service.currentStreamerInfo$.next(this.currentStreamerInfo)
    }
  }

  changeCurrTemplate(template: ScheduleTemplateVo): void {
    const curr = this.service.currentTemplateAnchor$.getValue()
    if (curr?.id === template.id) {
      return
    }
    this.service.currentTemplateAnchor$.next(template)
  }

  createAnchor(): void {
    this.adminService.openCreateAnchorInfoModal()
  }

  editAnchor(): void {
    const isEditing = this.templateEditorService.isEditing$.getValue()
    this.templateEditorService.isEditing$.next(!isEditing)
  }

  reloadAnchors(): void {
    const info = this.currentStreamerInfo
    if (info) {
      const name = info.name ?? ''
      this.ocrAnchorService.getByStreamer(name, true)
          .subscribe((voList) => {
            this.scheduleTemplates = lodash.cloneDeep(voList)
            if (this.scheduleTemplates.length) {
              this.service.currentTemplateAnchor$.next(this.scheduleTemplates[0])
            }
          })
    }
  }
}
