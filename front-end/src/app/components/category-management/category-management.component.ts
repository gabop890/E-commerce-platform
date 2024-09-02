import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Category } from '../../model/category';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CategoryService } from '../../service/category.service';
import { CategoryDialogComponent } from '../../dialog/category-dialog/category-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatTableModule, MatIconModule, MatPaginatorModule, MatSlideToggleModule],
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.css'
})
export class CategoryManagementComponent {

  displayedColumns: string[] = ['id', 'nombre', 'estado', 'acciones'];
  categoryData: Category[] = [];
  dataSource = new MatTableDataSource<Category>
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private categoryServices: CategoryService) {
    this.getAllCategory()
  }

  addCategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getAllCategory()
    })
  }

  getAllCategory() {
    this.categoryServices.getAllCategory().subscribe(data => {
      if (data) {
        this.categoryData = data
        this.dataSource = new MatTableDataSource<Category>(this.categoryData)
        this.dataSource.paginator = this.paginator
      }
    })
  }

  startEdit(data: any) {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllCategory();
        }
      },
    });
  }

  onChangeStatus(estado: boolean, codigo: number) {
    let categoryTemp: Category = new Category();
    categoryTemp.estado = estado;
    this.categoryServices.updateCategory(codigo, categoryTemp).subscribe({
      next: (val: any) => {

        this.getAllCategory();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
