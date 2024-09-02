import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product } from '../../model/product';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductoDialogComponent } from '../../dialog/producto-dialog/producto-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatTableModule, MatIconModule, MatSlideToggleModule, MatPaginatorModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css',
})
export class ProductManagementComponent {
  productData: Product[] = [];
  dataSource = new MatTableDataSource<Product>
  columnsToDisplay = ['id', 'nombre', 'precio', 'cantidad', 'estado', 'image', 'descripcion', 'actions'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand', 'actions'];
  expandedProduct!: Product
  readonly dialog = inject(MatDialog);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService) {
    this.getAllProducts()
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(data => {
      if (data) {
        this.productData = data
        this.dataSource = new MatTableDataSource<Product>(this.productData)
        this.dataSource.paginator = this.paginator
      }
    })
  }

  addProduct(){
    const dialogRef = this.dialog.open(ProductoDialogComponent)
    dialogRef.afterClosed().subscribe(result =>{
      this.getAllProducts()
    })
  }

  editProduct(data: any){
    const dialogRef = this.dialog.open(ProductoDialogComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllProducts();
        }
      },
    });
  }

  onChangeStatus(estado: boolean, codigo: number) {
    let productTemp: Product = new Product();
    productTemp.estado = estado;
    this.productService.updateProduct(codigo, productTemp).subscribe({
      next: (val: any) => {

        this.getAllProducts();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
