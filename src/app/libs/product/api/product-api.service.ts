import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product.model'; // define your Product model

const productsData: Product[] = [
  { id: 1, name: 'Product 1', price: 29.99, description: 'A cool product' },
  { id: 2, name: 'Product 2', price: 49.99, description: 'Another cool product' },
  // Add more dummy products here
];

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(productsData);
  }

  getProductById(id: number): Observable<Product | null> {
    const product = productsData.find(p => p.id === id);
    return of(product ? product : null);
  }

  addProduct(product: Product): Observable<Product> {
    product.id = this.getNextId(); // simulate auto-generated ID
    productsData.push(product);
    return of(product);
  }

  updateProduct(product: Product): Observable<Product> {
    const index = productsData.findIndex(p => p.id === product.id);
    if (index !== -1) {
      productsData[index] = product;
      return of(product);
    } else {
      throw new Error('Product not found');
    }
  }

  deleteProduct(id: number): Observable<void> {
    const index = productsData.findIndex(p => p.id === id);
    if (index !== -1) {
      productsData.splice(index, 1);
      return of(undefined);
    } else {
      throw new Error('Product not found');
    }
  }

  private getNextId(): number {
    const maxId = Math.max(...productsData.map(p => p.id));
    return maxId + 1;
  }
}
