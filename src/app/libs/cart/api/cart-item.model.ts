import {Product} from "../../product/api/product.model";

export interface CartItem {
  product?: Product;
  quantity?: number;
}
