import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from '../../service/product.service';
import { OrderService } from '../../service/order.service';
import { Product } from '../../model/product';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [MatCardModule, MatTableModule, CurrencyPipe, CommonModule, MatFormFieldModule, MatInputModule,
    FormsModule, MatButtonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  products!: Product[]
  displayedColumns: string[] = ['product', 'cost', 'quantity'];
  ordenTemp: any[] = []

  constructor(private productService: ProductService, private orderService: OrderService) {
    this.products = productService.products
    for (let index = 0; index < this.products?.length; index++) {
      this.ordenTemp.push({ product: this.products[index], quantity: 1 })
    }
    console.log(this.ordenTemp);

  }

  getTotalCost() {
    if (this.ordenTemp?.length > 0) {
      return this.ordenTemp.map(t => t.product.precio * t.quantity).reduce((acc, value) => acc + value, 0);
    } else {
      return 0
    }
  }

  makePayment() {
    Swal.fire({
      title: "Are you sure to make the payment for $" + Number(this.getTotalCost().toFixed(2)) + "?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, pay the order!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Paid!",
          text: "Your order has been paid.",
          icon: "success"
        });
      }
    });
  }
}
