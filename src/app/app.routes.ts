import { ProductsComponent } from './products/products.component';
import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';

import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard], // ✅ Apply Auth Guard
    children: [
      { path: '', component: CategoriesComponent },

      { path: 'categories', component: CategoriesComponent },
      { path: 'products', component: ProductsComponent },
    ],
  },
];
