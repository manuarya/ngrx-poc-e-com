import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Product} from "../../libs/product/api/product.model";
import {CartFacade} from "../../libs/cart/cart.facade";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {

  private cartFacade = inject(CartFacade)

  allCartItems$ = this.cartFacade.allCartItems$
  totalPrice$ = this.cartFacade.totalPrice$

  constructor() {
  }


  onRemoveButtonClicked(product?: Product) {
    this.cartFacade.removeItem(product)


  }

  updateQuantity(cartItem: any, number: number) {
    this.cartFacade.updateQuantity(cartItem.product, number)
  }
}
