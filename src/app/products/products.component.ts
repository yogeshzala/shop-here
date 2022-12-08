import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { AppComponent } from '../app.component';
import { SelectItem } from 'primeng/api';

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

  constructor(
    private productsService: ProductsService,
    private appComponent: AppComponent
  ) {
    this.appComponent.loading(true);
  }

  ngOnInit() {
    this.getProducts();
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];
  }

  async getProducts() {
    try {
      this.products = await this.productsService.getProducts();
      console.log(this.products);
      this.appComponent.loading(false);
    } catch (error) {
      console.log(error);
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
    console.log(this.value);
  }
}
