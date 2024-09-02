import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
import { MatBadgeModule } from '@angular/material/badge';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [MatCardModule, MatGridListModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
    FormsModule, MatBadgeModule, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {

  products!: Product[]
  quantity: number = 1
  public openMenu: boolean = false;
  isOver = false;
  productList: Product[] = []

  constructor(private productService: ProductService) {
    productService.getAllProducts().subscribe(data => {
      this.products = data
    })
  }

  addToCart(product: Product) {
    if (this.productList.length == 0) {
      this.productList.push(product)
    } else {
      const result = this.productList.find(p => p.id === product.id);
      if (result == undefined) {
        this.productList.push(product)
      }
    }
    this.productService.setProducts(this.productList)
  }

  verImagen(product: Product) {
    Swal.fire({
      title: product.nombre,
      text: product.descripcion,
      imageUrl: product.image,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image"
    });
  }

  clickMenu() {
    this.openMenu = !this.openMenu;
  }
}
