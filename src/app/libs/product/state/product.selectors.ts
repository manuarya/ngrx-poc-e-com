import {createFeatureSelector, createSelector} from "@ngrx/store";
import {stateFeatureKey} from "./product.reducer";


export const selectProductState = createFeatureSelector(stateFeatureKey)

export const selectAllProducts = createSelector(
  selectProductState,
  (state: any) => state.allProducts
)

