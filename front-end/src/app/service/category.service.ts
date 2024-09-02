import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  private urlBackend: string = "http://localhost:8080/category"

  getAllCategory() {
    return this.http.get<Category[]>(this.urlBackend + '/allcategory')
  }

  addNewCategory(category: Category): Observable<any> {
    return this.http.post(this.urlBackend + '/save', category)
  }

  updateCategory(codigo: number, categoryTemp: Category) {
    return this.http.put(this.urlBackend + `/update/${codigo}`, categoryTemp)
  }
}
