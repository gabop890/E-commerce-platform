import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatDialogModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.css'
})
export class CategoryDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CategoryDialogComponent>);
  categoryForm!: FormGroup

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService) {
    this.createCategoryForm()
    this.categoryForm.patchValue(data)
  }

  createCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  add() {
    if (this.categoryForm.valid) {
      if (this.data) {
        this.categoryService.updateCategory(this.data.id, this.categoryForm.value).subscribe(data => {
          this.dialogRef.close(true)
        })
      } else {
        this.categoryService.addNewCategory(this.categoryForm.value).subscribe(val => {
          if (val.success == true) {
            this.dialogRef.close(true)
          } else {

          }
        })
      }
    } else {
      return Object.values(this.categoryForm.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }
  }
}
