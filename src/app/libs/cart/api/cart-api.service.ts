import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, of} from 'rxjs';
import {Product} from "../../product/api/product.model";
import {CartItem} from "./cart-item.model";
import {Cart} from "./cart.model";

@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  cartItems: CartItem[] = [];

  getCart() : Cart {
    return {
      cartItems: this.cartItems,
      total: this.cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
      totalProducts: this.cartItems.reduce((acc, item) => acc + item.quantity, 0)
    }
  }

  addToCart(product: Product, quantity: number): Observable<void> {
    const existingItem = this.cartItems.find(item => item?.product?.id === product.id);

    // Create a copy of the existing cartItems array
    const updatedCartItems = [...this.cartItems];

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.total = existingItem.product.price * existingItem.quantity;
    } else {
      updatedCartItems.push({product: product, quantity: quantity, total: product.price * quantity});
    }

    this.cartItems = updatedCartItems;
    return of(undefined);
  }

  updateCartItemQuantity(product: Product, changeInQuantity: number): Observable<void> {

    const index = this.cartItems.findIndex(item => item?.product?.id === product?.id);
    if (index !== -1) {
      this.cartItems = this.cartItems.map((item, i) => i === index ? {
        ...item,
        quantity: item.quantity + changeInQuantity,
        total: item.product.price * (item.quantity + changeInQuantity)
      } : item);

      if (this.cartItems[index].quantity <= 0) {
        this.removeFromCart(product?.id)
      }
    } else {
      if (changeInQuantity > 0)
        this.addToCart(product, 1)
    }
    return of(undefined);
  }

  removeFromCart(productId: number): Observable<void> {
    const updatedCartItems = this.cartItems.filter(item => item?.product?.id !== productId);

    if (updatedCartItems.length < this.cartItems.length) {
      this.cartItems = updatedCartItems;
    } else {
      // Handle the case when the product is not found in the cart
      // throw new Error('Product not found in cart');
    }

    return of(undefined);
  }
}
