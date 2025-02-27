"use client"

import { useState } from "react"
import Modal from "../../components/Base/Modal"

const EmployeeEdit = ({ isOpen, onClose, employee = {}, onSave }) => {
  const [formData, setFormData] = useState({
    name: employee?.name || "",
    password: "",
    role: employee?.role || "",
    birthDate: employee?.birthDate || "",
    phone: employee?.phone || "",
    photo: null,
  })
  const [errors, setErrors] = useState({})
  const [photoPreview, setPhotoPreview] = useState(employee?.photoUrl || null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setErrors({
        ...errors,
        photo: "Файл слишком большой. Максимальный размер 50 МБ.",
      })
      return
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png"]
    if (!validTypes.includes(file.type)) {
      setErrors({
        ...errors,
        photo: "Неверный формат файла. Разрешены только .jpeg, .jpg, .png",
      })
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setPhotoPreview(reader.result)
    }
    reader.readAsDataURL(file)

    setFormData({
      ...formData,
      photo: file,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name) newErrors.name = "Имя сотрудника обязательно"
    if (!formData.password) newErrors.password = "Пароль обязателен"
    if (!formData.role) newErrors.role = "Роль обязательна"
    if (formData.role && isNaN(Number(formData.role))) {
      newErrors.role = 'role must be a "number" type, but the final value was: NaN (cast from the value "")'
    }
    if (!formData.birthDate) newErrors.birthDate = "Дата рождения обязательна"
    if (!formData.phone) newErrors.phone = "Номер телефона обязателен"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSave(formData)
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Добавить сотрудника" width="max-w-lg">
      <form onSubmit={handleSubmit}>
        {/* Photo upload */}
        <div className="mb-4">
          <label className="block mb-2">
            Добавьте фотографию новости <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col items-center">
            <div
              className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-2 cursor-pointer"
              onClick={() => document.getElementById("photo-upload").click()}
            >
              {photoPreview ? (
                <img
                  src={photoPreview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
            </div>
            <p className="text-xs text-gray-500 text-center">Макс. размер файла 50 МБ. Форматы: .jpeg, .jpg, .png</p>
            <input
              type="file"
              id="photo-upload"
              className="hidden"
              accept=".jpg,.jpeg,.png"
              onChange={handlePhotoChange}
            />
            <button
              type="button"
              className="mt-2 px-3 py-1 bg-primary-green text-primary-green-1a text-sm rounded hover:bg-gray-200"
              onClick={() => document.getElementById("photo-upload").click()}
            >
              Добавить
            </button>
            {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo}</p>}
          </div>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-2">
            Имя сотрудника <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите имя сотрудника"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-2">
            Пароль <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block mb-2">
            Роль <span className="text-red-500">*</span>
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Выберите роль</option>
            <option value="1">Администратор</option>
            <option value="2">Менеджер</option>
            <option value="3">Сотрудник</option>
          </select>
          {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
        </div>

        {/* Birth Date */}
        <div className="mb-4">
          <label className="block mb-2">
            Дата рождения <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            placeholder="MM/DD/YYYY"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block mb-2">
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
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
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
              placeholder="Введите номер телефона"
            />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Отменить
          </button>
          <button type="submit" className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800">
            Добавить
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default EmployeeEdit

