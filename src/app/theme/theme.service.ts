import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  whiteTheme: boolean = false;
  blackTheme: boolean = true;
  private themeSubject = new Subject<any>();
  themeObservable = this.themeSubject.asObservable();
  constructor(@Inject(DOCUMENT) private document: Document) {}
  onThemeChange(theme: string) {
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;
    if (theme == 'white') {
      themeLink.href = 'md-light.css';
      this.whiteTheme = true;
      this.blackTheme = false;
      document.body.style.backgroundColor = '#FFFFFF';
    }
    if (theme == 'black') {
      themeLink.href = 'md-dark.css';
      this.whiteTheme = false;
      this.blackTheme = true;
      document.body.style.backgroundColor = '#1E1E1E';
    }
    this.themeSubject.next(null);
  }
}
