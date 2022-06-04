import { Injectable, isDevMode } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal'
import { FirebaseStreamViewItem } from '@app/feature/schedule/data/firebase-stream/Stream'
import { EditModalComponent } from '@app/feature/schedule/common/edit-modal/edit-modal.component'
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  isDevMode$ = new BehaviorSubject<boolean>(false)
  isLogin$ = new BehaviorSubject<boolean>(false)
  editable$ = new BehaviorSubject<boolean>(false)

  modalRef: MdbModalRef<EditModalComponent> | null = null;

  constructor(public auth: AngularFireAuth,
              private modalService: MdbModalService) {
    this.isDevMode$.next(isDevMode())
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.isLogin$.next(true)
      } else {
        this.isLogin$.next(false)
        this.editable$.next(false)
      }
    })
  }

  editToggle (): void {
    const value = this.editable$.getValue()
    this.editable$.next(!value)
  }

  openModal(stream: FirebaseStreamViewItem): void {
    this.modalRef = this.modalService.open(EditModalComponent,{
      data: { item: stream },
    })
  }
}
