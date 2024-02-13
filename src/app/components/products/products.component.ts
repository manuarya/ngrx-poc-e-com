import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ProductFacade} from "../../libs/product/product.facade";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit{

  @Input() category = 'All Products';

  public products$ = this.productFacade.allProducts$;

  constructor(private productFacade: ProductFacade) {
  }


  ngOnInit(): void {
    this.productFacade.initProducts()
  }


}
