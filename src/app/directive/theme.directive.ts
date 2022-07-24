import { Directive, ElementRef } from '@angular/core';
import { ThemeService, ThemesType } from '@app/feature/setting/theme.service'

@Directive({
  selector: '[appTheme]'
})
export class ThemeDirective {

  origType = ThemesType.DEFAULT

  constructor(private el: ElementRef,
              private themeService: ThemeService) {

    this.themeService.$type.subscribe((type) => {
      if (this.origType) {
        const themes = themeService.getThemesClass(this.origType);
        this.el.nativeElement.classList.remove(themes);
      }
      if (type) {
        const themes = themeService.getThemesClass(type);
        this.el.nativeElement.classList.add(themes);
      }

      this.origType = type
    })
  }

}
