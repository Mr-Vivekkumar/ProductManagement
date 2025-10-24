import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:4000/api'; // Your API base URL
  constructor(private http: HttpClient) {}

  // Method for user registration
  registerUser(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, userData);
  }
  loginUser(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, userData);
  }
  // CRUD operations for Categories

  // Create category
  createCategory(categoryData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/categories/create`, categoryData);
  }

  // Get all categories
  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  // Update category
  updateCategory(
    categoryId: string,
    categoryData: { name: string }
  ): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/categories/${categoryId}`,
      categoryData
    );
  }

  // Delete category
  deleteCategory(categoryId: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categories/${categoryId}`);
  }

  // CRUD operations for Products

  // Create product
  createProduct(productData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/create`, productData);
  }

  // Get all products
  getProducts(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<any>(`${this.baseUrl}/products`, { params });
  }
  getTotalProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/pcount`);
  }
  
  // Get product by ID
  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/${productId}`);
  }
  // Update product
  updateProduct(productId: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${productId}`, formData);
  }

  // Delete product
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${productId}`);
  }

  downloadCSVReport(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/reports/csv`, {
      responseType: 'blob',
    });
  }

  downloadXLSXReport(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/reports/xlsx`, {
      responseType: 'blob',
    });
  }
}

