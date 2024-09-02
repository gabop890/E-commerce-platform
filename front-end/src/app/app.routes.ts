import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { OrderComponent } from './components/order/order.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { CategoryManagementComponent } from './components/category-management/category-management.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: SidenavComponent, children: [
      { path: 'catalog', component: CatalogComponent },
      { path: 'order', component: OrderComponent },
      { path: 'productManagement', component: ProductManagementComponent },
      { path: 'categoryManagement', component: CategoryManagementComponent }
    ]
  }
];
