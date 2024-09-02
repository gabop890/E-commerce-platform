import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products!: Product[]

  constructor(private http: HttpClient) { }

  private urlBackend: string = "http://localhost:8080/producto"

  getAllProducts() {
    return this.http.get<Product[]>(this.urlBackend + '/allproductos')
  }

  updateProduct(id: number, product: Product) {
    return this.http.put(this.urlBackend + `/update/${id}`, product)
  }

  addNewProduct(productForm: Product): Observable<any> {
    return this.http.post(this.urlBackend + '/save', productForm)
  }

  setProducts(productList: Product[]){
    this.products = productList
  }
}
