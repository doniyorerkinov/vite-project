import Modal from '../../../components/Base/Modal';
import { useState, useEffect } from 'react';
import { Soup, Upload } from 'lucide-react';

const DEFAULT_IMAGE = '/placeholder.webp';

function CategoryAddModal({
  isCategoryOpen,
  onCategoryClose,
  editingCategory,
  onSave,
}) {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill form fields if editing an existing category
  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name || '');
      setImage(null); // Force re-selection if desired
      // Show existing image if available; otherwise, leave preview null
      setPreviewUrl(editingCategory.image || null);
    } else {
      setName('');
      setImage(null);
      setPreviewUrl(null);
    }
    setError('');
    setIsSubmitting(false);
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

    // Validate file size (max 50MB as per design)
    const maxSize = 52428800; // 50MB in bytes
    if (file.size > maxSize) {
      alert("Fayl o'lchami 50MB dan katta bo'lishi kerak emas.");
      return;
    }
    setImage(file);

    // Create preview URL for the uploaded image
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  // Cleanup preview URL on unmount or when previewUrl changes
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

    // Create FormData for multipart/form-data upload
    const formData = new FormData();
    formData.append('name', name);
    if (image) {
      formData.append('image', image);
    }

    try {
      await onSave(formData, editingCategory ? editingCategory.id : null);
      setName('');
      setImage(null);
      setPreviewUrl(null);
      onCategoryClose();
    } catch (err) {
      setError("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isCategoryOpen}
      onClose={onCategoryClose}
      title="Kategoriya qo'shish"
      className="p-10"
      width="max-w-lg min-w-[635px]"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* New Image Upload Section */}
        <div className="flex flex-col gap-2 ">
          <label className="text-sm font-medium">
            Kategoriyaga rasm biriktirish *
          </label>
          <div className="relative w-full h-[167px] min-w-[555px] bg-gray-100 rounded-md overflow-hidden">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Uploaded Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full py-6 text-sm text-gray-600">
                <Soup className="text-gray-500 w-10 h-10 mb-4" />
                <span>File maksimal o'lchami 50mb</span>
                <span>Format: .jpeg, .jpg, .png, .webp</span>
              </div>
            )}
            {/* Hidden file input with full overlay to trigger file selection */}
            <input
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
            {/* Delete Button on Hover */}
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
            {isSubmitting ? 'Loading...' : "Qo'shish"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CategoryAddModal;
