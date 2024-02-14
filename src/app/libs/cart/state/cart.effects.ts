import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, map, of} from "rxjs";
import {
  updateCartItemQuantity,
  fetchCartItems,
  fetchCartItemsFailure,
  fetchCartItemsSuccess,
  removeCartItem
} from "./cart.actions";
import {CartApiService} from "../api/cart-api.service";
import {Cart} from "../api/cart.model";

@Injectable({
  providedIn: 'root'
})
export class CartEffects {

  private actions$ = inject(Actions);
  private apiService = inject(CartApiService);


  fetchCartItems$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fetchCartItems),
        exhaustMap(action => of(this.apiService.getCart()).pipe(
            map((cart: Cart) => {
              return fetchCartItemsSuccess({
                cartItems: cart.cartItems,
                cartTotal: cart.total,
                totalProducts: cart.totalProducts
              })
            }),
            catchError(() => of(fetchCartItemsFailure({error: 'Error fetching cart'})))
          )
        )
      )
    }
  );
  updateCartItemQuantity$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(updateCartItemQuantity),
        exhaustMap(action => {
            return this.apiService.updateCartItemQuantity(action.product, action.quantity).pipe(
              map(() => {
                return fetchCartItems()
              }),
            )
          }
        )
      );
    }
  );

  removeCartItem$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(removeCartItem),
        exhaustMap(action => {
            return this.apiService.removeFromCart(action.product.id).pipe(
              map(() => {
                return fetchCartItems()
              }),
            )
          }
        )
      );
    })
}
