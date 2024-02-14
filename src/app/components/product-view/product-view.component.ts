import {ChangeDetectionStrategy, Component, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Product} from "../../libs/product/api/product.model";
import {ProductFacade} from "../../libs/product/product.facade";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductViewComponent implements OnChanges{

  @Input() product?: Product; // Receive product data as input

  private productFacade = inject(ProductFacade);

  quantity$ ;
  constructor() {
  }

  addToCart() {
    if (this.product) {
      this.productFacade.addToCart(this.product)
    }

  }

  removeFromCart() {
    if(this.product) {
      this.productFacade.removeFromCart(this.product)
    }
  }

  updateQuantity(quantity: number) {
    if(this.product) {
      this.productFacade.updateQuantity(this.product, quantity)
    }
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.product){
      this.quantity$= this.productFacade?.getQuantity(this.product?.id)
    }
  }
}
