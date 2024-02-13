import {createReducer, on} from '@ngrx/store';
import {Product} from "../api/product.model";
import {fetchProducts, fetchProductsSuccess} from "./product.actions";

export const stateFeatureKey = 'product';

export interface ProductState{
  allProducts : Product[]
  isLoaded : boolean
}

const initialProductState : ProductState = {
  allProducts : [],
  isLoaded : false
}

export const reducers = createReducer(
  initialProductState,
  on(fetchProducts, (state)=>{
    return {
      ...state,
      isLoaded : true
    }
  }),
  on(fetchProductsSuccess, (state,{products} )=>{
    return {
      ...state,
      allProducts : products
    }
  })
)

