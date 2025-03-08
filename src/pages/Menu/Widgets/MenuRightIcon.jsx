import { LayoutGrid, Plus, Soup } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Modal from '../../../components/Base/Modal';
import AddMenu from './AddMenu';
import apiService from '../../../services/apiService';
import { useMenuStore } from '../../../store/menuStore';

function MenuRightIcon() {
  // Popup states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  // States for Category form (inline instead of separate component)
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const modalRef = useRef(null);

  // Use the store action to refresh categories
  const { fetchCategories } = useMenuStore();

  // Close the parent popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !isCategoryModalOpen
      ) {
        setIsModalOpen(false);
      }
    }

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen, isCategoryModalOpen]);

  // Reset form fields when the Category Modal opens or when editing changes
  useEffect(() => {
    if (isCategoryModalOpen) {
      if (editingCategory) {
        setName(editingCategory.name || '');
        setImage(null);
        setPreviewUrl(editingCategory.image || null);
      } else {
        setName('');
        setImage(null);
        setPreviewUrl(null);
      }
      setError('');
      setIsSubmitting(false);
    }
  }, [editingCategory, isCategoryModalOpen]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert("Fayl formati faqat JPG, PNG yoki WEBP bo'lishi kerak.");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size / (1024 * 1024) > 10) {
      alert("Fayl o'lchami 10MB dan katta bo'lishi kerak emas.");
      return;
    }
    setImage(file);

    // Create and set preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  // Clean up preview URL on unmount or when preview changes
  useEffect(() => {
    return () => {
      if (previewUrl && typeof previewUrl === 'string') {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleCategorySubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData();
    formData.append('name', name);
    if (image) {
      formData.append('image', image);
    }

    const categoryId = editingCategory ? editingCategory.id : null;

    try {
      if (categoryId) {
        await apiService.patch(
          `/products/categories/${categoryId}/`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );
      } else {
        await apiService.post('/products/categories/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      // Refresh categories using the store action
      fetchCategories();
      setName('');
      setImage(null);
      setPreviewUrl(null);
      setIsCategoryModalOpen(false);
    } catch (err) {
      console.error('Error saving category:', err);
      setError("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Icon triggering the popup */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="p-2 rounded-full hover:bg-gray-200 cursor-pointer transition-colors delay-100"
      >
        <Plus size={16} className="mx-auto" />
      </div>

      {/* Popup Menu */}
      {isModalOpen && (
        <div
          ref={modalRef}
          className="absolute top-3 left-4 min-w-50 bg-white shadow-md p-1 rounded-md flex flex-col gap-1"
        >
          <div
            onClick={() => {
              setIsCategoryModalOpen(true);
            }}
            className="flex items-center gap-4 text-sm hover:bg-primary-bg p-2 rounded-md"
          >
            <LayoutGrid size={20} /> Kategoriya qo'shish
          </div>
          <div
            onClick={() => {
              setIsMenuModalOpen(true);
              setIsModalOpen(false); // close popup when opening modal
            }}
            className="flex items-center gap-4 text-sm hover:bg-primary-bg p-2 rounded-md"
          >
            <Soup size={20} /> Tovar qo'shish
          </div>
        </div>
      )}

      {/* Inline Category Modal */}
      {isCategoryModalOpen && (
        <Modal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          title={
            editingCategory ? 'Kategoriya tahrirlash' : "Kategoriya qo'shish"
          }
          className="p-10"
          width="max-w-lg min-w-[635px]"
        >
          {/* Prevent clicks inside modal content from closing the modal */}
          <div onClick={(e) => e.stopPropagation()}>
            <form
              onSubmit={handleCategorySubmit}
              className="flex flex-col gap-6"
            >
              {/* Image Upload Section */}
              <div className="relative w-full h-[167px] min-w-[555px] bg-gray-100 rounded-md">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Uploaded Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full py-6 text-sm text-gray-600">
                    <Soup className="text-gray-500 w-10 h-10 mb-4" />
                    <span>File maksimal o'lchami 10mb</span>
                    <span>Format: .jpeg, .jpg, .png, .webp</span>
                  </div>
                )}
                {/* File Input: absolutely positioned and invisible */}
                <input
                  key={previewUrl || 'initial'}
                  id="image-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 z-[9999] w-full h-full"
                  onClick={(e) => e.stopPropagation()}
                />
                {/* Label overlay to trigger input */}
                <label
                  htmlFor="image-upload"
                  className="absolute inset-0 cursor-pointer z-[9998]"
                  onClick={(e) => e.stopPropagation()}
                ></label>
                {previewUrl && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImage(null);
                        setPreviewUrl(null);
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Kategoriya nomi</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Kategoriya nomini kiriting"
                  className="p-2 border rounded-md"
                  required
                />
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-md"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer bg-red-700 hover:bg-red-800 !text-white px-6 py-2 rounded-md disabled:opacity-50"
                >
                  {isSubmitting
                    ? 'Loading...'
                    : editingCategory
                      ? 'Yangilash'
                      : "Qo'shish"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* AddMenu modal remains unchanged */}
      <AddMenu
        isMenuOpen={isMenuModalOpen}
        onMenuClose={() => setIsMenuModalOpen(false)}
      />
    </div>
  );
}

export default MenuRightIcon;
