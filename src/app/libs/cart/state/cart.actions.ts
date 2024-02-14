import {createAction, props} from "@ngrx/store";
import {CartItem} from "../api/cart-item.model";
import {Product} from "../../product/api/product.model";

export const fetchCartItems = createAction('[Cart] Fetch Cart Items')

export const fetchCartItemsSuccess = createAction(
  '[Cart] Fetch Cart Items Success',
  props<{cartItems: CartItem[], cartTotal: number, totalProducts: number}>()
)
export const fetchCartItemsFailure = createAction(
  '[Cart] Fetch Cart Items Failure',
  props<{error: string}>()
)

export const updateCartItemQuantity = createAction(
  '[Cart] Update Cart Item Quantity',
  props<{product: Product, quantity: number}>()
)

export const removeCartItem = createAction(
  '[Cart] Remove Cart Item',
  props<{product: Product}>()
)

