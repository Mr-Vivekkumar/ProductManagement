import { FormsModule } from '@angular/forms';
import { ApiService } from './../api.service';
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  newCategoryName: string = '';
  editingCategory: any = null; // For storing the category being edited
  private api = inject(ApiService);
  private toastr = inject(ToastrService);

  ngOnInit() {
    this.loadCategories();
  }

  // Load all categories from the server
  loadCategories() {
    this.api.getCategories().subscribe(
      (res) => {
        this.categories = res;
      },
      (err) => {
        console.error('Error loading categories:', err);
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  // Create a new category
  createCategory() {
    if (!this.newCategoryName) return;

    const newCategory = {
      name: this.newCategoryName,
    };

    this.api.createCategory(newCategory).subscribe(
      (res) => {
        this.categories = res.data; // Update array to trigger change detection
        console.log('res', this.categories);
        this.newCategoryName = ''; // Reset input field
        this.toastr.success('Category added successfully!', 'success');
      },
      (err) => {
        console.error('Error creating category:', err);
        this.toastr.error(err.message, 'error');
      }
    );
  }

  // Edit an existing category
  editCategory(category: any) {
    console.log('Editing category:', category);
    this.editingCategory = { ...category }; // Create a copy of the category to edit
  }

  // Update an existing category
  updateCategory() {
    if (!this.editingCategory?.name) return;
    this.api
      .updateCategory(this.editingCategory.id, this.editingCategory)
      .subscribe(
        (res) => {
          const index = this.categories.findIndex(
            (cat) => cat.id === this.editingCategory.id
          );
          if (index !== -1) {
            Object.assign(this.categories[index], res); // Update the category in the list
          }
          this.closeEditModal(); // Close the edit modal
          this.toastr.success('Updated SucessFully...', 'success');
        },
        (err) => {
          console.error('Error updating category:', err);
          this.toastr.error(err.error.message, 'Error');
        }
      );
  }

  // Delete a category
  deleteCategory(categoryId: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.api.deleteCategory(categoryId).subscribe(
        () => {
          this.categories = this.categories.filter(
            (cat) => cat.id !== categoryId
          );
          this.toastr.success('Deleted SucessFully...', 'success');
        },
        (err) => {
          console.error('Error deleting category:', err);
          this.toastr.error(err.error.message, 'Error');
        }
      );
    }
  }

  // Close the edit modal
  closeEditModal() {
    this.editingCategory = null;
  }
}
