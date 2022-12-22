import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { AppComponent } from '../app.component';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { LoginService } from '../login/login.service';
import { Subscription } from 'rxjs';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any;
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  sortKey: string;
  value: string;
  isLogged: boolean;
  userSubscription: Subscription;

  whiteTheme = this.themeService.whiteTheme;
  blackTheme = this.themeService.blackTheme;

  constructor(
    private productsService: ProductsService,
    private appComponent: AppComponent,
    private messageService: MessageService,
    private loginService: LoginService,
    private themeService: ThemeService
  ) {
    this.appComponent.loading(true);
  }

  ngOnInit() {
    this.getProducts();
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];
    this.userSubscription = this.loginService.user.subscribe((user) => {
      this.isLogged = !!user;
    });
  }

  async getProducts() {
    try {
      this.products = await this.productsService.getProducts();
      this.appComponent.loading(false);
      if (this.isLogged) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login successful.',
        });
      }
    } catch (error) {
      this.appComponent.loading(false);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Network error.',
      });
    }
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  search(event) {
    this.value = event.value;
  }

  onAddtoCart() {
    if (this.isLogged == true) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Added to cart.',
      });
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'You need to login first.',
      });
    }
  }

  onThemeChange(theme: string) {
    this.themeService.onThemeChange(theme);
    this.whiteTheme = this.themeService.whiteTheme;
    this.blackTheme = this.themeService.blackTheme;
  }
}
