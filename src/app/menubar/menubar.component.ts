import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css'],
})
export class MenubarComponent implements OnInit, OnDestroy {
  isLogged: boolean;
  userSubscription: Subscription;
  whiteTheme = this.themeService.whiteTheme;
  blackTheme = this.themeService.blackTheme;
  constructor(
    private loginService: LoginService,
    private messageService: MessageService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.loginService.user.subscribe((user) => {
      this.isLogged = !!user;
    });
    this.themeService.themeObservable.subscribe(() => {
      this.onThemeChange();
    });
  }

  onLogout() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warning',
      detail: 'You have been logged out.',
    });
    this.loginService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onThemeChange() {
    this.whiteTheme = this.themeService.whiteTheme;
    this.blackTheme = this.themeService.blackTheme;
  }
}
