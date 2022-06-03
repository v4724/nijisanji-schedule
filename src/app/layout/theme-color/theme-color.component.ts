import { Component, OnInit } from '@angular/core';
import { ThemeService, ThemesType } from '@app/layout/theme-color/theme.service'

@Component({
  selector: 'app-theme-color',
  templateUrl: './theme-color.component.html',
  styleUrls: ['./theme-color.component.scss']
})
export class ThemeColorComponent implements OnInit {
  ThemesType = ThemesType

  themeList = this.themeService.themeList
  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
  }

  changeTheme(theme: string) {
    this.themeService.changeTheme(theme as ThemesType)
  }
}
