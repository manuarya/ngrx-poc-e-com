import {inject, Injectable} from "@angular/core";
import {Product} from "./api/product.model";
import {ProductApiService} from "./api/product-api.service";
import {CartFacade} from "../cart/cart.facade";
import {Store} from "@ngrx/store";
import {selectAllProducts} from "./state/product.selectors";
import {fetchProducts} from "./state/product.actions";

@Injectable({
  providedIn: 'root'
})
export class ProductFacade {

  private productApiService = inject(ProductApiService)
  private cartFacade = inject(CartFacade)
  private store = inject(Store)

  public allProducts$ = this.store.select(selectAllProducts);
  jeweleryProducts$ = this.productApiService.fetch('jewelery');
  productsMethod = this.productApiService.fetch;


  async initProducts() {
    this.store.dispatch(fetchProducts())
  }

  addToCart(product: Product, quantity: number = 1) {
    return this.cartFacade.addToCart(product, quantity)
  }

  getQuantity(id: number | undefined) {
    return this.cartFacade?.productQuantity$(id);
  }

  removeFromCart(product: Product) {
    this.cartFacade.removeItem(product)
  }

  updateQuantity(product: Product, quantity: number) {
    this.cartFacade.updateQuantity(product, quantity)
  }
}
