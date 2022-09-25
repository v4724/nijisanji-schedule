import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore'
import { RainbowLoaderService } from '@app/common-component/rainbow-loader/rainbow-loader.service'
import { BehaviorSubject, Observable } from 'rxjs'
import { delay, map, take, tap } from 'rxjs/internal/operators'
import { ScheduleTemplateVo } from '@app/model/vo/ScheduleTemplate/ScheduleTemplateVo'
import { fromDto, ScheduleTemplateDto, toVoList } from '@app/model/dto/ScheduleTemplateDto'
import { StreamDto } from '@app/model/dto/StreamDto'

@Injectable({
  providedIn: 'root'
})
export class OcrAnchorService {

  ocrAnchorInfos: Map<string, Array<ScheduleTemplateVo>> = new Map<string, Array<ScheduleTemplateVo>>()
  items: Observable<any[]> | undefined;

  applyTemplateId$ = new BehaviorSubject<string>('')

  constructor(private db: AngularFirestore,
              private loader: RainbowLoaderService) {

  }

  public applyLocal (vo: ScheduleTemplateVo): void {
    const infos = this.ocrAnchorInfos.get(vo.streamer)
    if (!infos) {
      return
    }
    const index = infos.findIndex((origVo) => origVo.id === vo.id)
    infos.splice(index, 1, vo)

    this.applyTemplateId$.next(vo.id ?? '')
  }

  public getRemoteById (id: string): Observable<ScheduleTemplateVo | undefined> {
    this.loader.loading$.next(true)

    return this.db.collection<ScheduleTemplateDto>('ocrAnchors')
               .doc(id)
               .valueChanges()
               .pipe(
                 take(1),
                 map((vo) => {
                   if (vo) {
                     return fromDto(id, vo)
                   }
                   return vo
                 }),
                 tap(() => {
                   this.loader.loading$.next(false)
                 }),
               )
  }

  public getLocalByStreamerAndId (streamer: string, id: string): ScheduleTemplateVo | undefined {
    const templates = this.ocrAnchorInfos.get(streamer)
    if (templates) {
      return templates.find((t) => t.id === id)
    }

    return undefined
  }

  public getByStreamer (streamer: string, force: boolean): Observable<Array<ScheduleTemplateVo>> {
    const infos = this.ocrAnchorInfos
    if (force || !infos.has(streamer)) {
      return this.get(streamer)
                 .pipe(
                   tap((result) => {
                     this.ocrAnchorInfos.set(streamer, result)
                   })
                 )
    } else {
      const ob = new Observable<Array<ScheduleTemplateVo>>((observer) => {
        observer.next(infos.get(streamer))
        observer.complete()
      })
      return ob
    }
  }

  public add (infoDto: ScheduleTemplateDto): Promise<boolean> {
    this.loader.loading$.next(true)

    return this.db.collection('ocrAnchors')
               .add(infoDto)
               .then(() => {
                 this.getByStreamer(infoDto.streamer, true)
                 return true;
               })
               .catch((err) => {
                 console.error(err)
                 window.alert(err)
                 return false;
               })
               .finally(() => {
                 this.loader.loading$.next(false)
               })
  }

  public update (id: string, data: ScheduleTemplateDto): Promise<void> {
    this.loader.loading$.next(true)

    return this.db.collection<ScheduleTemplateDto>('ocrAnchors')
               .doc(id)
               .update(data)
               .catch((err) => {
                 console.error(err)
                 window.alert(err)
               })
               .finally(() => {
                 this.loader.loading$.next(false)
               })
  }

  public delete (id: string): Promise<void> {
    return this.db.collection('ocrAnchors')
               .doc(id)
               .delete()
               .catch((err) => {
                 console.error(err)
                 window.alert(err)
               })
  }

  private get (streamer: string): Observable<Array<ScheduleTemplateVo>> {
    this.loader.loading$.next(true)

    return this.db.collection<Array<ScheduleTemplateVo>>(
      'ocrAnchors', ref => ref.where('streamer', '==', streamer))
               .get()
               .pipe(
                 delay(500),
                 map((snapshot:QuerySnapshot<any>) => {
                   const origData = snapshot.docs
                   let data: Array<ScheduleTemplateVo> = toVoList(origData)
                   return data
                 }),
                 tap(() => {
                   this.loader.loading$.next(false)
                 })
               )
  }
}
