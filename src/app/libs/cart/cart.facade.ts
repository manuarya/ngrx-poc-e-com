import {inject, Injectable} from "@angular/core";
import {CartApiService} from "./api/cart-api.service";
import {Product} from "../product/api/product.model";
import {filter, map, Observable, of, shareReplay, switchMap} from "rxjs";
import {Store} from "@ngrx/store";
import {updateCartItemQuantity, fetchCartItems, removeCartItem} from "./state/cart.actions";
import {selectAllCartItems, selectCartQuantity, selectCartTotal, selectProductQuantity} from "./state/cart.selectors";

@Injectable({
  providedIn: 'root'
})
export class CartFacade {

  private apiService = inject(CartApiService)
  private store = inject(Store)

  public allCartItems$ = this.store.select(selectAllCartItems)
  public totalPrice$ = this.store.select(selectCartTotal);
  public cartQuantity$ = this.store.select(selectCartQuantity);
  public productQuantity$ = (id: number | undefined) => this.store.select(selectProductQuantity(id));


  fetchCartItems() {
    this.store.dispatch(fetchCartItems())
  }

  addToCart(product: Product, quantity: number = 1) {
    return this.store.dispatch(updateCartItemQuantity({product, quantity}))
  }

  removeItem(product?: Product) {
    this.store.dispatch(removeCartItem({product}) )
  }

  updateQuantity(product: Product, quantity: number) {
    return this.store.dispatch(updateCartItemQuantity({product, quantity}))
  }

}
