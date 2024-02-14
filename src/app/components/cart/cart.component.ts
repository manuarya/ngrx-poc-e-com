import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {Product} from "../../libs/product/api/product.model";
import {CartFacade} from "../../libs/cart/cart.facade";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {

  allCartItems$ = this.cartFacade.allCartItems$
  totalPrice$ = this.cartFacade.totalPrice$
  cartQuantity$ = this.cartFacade.cartQuantity$

  constructor(private cartFacade: CartFacade) {
  }

  ngOnInit(): void {
    this.cartFacade.fetchCartItems()
  }

  onRemoveClicked(product?: Product) {
    this.cartFacade.removeItem(product)
  }

  onUpdateButtonClicked(cartItem: any, number: number) {
    this.cartFacade.updateQuantity(cartItem.product, number)
  }
}
