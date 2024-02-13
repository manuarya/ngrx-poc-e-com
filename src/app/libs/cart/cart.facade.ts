import {inject, Injectable} from "@angular/core";
import {CartApiService} from "./api/cart-api.service";
import {Product} from "../product/api/product.model";

@Injectable({
  providedIn: 'root'
})
export class CartFacade {

  private apiService = inject(CartApiService)

  public allCartItems = this.apiService.getCartItems()
  public totalPrice$;

  addToCart(product: Product, quantity: number = 1) {
    return this.apiService.addToCart(product, quantity)
  }

  removeItem(product?: Product) {
    this.apiService.removeFromCart(product.id)
  }

}
