import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  whiteTheme: boolean = false;
  blackTheme: boolean = true;
  private themeSubject = new Subject<any>();
  themeObservable = this.themeSubject.asObservable();
  constructor() {}
  onThemeChange(theme: string) {
    if (theme == 'white') {
      this.whiteTheme = true;
      this.blackTheme = false;
    }
    if (theme == 'black') {
      this.whiteTheme = false;
      this.blackTheme = true;
    }
    this.themeSubject.next(null);
  }
}
