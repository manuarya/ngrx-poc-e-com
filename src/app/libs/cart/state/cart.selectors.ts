import {createFeatureSelector, createSelector} from "@ngrx/store";
import {stateFeatureKey} from "../../product/state/product.reducer";
import {cartFeatureKey} from "./cart.reducer";

export const selectCartState = createFeatureSelector(cartFeatureKey)

export const selectAllCartItems = createSelector(
  selectCartState,
  (state: any) => state?.allCartItems
)
export const selectCartTotal = createSelector(
  selectCartState,
  (state: any) => {
    return state.cartTotal
  }
)

export const selectCartQuantity = createSelector(
  selectCartState,
  (state: any) => {
    return state.cartQuantity
  }
)

export const selectProductQuantity = (id: number) => createSelector(
  selectAllCartItems,
  (items: any[]) => {
    return items.find(item => item?.product?.id === id)?.quantity
  }
)

