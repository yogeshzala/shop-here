import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  whiteTheme = this.themeService.whiteTheme;
  blackTheme = this.themeService.blackTheme;
  constructor(private themeService: ThemeService) {}
  ngOnInit(): void {
    this.themeService.themeObservable.subscribe(() => {
      this.onThemeChange();
    });
  }

  onThemeChange() {
    this.whiteTheme = this.themeService.whiteTheme;
    this.blackTheme = this.themeService.blackTheme;
  }
}
