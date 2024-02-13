import {Injectable} from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {Product} from "../../product/api/product.model";
import {CartItem} from "./cart-item.model";

@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  private cartItems: CartItem[] = [];

  constructor() {
  }

  getCartItems(): Observable<CartItem[]> {
    return of(this.cartItems);
  }

  addToCart(product: Product, quantity: number): Observable<void> {
    const existingItem = this.cartItems.find(item => item?.product?.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({product, quantity});
    }
    return of(undefined);
  }

  updateCartItemQuantity(product: Product, changeInQuantity: number): Observable<void> {
    const index = this.cartItems.findIndex(item => item?.product?.id === product?.id);
    if (index !== -1) {
      this.cartItems[index].quantity += changeInQuantity;
      if(this.cartItems[index].quantity <= 1) {
        this.removeFromCart(product?.id)
      }
    } else {
      if(changeInQuantity > 0)
        this.addToCart(product, 1)
    }
    return of(undefined);
  }

  removeFromCart(productId: number): Observable<void> {
    const index = this.cartItems.findIndex(item => item?.product?.id === productId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    } else {
      // throw new Error('Product not found in cart');
    }
    return of(undefined);
  }

  getCartTotal(): Observable<number> {
    return of(
      this.cartItems.reduce((acc, item) => acc + item?.product?.price * item.quantity, 0)
    );
  }

  getQuantityOfProductInCart(productId): Observable<number> {
    // return of(this.cartItems.find(item=>item.product.id == productId)?.quantity || 0)
    return this.getCartItems().pipe(
      map(cartItems => cartItems.find(item => item.product.id === productId)?.quantity || 0)
    );
  }
}
