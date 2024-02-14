import {createReducer, on} from "@ngrx/store";
import { fetchCartItems, fetchCartItemsSuccess} from "./cart.actions";

export const cartFeatureKey = 'cart';

export interface CartState {
  allCartItems: any[];
  cartTotal?: number;
  cartQuantity?: number;
}

const initialCartState: CartState = {
  allCartItems: []= [],
  cartTotal: 0
}

export const cartReducer = createReducer(
  initialCartState,
  on(fetchCartItems, state => {
    return {
      ...state
    }
  }),
  on(fetchCartItemsSuccess, (state, {cartItems, cartTotal, totalProducts}) => {
    return {
      ...state,
      allCartItems: cartItems,
      cartTotal: cartTotal,
      cartQuantity: totalProducts
    }
  })
);
