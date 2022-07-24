import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

export enum ThemesType {
  DEFAULT = '',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
  DARK = 'DARK',
}

export enum ThemesColor {
  BLUE = 'theme-blue',
  YELLOW = 'theme-yellow',
  DARK = 'theme-dark'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  key = 'USER_THEMES'
  $type = new BehaviorSubject<ThemesType>(ThemesType.DEFAULT)
  constructor() {
    const type = localStorage.getItem(this.key);
    this.$type.next(type as ThemesType)
  }

  changeTheme(type: ThemesType): void {
    localStorage.setItem(this.key, type)
    this.$type.next(type as ThemesType)
  }

  getThemesClass(type: ThemesType): string {
    let themeColor = '';
    switch (type) {
      case ThemesType.DARK:
        themeColor = ThemesColor.DARK;
        break;
      case ThemesType.BLUE:
        themeColor = ThemesColor.BLUE;
        break;
      case ThemesType.YELLOW:
        themeColor = ThemesColor.YELLOW;
        break;
      default:
        themeColor = '';
        break;
    }
    return themeColor;
  }
}
