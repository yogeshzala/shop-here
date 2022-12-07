import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any;

  constructor(
    private productsService: ProductsService,
    private appComponent: AppComponent
  ) {
    this.appComponent.loading(true);
  }

  ngOnInit() {
    this.getProducts();
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
}
