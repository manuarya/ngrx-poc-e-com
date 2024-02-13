import {Injectable} from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {Product} from './product.model';
import {HttpClient} from "@angular/common/http"; // define your Product model

const productsData: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    price: 29.99,
    description: 'A cool product',
    imageUrl: 'https://www.digitaltrends.com/wp-content/uploads/2022/08/iPhone-SE-2022-Starlight-Back-in-Hand.jpg?resize=625%2C417&p=1'
  },
  {
    id: 2,
    name: 'Product 2',
    price: 49.99,
    description: 'Another cool product',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVkFle0SZjuNH2wORYyOyJdSrlESccIG0jQ&usqp=CAU'
  },
  // Add more dummy products here
];

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private http: HttpClient) {
  }

  fetch(category = ''): Observable<Product[]> {
    let url = 'https://fakestoreapi.com/products';
    if (category) {
      url = 'https://fakestoreapi.com/products'
    }

    return this.http.get(url).pipe(
      map((products: any[]) => products.map(p => ({
        id: p.id,
        name: p.title,
        price: p.price,
        description: p.description,
        imageUrl: p.image
      }) as Product)));
  }


}
