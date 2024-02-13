import { Component, OnInit } from '@angular/core';
import {Product} from "../../libs/product/api/product.model";
import {CartItem} from "../../libs/cart/api/cart-item.model";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor() {}

  ngOnInit() {
    // Fetch or access your cart data (replace with your implementation)
    this.cartItems = [
      // Add products to your cart data here
    ];
    this.calculateTotalPrice();
  }

  removeItem(product?: Product) {
    const index = this.cartItems.findIndex(p => p?.product?.id === product?.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + item?.product?.price, 0);
  }
}
