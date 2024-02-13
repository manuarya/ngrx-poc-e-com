import {Component} from '@angular/core';
import {ProductApiService} from "../../libs/product/api/product-api.service";
import {ProductFacade} from "../../libs/product/product.facade";
import {Product} from "../../libs/product/api/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {

  public products$ = this.productFacade.allProducts$;

  constructor(private productFacade: ProductFacade) {
  }




}
