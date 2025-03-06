import { CircleMinus, Edit, EllipsisVertical, Plus, Soup } from 'lucide-react';
import CategoryAddModal from './Widgets/CategoryAddModa';
import AddMenu from './Widgets/AddMenu';
import DeleteConfirmationModal from '../../components/Base/DeleteConfirmationModal';
import { useEffect, useRef, useState } from 'react';
import apiService from '../../services/apiService';

const DEFAULT_IMAGE = '/placeholder.webp'; // Ensure this image is in your public folder
const CSRF_TOKEN =
  'j2O7Gir5vVNbh6Lskm7xSOnduer9y7w150MdoBSwmf1cSmFpzJaScTZLnPoqqWko'; // Replace with your actual CSRF token

function Menu() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [openCategoryId, setOpenCategoryId] = useState(null); // Track dropdown open state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const modalRef = useRef(null);

  // Fetch categories (using response.results)
  const fetchCategories = async () => {
    try {
      const response = await apiService.get('/products/admin/categories/');
      console.log(response);
      const updatedCategories = response.results.map((category) => ({
        ...category,
        image: category.image || DEFAULT_IMAGE,
      }));
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await apiService.get('/products/admin/products/');
      console.log(response);
      setProducts(response.results);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };

  // Handle broken image: replace with default
  const handleImageError = (event) => {
    event.target.src = DEFAULT_IMAGE;
    event.target.onerror = null;
  };

  // CRUD Operation: Create or Update Category using multipart/form-data
  const handleSaveCategory = async (formData, categoryId) => {
    try {
      if (categoryId) {
        // Update existing category using PATCH
        await apiService.patch(
          `/products/categories/${categoryId}/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'X-CSRFToken': CSRF_TOKEN,
            },
          }
        );
        console.log(`Updated Category ID: ${categoryId}`);
      } else {
        // Create new category using POST
        await apiService.post('/products/categories/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': CSRF_TOKEN,
          },
        });
        console.log('New Category Created');
      }
      fetchCategories(); // Refresh list
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  // CRUD Operation: Delete Category
  const handleDeleteCategory = async (categoryId) => {
    try {
      await apiService.delete(`/products/categories/${categoryId}/`, {
        headers: { 'X-CSRFToken': CSRF_TOKEN },
      });
      console.log(`Deleted Category ID: ${categoryId}`);
      fetchCategories(); // Refresh list
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
      await fetchProducts();
      setLoading(false);
    };
    fetchData();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenCategoryId(null);
      }
    }
    if (openCategoryId !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openCategoryId]);

  return (
    <>
      <div className="flex justify-between h-full">
        {/* Main Section */}
        <div className="h-full w-full flex justify-center items-center">
          <div className="flex flex-col items-center gap-6 w-[316px]">
            {loading ? (
              <div>Loading...</div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center gap-6">
                <div className="rounded-full size-[72px] bg-white flex justify-center items-center">
                  <Soup size={24} />
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <span>Hech narsa topilmadi</span>
                  <span>Bu yerda tanlangan kategoriyadagi ovqatlar turadi</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 bg-gray-100 rounded-lg flex justify-between"
                  >
                    <span>{product.name}</span>
                    <span>{product.price} UZS</span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setIsMenuModalOpen(true)}
              className="bg-primary-green !text-white px-4 py-2 rounded-lg hover:bg-primary-green/80 cursor-pointer flex items-center gap-2 w-fit"
            >
              <Plus className="mb-1" />
              Ovqat qo'shish
            </button>
          </div>
        </div>

        {/* Right Sidebar - Categories List */}
        <div className="w-[345px] h-full bg-white p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <span className="text-lg font-semibold">Категории</span>
              <button
                onClick={() => {
                  setEditingCategory(null);
                  setIsCategoryModalOpen(true);
                }}
                className="bg-primary-green/10 !text-primary-green p-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus size={16} />
                Добавить категорию
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {loading ? (
                <div>Loading categories...</div>
              ) : categories.length === 0 ? (
                <span>Hech qanday kategoriya topilmadi</span>
              ) : (
                categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex flex-col gap-4 p-2 rounded-md border border-primary-bg relative"
                  >
                    <img
                      className="h-[97px] w-[271px] object-cover rounded-md"
                      src={category.image}
                      alt={category.name}
                      onError={handleImageError}
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{category.name}</span>
                      <EllipsisVertical
                        onClick={() =>
                          setOpenCategoryId((prev) =>
                            prev === category.id ? null : category.id
                          )
                        }
                        className="cursor-pointer"
                        size={16}
                      />
                    </div>
                    {/* Dropdown modal for edit & delete */}
                    {openCategoryId === category.id && (
                      <div
                        ref={modalRef}
                        className="absolute bottom-0 right-0 min-w-[120px] bg-white shadow-md p-1 rounded-md flex flex-col gap-1 z-10"
                      >
                        <div
                          className="flex items-center gap-2 text-sm hover:bg-primary-bg p-2 rounded-md cursor-pointer"
                          onClick={() => {
                            setEditingCategory(category);
                            setIsCategoryModalOpen(true);
                            setOpenCategoryId(null);
                          }}
                        >
                          <Edit size={20} /> Tahrirlash
                        </div>
                        <div
                          className="flex items-center gap-2 text-sm hover:bg-primary-bg text-red-500 font-semibold p-2 rounded-md cursor-pointer"
                          onClick={() => {
                            setDeleteCategoryId(category.id);
                            setIsDeleteModalOpen(true);
                            setOpenCategoryId(null);
                          }}
                        >
                          <CircleMinus size={20} /> O'chirish
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Modals */}
        <CategoryAddModal
          isCategoryOpen={isCategoryModalOpen}
          onCategoryClose={() => {
            setIsCategoryModalOpen(false);
            setEditingCategory(null);
          }}
          editingCategory={editingCategory}
          onSave={handleSaveCategory}
        />
        <AddMenu
          isMenuOpen={isMenuModalOpen}
          onMenuClose={() => setIsMenuModalOpen(false)}
        />
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeleteCategoryId(null);
          }}
          onConfirm={(id) => {
            handleDeleteCategory(id);
            setIsDeleteModalOpen(false);
            setDeleteCategoryId(null);
          }}
          categoryId={deleteCategoryId}
          title={`Rostdan ham ushbu kategoriyani o'chirmoqchimisiz? Kategoriya ID: ${deleteCategoryId}`}
        />
      )}
    </>
  );
}

export default Menu;
