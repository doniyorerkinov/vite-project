import { create } from 'zustand';

import apiService from '../services/apiService'; // adjust the path as needed

const DEFAULT_IMAGE = '/placeholder.webp';

export const useMenuStore = create((set, get) => ({
  categories: [],
  products: [],
  loading: false,

  // Fetch categories from the backend and update state
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

  // Fetch products from the backend and update state
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

  // Delete a category and then refresh the categories list
  deleteCategory: async (categoryId) => {
    try {
      await apiService.delete(`/products/categories/${categoryId}/`);
      console.log(`Deleted Category ID: ${categoryId}`);
      // Refresh categories after deletion
      await get().fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  },
}));
