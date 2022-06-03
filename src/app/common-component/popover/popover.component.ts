import {
  AfterContentInit,
  AfterViewInit, ChangeDetectorRef,
  Component, ContentChild, DoCheck,
  ElementRef,
  Input, OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core'
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs'
import { debounceTime, filter } from 'rxjs/operators'

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit, AfterContentInit, AfterContentInit, AfterViewInit, OnDestroy {
  @ViewChild('icon') icon: ElementRef | undefined
  @ViewChild('content') content: ElementRef | undefined

  @Input() hidden: boolean = false
  @Input() isHover: boolean = false
  @Input() contentRight: string = '-2rem'

  $windowClick = new BehaviorSubject<any>({ propagate: true, value: true })
  $cmpClick = new BehaviorSubject<any>({ propagate: true, value: false })

  active = false

  combineSubscription: Subscription | undefined;
  windowClickListener = () =>{}
  contentClickListener = () =>{}

  maxHeight: string = ''
  constructor(private cdf:ChangeDetectorRef) {

  }

  get currMaxHeight (): string {
    const defaultTop = 100
    const boundingClientRect = this.icon?.nativeElement.getBoundingClientRect()
    const top = boundingClientRect?.top + boundingClientRect?.height
    const absoluteTop = boundingClientRect ? top : defaultTop
      // console.log(this.icon?.nativeElement.getBoundingClientRect())
    return `calc(100vh - ${absoluteTop}px - 1.2rem - 2rem)`
  }

  // get currContentRight (): string {
  //   const defaultRight = '-2rem'
  //   const boundingClientRect = this.content?.nativeElement.getBoundingClientRect()
  //   const right = boundingClientRect?.right
  //   console.log(boundingClientRect, right, window.visualViewport.width)
  //   if (this.contentRight !== defaultRight) {
  //     const absoluteRight = right > window.visualViewport.width ? defaultRight : ''
  //     return absoluteRight
  //   }
  //   return this.contentRight
  // }

  ngOnInit(): void {
    this.combineSubscription = combineLatest([
      this.$windowClick.pipe(filter(rs => rs.propagate)),
      this.$cmpClick.pipe(filter(rs => rs.propagate))
    ])
      .pipe(
        debounceTime(50)
      )
      .subscribe(() => {
        const r1 = this.$windowClick.getValue().value
        const r2 = this.$cmpClick.getValue().value
        // console.log(r1, r2)
        if (r1 && !r2) {
          this.active = false
        }

        this.$windowClick.next({propagate: false, value: false})
        this.$cmpClick.next({propagate: false, value: false})
      })
  }

  ngAfterContentInit(): void {
  }

  ngAfterViewInit () {
    this.windowClickListener = () => {
      // console.log('windowClickListener', this.active, this)
      if (this.active) {
        this.$windowClick.next({propagate: true, value: true})
      }
    }

    this.contentClickListener = () => {
      // console.log('contentClickListener', this.active, this)
      if (this.active) {
        this.$cmpClick.next({propagate: true, value: true})
      }

    }

    window.addEventListener('click', this.windowClickListener)
    this.content?.nativeElement.addEventListener('click', this.contentClickListener)
    this.maxHeight = this.currMaxHeight
    this.cdf.detectChanges()
  }

  ngOnDestroy () {
    this.combineSubscription?.unsubscribe()
    window.removeEventListener('click', this.windowClickListener)
    this.content?.nativeElement.removeEventListener('click', this.contentClickListener)
  }

  iconClicked ($event: Event): void {

    if (this.isHover) {
      return
    }

    $event.stopPropagation()
    this.active= !this.active
  }

}
