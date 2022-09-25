import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { StreamerInfoVo } from '@app/model/vo/StreamerInfoVo'
import { ScheduleTemplateVo } from '@app/model/vo/ScheduleTemplate/ScheduleTemplateVo'
import { Observable } from 'rxjs/internal/Observable'
import { environment } from '@environments/environment'
import { catchError, finalize, map } from 'rxjs/internal/operators'
import { HttpClient } from '@angular/common/http'
import { RainbowLoaderService } from '@app/common-component/rainbow-loader/rainbow-loader.service'
import { OcrAnchorService } from '@app/service/ocr-anchor.service'
import { TextAnnotation } from '@app/model/factory/ocr/TextAnnotation'

@Injectable({
  providedIn: 'root'
})
export class OcrService {

  showTextAnnotation$ = new BehaviorSubject<Boolean>(false)
  textAnnotations$ = new BehaviorSubject<Array<TextAnnotation>>([])

  zoomRatio$ = new BehaviorSubject<number>(-1)
  clientWidth$ = new BehaviorSubject<number>(-1)

  currentStreamerInfo$ = new BehaviorSubject<StreamerInfoVo | undefined>(undefined)
  currentTemplateAnchor$ = new BehaviorSubject<ScheduleTemplateVo | undefined>(undefined)

  constructor(
    private http: HttpClient,
    private loadingService: RainbowLoaderService,
    private anchorService: OcrAnchorService) {

    anchorService.applyTemplateId$.subscribe((id) => {
      const currTemplate = this.currentTemplateAnchor$.getValue()
      if (currTemplate && currTemplate.id === id) {
        const template = this.anchorService.getLocalByStreamerAndId(currTemplate.streamer, id)
        this.currentTemplateAnchor$.next(template)
      }
    })
  }

  currTemplateUrl () {
    return this.currentTemplateAnchor$.getValue()?.templateUrl
  }

  isCurrTemplate (id: string | undefined) {
    return this.currentTemplateAnchor$.getValue()?.id === id
  }

  getTextAnnotation(imageUri: string): Observable<Array<TextAnnotation>> {
    const zoomRatio = this.zoomRatio$.getValue()

    this.loadingService.loading$.next(true)
    const key = environment.firebase.apiKey
    const url = `https://content-vision.googleapis.com/v1/images:annotate?alt=json&key=${key}`
    return this.http.post(url, {
      "requests": [
        {
          "features": [
            {
              "type": "TEXT_DETECTION"
            }
          ],
          "image": {
            "source": {
              "imageUri": imageUri
            }
          }
        }
      ]
    }).pipe(
      map((res) => {

      // @ts-ignore
      const textAnnotations = res.responses[0].textAnnotations

      textAnnotations.forEach((o: TextAnnotation) => {
        const x = o.boundingPoly.vertices[0].x
        const y = o.boundingPoly.vertices[0].y
        o.x = Math.floor(x * zoomRatio)
        o.y = Math.floor(y * zoomRatio)
        o.left = Math.floor(x * zoomRatio) + 'px'
        o.top = Math.floor(y * zoomRatio) + 'px'
      })
      this.textAnnotations$.next(textAnnotations)

      return textAnnotations
    }),
      finalize(() => {

        this.loadingService.loading$.next(false)

      })
    )
  }
}
