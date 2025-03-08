import { useState, useEffect } from 'react';
import { Soup } from 'lucide-react';
import apiService from '../../../services/apiService';
import Modal from '../../../components/Base/Modal';
import { useMenuStore } from '../../../store/menuStore';

function CategoryAddModal({
  isCategoryOpen,
  onCategoryClose,
  editingCategory = null,
}) {
  const { fetchCategories } = useMenuStore();

  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Reset form fields when modal opens or when editing changes
  useEffect(() => {
    if (isCategoryOpen) {
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
  }, [editingCategory, isCategoryOpen]);

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

  // Cleanup preview URL on unmount or when preview changes
  useEffect(() => {
    return () => {
      if (previewUrl && typeof previewUrl === 'string') {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSubmit = async (event) => {
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
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } else {
        await apiService.post('/products/categories/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      fetchCategories();
      setName('');
      setImage(null);
      setPreviewUrl(null);
      onCategoryClose();
    } catch (err) {
      console.error('Error saving category:', err);
      setError("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isCategoryOpen}
      onClose={onCategoryClose}
      title={editingCategory ? 'Kategoriya tahrirlash' : "Kategoriya qo'shish"}
      className="p-10"
      width="max-w-lg min-w-[635px]"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Image Upload Section */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            Kategoriyaga rasm biriktirish *
          </label>
          <div className="relative w-full h-[167px] min-w-[555px] bg-gray-100 rounded-md ">
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
            {/* Force re-mounting file input with key */}
            <input
              key={previewUrl || 'initial'} // Use previewUrl or a static key
              id="image-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="image-upload"
              className="absolute inset-0 cursor-pointer"
            ></label>
            {previewUrl && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => {
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
            onClick={onCategoryClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-md"
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-md disabled:opacity-50"
          >
            {isSubmitting
              ? 'Loading...'
              : editingCategory
                ? 'Yangilash'
                : "Qo'shish"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CategoryAddModal;
