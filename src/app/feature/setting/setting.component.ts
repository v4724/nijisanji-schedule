import { Component, OnInit } from '@angular/core';
import { ThemeService, ThemesType } from '@app/feature/setting/theme.service'

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  ThemesType = ThemesType
  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
  }
  changeTheme(theme: ThemesType) {
    this.themeService.changeTheme(theme)
  }
}
