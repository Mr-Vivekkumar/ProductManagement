import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  newProductForm!: FormGroup;
  editingProductForm!: FormGroup;
  editingProduct: any = null;
  categories: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  totalProducts: number = 0;
  // Make environment available to the template
  readonly env = environment;

  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);
environment: any;

  ngOnInit(): void {
    this.initForms();
    this.loadInitialData();
  }

  initForms(): void {
    this.newProductForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      image: [null, Validators.required],
    });

    this.editingProductForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      image: [null],
    });
  }

  loadInitialData(): void {
    this.getProducts();
    this.getCategories();
    this.getTotalProducts();
  }

  getProducts(
    page: number = this.currentPage,
    pageSize: number = this.pageSize
  ): void {
    this.apiService.getProducts(page, pageSize).subscribe(
      (data: any) => {
        this.products = data;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  getCategories(): void {
    this.apiService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  getTotalProducts(): void {
    this.apiService.getTotalProducts().subscribe(
      (data: any) => {
        this.totalProducts = data.total;
      },
      (error: any) => {
        console.error('Error fetching total products:', error);
        this.toastr.error(error.error.message, 'Error');
      }
    );
  }

  createProduct(): void {
    if (this.newProductForm.invalid) return;

    const formData = new FormData();
    formData.append('name', this.newProductForm.value.name);
    formData.append('price', this.newProductForm.value.price.toString());
    formData.append('category_id', this.newProductForm.value.categoryId);
    formData.append('image', this.newProductForm.value.image);

    this.apiService.createProduct(formData).subscribe(
      (response) => {
        console.log('Product created:', response);
        this.getProducts();
        this.newProductForm.reset();
      },
      (error) => {
        console.error('Error creating product:', error);
      }
    );
  }

  editProduct(product: any): void {
    this.editingProduct = { ...product };

    this.editingProductForm.patchValue({
      name: product.name,
      price: product.price,
      categoryId: product.category_id,
    });
  }

  updateProduct(): void {
    if (!this.editingProduct || this.editingProductForm.invalid) return;

    const formData = new FormData();
    formData.append('name', this.editingProductForm.value.name);
    formData.append('price', this.editingProductForm.value.price.toString());
    formData.append('category_id', this.editingProductForm.value.categoryId);

    if (this.editingProductForm.value.image) {
      formData.append('image', this.editingProductForm.value.image);
    }

    this.apiService.updateProduct(this.editingProduct.id, formData).subscribe(
      (response) => {
        console.log('Product updated:', response);
        this.getProducts();
        this.cancelEdit();
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }

  deleteProduct(productId: number): void {
    this.apiService.deleteProduct(productId).subscribe(
      (response) => {
        console.log('Product deleted:', response);
        this.getProducts();
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  cancelEdit(): void {
    this.editingProduct = null;
    this.editingProductForm.reset();
  }

  navigatePage(page: number): void {
    if (page > 0) {
      this.currentPage = page;
      this.getProducts();
    }
  }

  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.totalProducts / this.pageSize);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  onFileChange(event: any, isEdit: boolean = false): void {
    const file = event.target.files[0];
    if (file) {
      if (isEdit) {
        this.editingProductForm.patchValue({ image: file });
      } else {
        this.newProductForm.patchValue({ image: file });
      }
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.newProductForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.products.sort((a, b) => {
      if (a[column] < b[column]) return this.sortDirection === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
  downloadReport(type: 'csv' | 'xlsx') {
    const download$ =
      type === 'csv'
        ? this.apiService.downloadCSVReport()
        : this.apiService.downloadXLSXReport();

    download$.subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `products-report.${type}`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
