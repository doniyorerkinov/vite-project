import { create } from 'zustand';
import apiService from '../services/apiService';

const DEFAULT_IMAGE = '/placeholder.webp';

export const useMenuStore = create((set, get) => ({
  categories: [],
  products: [],
  loading: false,

  // Categories
  fetchCategories: async () => {
    set({ loading: true });
    try {
      const response = await apiService.get('/products/admin/categories/');
      const updatedCategories = response.results.map((category) => ({
        ...category,
        image: category.image || DEFAULT_IMAGE,
      }));
      set({ categories: updatedCategories });
    } catch (error) {
      console.error('Error fetching categories:', error);
      set({ categories: [] });
    } finally {
      set({ loading: false });
    }
  },

  // Products
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await apiService.get('/products/admin/products/');
      set({ products: response.results });
    } catch (error) {
      console.error('Error fetching products:', error);
      set({ products: [] });
    } finally {
      set({ loading: false });
    }
  },

  // Delete category (existing code)
  deleteCategory: async (categoryId) => {
    try {
      await apiService.delete(`/products/categories/${categoryId}/`);
      await get().fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  },

  // Product CRUD actions
  addProduct: async (productData) => {
    try {
      await apiService.post('/products/', productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await get().fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  },

  updateProduct: async (productId, productData) => {
    try {
      await apiService.patch(`/products/${productId}/`, productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await get().fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  },

  deleteProduct: async (productId) => {
    try {
      await apiService.delete(`/products/${productId}/`);
      await get().fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  },
}));
