import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, of} from 'rxjs';
import {Product} from "../../product/api/product.model";
import {CartItem} from "./cart-item.model";

@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  private cartItems: CartItem[] = [];

  constructor() {
    this.cartItemsSubject.next(this.cartItems);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  addToCart(product: Product, quantity: number): Observable<void> {
    const existingItem = this.cartItems.find(item => item?.product?.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({product, quantity});
    }
    this.cartItemsSubject.next(this.cartItems);
    return of(undefined);
  }

  updateCartItemQuantity(product: Product, changeInQuantity: number): Observable<void> {
    const index = this.cartItems.findIndex(item => item?.product?.id === product?.id);
    if (index !== -1) {
      this.cartItems[index].quantity += changeInQuantity;
      if(this.cartItems[index].quantity <= 0) {
        this.removeFromCart(product?.id)
      }
    } else {
      if(changeInQuantity > 0)
        this.addToCart(product, 1)
    }
    this.cartItemsSubject.next(this.cartItems);
    return of(undefined);
  }

  removeFromCart(productId: number): Observable<void> {
    const index = this.cartItems.findIndex(item => item?.product?.id === productId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    } else {
      // throw new Error('Product not found in cart');
    }
    this.cartItemsSubject.next(this.cartItems);
    return of(undefined);
  }

  getCartTotal(): Observable<number> {
    return this.cartItemsSubject.pipe(
      map(cartItems => cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0) || 0)
    );
  }

  getQuantityOfProductInCart(productId: number): Observable<number> {
    return this.getCartItems().pipe(
      map(cartItems => {
        const cartItem = cartItems.find(item => item.product.id === productId);
        console.log(cartItems, productId)
        return cartItem ? cartItem.quantity : 0;
      })
    );
  }

  getTotalProducts() {
    return this.cartItemsSubject.pipe(
      map(cartItems => cartItems.reduce((acc, item) => acc + item.quantity, 0) || 0)
    );
  }
}
