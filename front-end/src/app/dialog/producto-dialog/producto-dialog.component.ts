import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Category } from '../../model/category';
import { CategoryService } from '../../service/category.service';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-producto-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatDialogModule, MatInputModule, MatButtonModule, ReactiveFormsModule,
    MatSelectModule, FormsModule],
  templateUrl: './producto-dialog.component.html',
  styleUrl: './producto-dialog.component.css'
})
export class ProductoDialogComponent {

  readonly dialogRef = inject(MatDialogRef<ProductoDialogComponent>);
  productForm!: FormGroup
  categories!: Category[]

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService) {
    this.createProductForm()
    categoryService.getAllCategory().subscribe(data => {
      this.categories = data
    })
    this.productForm.patchValue(data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  add() {
    if (this.productForm.valid) {
      if (this.data) {
        this.productService.updateProduct(this.data.id, this.productForm.value).subscribe(data => {
          this.dialogRef.close(true)
        })
      } else {
        console.log(this.productForm.value);

        this.productService.addNewProduct(this.productForm.value).subscribe(val => {
          if (val.success == true) {
            this.dialogRef.close(true)
          } else {

          }
        })
      }
    } else {
      return Object.values(this.productForm.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }
  }

  createProductForm() {
    this.productForm = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required],
      categoria: ['', Validators.required],
      image: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
  }
}
