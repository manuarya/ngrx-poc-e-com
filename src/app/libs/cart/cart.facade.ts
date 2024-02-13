import {inject, Injectable} from "@angular/core";
import {CartApiService} from "./api/cart-api.service";
import {Product} from "../product/api/product.model";
import {filter, map, Observable, of, shareReplay, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartFacade {

  private apiService = inject(CartApiService)

  public allCartItems$ = this.apiService.getCartItems()
  public totalPrice$ = this.apiService.getCartTotal();
  public totalProducts$ = this.apiService.getTotalProducts();

  addToCart(product: Product, quantity: number = 1) {
    return this.apiService.addToCart(product, quantity)
  }

  removeItem(product?: Product) {
    this.apiService.removeFromCart(product.id)
  }

  updateQuantity(productId: Product, quantity: number) {
    this.apiService.updateCartItemQuantity(productId, quantity)
  }

  getQuantity(id: number): Observable<number> {
    return this.apiService.getQuantityOfProductInCart(id)
  }
}
