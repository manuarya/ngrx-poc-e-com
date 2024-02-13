import {Component, inject, Input} from '@angular/core';
import {Product} from "../../libs/product/api/product.model";
import {ProductFacade} from "../../libs/product/product.facade";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent {

  @Input() product?: Product; // Receive product data as input

  private productFacade = inject(ProductFacade);

  constructor() {
  }

  addToCart() {
    if (this.product) {
      this.productFacade.addToCart(this.product)
    }

  }

}
