import { Injectable, isDevMode } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal'
import { FirebaseStreamViewItem } from '@app/feature/schedule/type'
import { EditModalComponent } from '@app/feature/schedule/common/edit-modal/edit-modal.component'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  isDevMode$ = new BehaviorSubject<boolean>(false)
  editable$ = new BehaviorSubject<boolean>(false)

  modalRef: MdbModalRef<EditModalComponent> | null = null;

  constructor(private modalService: MdbModalService) {
    this.isDevMode$.next(isDevMode())
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
