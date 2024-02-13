import {inject, Injectable} from "@angular/core";
import {Product} from "./api/product.model";
import {ProductApiService} from "./api/product-api.service";
import {CartFacade} from "../cart/cart.facade";

@Injectable({
  providedIn: 'root'
})
export class ProductFacade {

  private productApiService = inject(ProductApiService)
  private cartFacade = inject(CartFacade)

  public allProducts$ = this.productApiService.getProducts();
  jeweleryProducts$ = this.productApiService.getProducts('jewelery');
  productsMethod = this.productApiService.getProducts;


  addToCart(product: Product, quantity: number = 1) {
    return this.cartFacade.addToCart(product, quantity)
  }

  getQuantity(id: number | undefined) {
    return this.cartFacade?.getQuantity(id);
  }

  removeFromCart(product: Product) {
    this.cartFacade.removeItem(product)
  }

  updateQuantity(product: Product, quantity: number) {
    this.cartFacade.updateQuantity(product, quantity)
  }
}
