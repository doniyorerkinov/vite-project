'use client';

import { useState } from 'react';
import Modal from '../../components/Base/Modal';

const ClientEdit = ({ isOpen, onClose, client = {}, onSave }) => {
  const [formData, setFormData] = useState({
    name: client?.name || '',
    birthDate: client?.birthDate || '',
    phone: client?.phone || '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Имя клиента обязательно';
    if (!formData.birthDate) newErrors.birthDate = 'Дата рождения обязательна';
    if (!formData.phone) newErrors.phone = 'Номер телефона обязателен';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Добавить клиента"
      width="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1">
            Имя клиента <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Birth Date */}
        <div>
          <label className="block mb-1">
            Дата рождения <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.birthDate && (
            <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1">
            Номер телефона <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <div className="relative">
              <select
                className="appearance-none h-full rounded-l border-r-0 border p-2 pr-8 bg-white"
                defaultValue="+998"
              >
                <option value="+998">+998</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="flex-grow rounded-r border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="(90) 123-45-67"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Отменить
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-red-700 !text-white rounded hover:bg-red-800"
          >
            Сохранить
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ClientEdit;
