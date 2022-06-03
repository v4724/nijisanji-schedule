import { Directive, ElementRef } from '@angular/core';
import { ThemeService, ThemesType } from '@app/layout/theme-color/theme.service'

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
        if (themes) {
          this.el.nativeElement.parentElement.parentElement.classList.remove(themes);
        }
      }
      if (type) {
        const themes = themeService.getThemesClass(type);
        if (themes) {
          this.el.nativeElement.parentElement.parentElement.classList.add(themes);
        }
      }

      this.origType = type
    })
  }

}
