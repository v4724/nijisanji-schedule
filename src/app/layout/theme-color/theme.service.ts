import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

export enum ThemesType {
  DEFAULT = 'DEFAULT',
  THEME1 = 'THEME1',
  THEME2 = 'THEME2',
  THEME3 = 'THEME3',
  THEME4 = 'THEME4',
}

export enum ThemesColor {
  THEME1 = 'theme-blue',
  THEME2 = 'theme-test0',
  THEME3 = 'theme-yellow',
  THEME4 = 'theme-4'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  themeList = [{
    type: ThemesType.DEFAULT,
    colors: [{
      color: '',
      fontColor: ''
    }, {
      color: '',
      fontColor: ''
    }, {
      color: '',
      fontColor: ''
    }, {
      color: '',
      fontColor: ''
    }, {
      color: '',
      fontColor: ''
    }]
  }, {
    type: ThemesType.THEME1,
    colors: [{
      color: '#67ACE0',
      fontColor: '#747474'
    }, {
      color: '#F2E3B3',
      fontColor: '#747474'
    }, {
      color: '#545454',
      fontColor: '#bfbfbf'
    }, {
      color: '#F0F0F040',
      fontColor: '#747474'
    }, {
      color: '#A1564A',
      fontColor: '#d0aba5'
    }]
  }, {
    type: ThemesType.THEME2,
    colors: [{
      color: '#72C6A4',
      fontColor: '#747474'
    }, {
      color: '#427BA6',
      fontColor: '#c6c6c6'
    }, {
      color: '#BAC8CE',
      fontColor: '#747474'
    }, {
      color: '#F0F0F040',
      fontColor: '#747474'
    }, {
      color: '#B25A28',
      fontColor: '#d0aba5'
    }]
  }, {
    type: ThemesType.THEME3,
    colors: [{
      color: '#9B354D',
      fontColor: '#d0aba5'
    }, {
      color: '#F9D401',
      fontColor: '#747474'
    }, {
      color: '#242629',
      fontColor: '#d0aba5'
    }, {
      color: '#F0F0F040',
      fontColor: '#747474'
    }, {
      color: '#F99F00',
      fontColor: '#747474'
    }]
  // }, {
  //   type: ThemesType.THEME4,
  //   colors: [{
  //     color: '',
  //     fontColor: ''
  //   }, {
  //     color: '',
  //     fontColor: ''
  //   }, {
  //     color: '',
  //     fontColor: ''
  //   }, {
  //     color: '',
  //     fontColor: ''
  //   }, {
  //     color: '',
  //     fontColor: ''
  //   }]
  }]

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
      case ThemesType.THEME4:
        themeColor = ThemesColor.THEME4;
        break;
      case ThemesType.THEME1:
        themeColor = ThemesColor.THEME1;
        break;
      case ThemesType.THEME3:
        themeColor = ThemesColor.THEME3;
        break;
      case ThemesType.THEME2:
        themeColor = ThemesColor.THEME2;
        break;
      default:
        themeColor = '';
        break;
    }
    return themeColor;
  }
}
