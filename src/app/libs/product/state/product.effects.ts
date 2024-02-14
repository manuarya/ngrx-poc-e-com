import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {fetchProducts, fetchProductsFailure, fetchProductsSuccess} from "./product.actions";
import {catchError, exhaustMap, map, of} from "rxjs";
import {ProductApiService} from "../api/product-api.service";
import {Product} from "../api/product.model";

@Injectable(
  {providedIn: 'root'}
)
export class ProductEffects{

  private actions$ = inject(Actions);
  private apiService = inject(ProductApiService);


  fetchProducts$ = createEffect(
    () =>{
      return this.actions$.pipe(
        ofType(fetchProducts),
        exhaustMap(() => this.apiService.fetch().pipe(
            map((products: Product[]) => fetchProductsSuccess({ products })),
            catchError(() => of(fetchProductsFailure({ error: 'Error fetching products'})))
          )
        )
      )
    }
  );



}
