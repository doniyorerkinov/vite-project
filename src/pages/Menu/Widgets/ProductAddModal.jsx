import { useState, useEffect } from 'react';
import { Modal, Input, InputNumber, Select, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Soup } from 'lucide-react';
import { useMenuStore } from '../../../store/menuStore';

const { Option } = Select;

function ProductAddModal({ isOpen, onClose, editingProduct = null }) {
  const { categories, addProduct, updateProduct } = useMenuStore();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Reset form fields when modal opens or editing changes
  useEffect(() => {
    if (isOpen) {
      if (editingProduct) {
        setName(editingProduct.name || '');
        setPrice(editingProduct.price || null);
        setSelectedCategory(editingProduct.category?.id || null);
        setPreviewUrl(editingProduct.image || null);
        setImage(null);
      } else {
        setName('');
        setPrice(null);
        setSelectedCategory(null);
        setImage(null);
        setPreviewUrl(null);
      }
      setError('');
      setIsSubmitting(false);
    }
  }, [editingProduct, isOpen]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert("Fayl formati faqat JPG, PNG yoki WEBP bo'lishi kerak.");
      return;
    }
    // Validate file size (max 5MB)
    if (file.size > 5242880) {
      alert("Fayl o'lchami 5MB dan katta bo'lishi kerak emas.");
      return;
    }
    setImage(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  useEffect(() => {
    return () => {
      if (previewUrl && typeof previewUrl === 'string') {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    if (selectedCategory) {
      formData.append('category', selectedCategory);
    }
    if (image) {
      formData.append('image', image);
    }
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await addProduct(formData);
      }
      onClose();
    } catch (err) {
      console.error('Error saving product:', err);
      setError("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title={editingProduct ? 'Mahsulotni tahrirlash' : "Mahsulot qo'shish"}
      visible={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Bekor qilish
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isSubmitting}
          onClick={handleSubmit}
        >
          {editingProduct ? 'Yangilash' : "Qo'shish"}
        </Button>,
      ]}
    >
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <div style={{ marginBottom: 16 }}>
        <label style={{ marginBottom: 4, display: 'block' }}>
          Mahsulot nomi
        </label>
        <Input
          placeholder="Mahsulot nomini kiriting"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ marginBottom: 4, display: 'block' }}>Narxi (UZS)</label>
        <InputNumber
          style={{ width: '100%' }}
          placeholder="Narxini kiriting"
          value={price}
          onChange={(value) => setPrice(value)}
          min={0}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ marginBottom: 4, display: 'block' }}>
          Kategoriya tanlang
        </label>
        <Select
          placeholder="Kategoriya tanlang"
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}
          style={{ width: '100%' }}
          allowClear
        >
          {categories.map((cat) => (
            <Option key={cat.id} value={cat.id}>
              {cat.name}
            </Option>
          ))}
        </Select>
      </div>
      {/* Old Image Upload Logic */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ marginBottom: 4, display: 'block' }}>
          Mahsulot uchun rasm
        </label>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '167px',
            backgroundColor: '#f3f3f3',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Uploaded Preview"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                padding: '1.5rem 0',
                color: '#999',
              }}
            >
              <Soup style={{ width: 40, height: 40, marginBottom: 8 }} />
              <span>File maksimal o'lchami 5mb</span>
              <span>Format: .jpeg, .jpg, .png, .webp</span>
            </div>
          )}
          <input
            key={previewUrl || 'initial'}
            id="product-image-upload"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0,
              zIndex: 9999,
              width: '100%',
              height: '100%',
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <label
            htmlFor="product-image-upload"
            style={{
              position: 'absolute',
              inset: 0,
              cursor: 'pointer',
              zIndex: 9998,
            }}
            onClick={(e) => e.stopPropagation()}
          ></label>
          {previewUrl && (
            <Button
              type="primary"
              danger
              size="small"
              style={{ position: 'absolute', top: 8, right: 8 }}
              onClick={() => {
                setImage(null);
                setPreviewUrl(null);
              }}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ProductAddModal;
