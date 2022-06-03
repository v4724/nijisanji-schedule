import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore'
import { RainbowLoaderService } from '@app/common-component/rainbow-loader/rainbow-loader.service'
import { Observable } from 'rxjs'
import { delay, map, tap } from 'rxjs/internal/operators'
import { OCRAnchorDto, toVoList } from '@app/model/dto/OCRAnchorDto'
import { OCRAnchorVo } from '@app/model/vo/OCRAnchorVo'

@Injectable({
  providedIn: 'root'
})
export class OcrAnchorService {

  ocrAnchorInfos: Map<string, OCRAnchorVo> = new Map<string, OCRAnchorVo>()
  items: Observable<any[]> | undefined;

  constructor(private db: AngularFirestore,
              private loader: RainbowLoaderService) {

  }

  public applyLocal (vo: OCRAnchorVo): void {
    this.ocrAnchorInfos.set(vo.streamer, vo)
  }

  public getByStreamer (streamer: string, force: boolean): Observable<OCRAnchorVo> {
    if (force) {
      return this.get(streamer)
                 .pipe(
                   tap((result) => {
                     this.ocrAnchorInfos.set(streamer, result)
                   })
                 )
    } else {
      const infos = this.ocrAnchorInfos
      if (infos.has(streamer)) {
        const ob = new Observable<OCRAnchorVo>((observer) => {
          observer.next(infos.get(streamer))
          observer.complete()
        })
        return ob
      } else {
        return this.get(streamer)
                   .pipe(
                     tap((result) => {
                       this.ocrAnchorInfos.set(streamer, result)
                     })
                   )
      }
    }
  }

  public add (infoDto: OCRAnchorDto): Promise<boolean> {
    this.loader.loading$.next(true)

    return this.db.collection('ocrAnchors')
               .add(infoDto)
               .then(() => {

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

  public update (id: string, data: OCRAnchorDto): Promise<void> {
    this.loader.loading$.next(true)

    return this.db.collection<OCRAnchorDto>('ocrAnchors')
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

  private get (streamer: string): Observable<OCRAnchorVo> {
    this.loader.loading$.next(true)

    return this.db.collection<OCRAnchorVo>(
      'ocrAnchors', ref => ref.where('streamer', '==', streamer))
               .get()
               .pipe(
                 delay(500),
                 map((snapshot:QuerySnapshot<any>) => {
                   const origData = snapshot.docs
                   let data: OCRAnchorVo = toVoList(origData)[0]
                   return data
                 }),
                 tap(() => {
                   this.loader.loading$.next(false)
                 })
               )
  }
}
