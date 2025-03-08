import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, X } from 'lucide-react';

const BaseSelect = ({
  modelValue,
  data,
  placeholder = 'Select an option',
  label = '',
  id,
  labelId = '',
  multiple = false,
  errorText = '',
  onChange,
  onBlur,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState('bottom');

  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  const hasSelectedValue = multiple
    ? Array.isArray(modelValue) && modelValue.length > 0
    : !!modelValue;

  const displayText = multiple
    ? hasSelectedValue
      ? `${modelValue.length} selected`
      : placeholder
    : (data.find((option) => option.value === modelValue) || {}).text ||
      placeholder;

  const toggleDropdown = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (newIsOpen) {
      const index = data.findIndex((option) => option.value === modelValue);
      setActiveIndex(index);
    }
  };

  const selectOption = (option) => {
    if (multiple) {
      let newValue = Array.isArray(modelValue) ? [...modelValue] : [];
      const index = newValue.indexOf(option.value);
      if (index === -1) {
        newValue.push(option.value);
      } else {
        newValue.splice(index, 1);
      }
      onChange && onChange(newValue);
      onBlur && onBlur();
    } else {
      onChange && onChange(option.value);
      onBlur && onBlur();
      setIsOpen(false);
    }
  };

  const removeValue = (value) => {
    if (multiple && Array.isArray(modelValue)) {
      const newValue = modelValue.filter((v) => v !== value);
      onChange && onChange(newValue);
    }
  };

  const isSelected = (value) => {
    if (multiple) {
      return Array.isArray(modelValue) && modelValue.includes(value);
    }
    return modelValue === value;
  };

  const getOptionText = (value) => {
    const option = data.find((opt) => opt.value === value);
    return option ? option.text : '';
  };

  const updateDropdownPosition = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setDropdownPosition(
        spaceBelow < 100 && spaceAbove > spaceBelow ? 'top' : 'bottom'
      );
    }
  };

  const handleKeyDown = (event) => {
    if (!isOpen && event.key === 'Enter') {
      toggleDropdown();
      return;
    }
    if (isOpen) {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setActiveIndex((prev) => (prev + 1) % data.length);
          break;
        case 'ArrowUp':
          event.preventDefault();
          setActiveIndex((prev) => (prev - 1 + data.length) % data.length);
          break;
        case 'Enter':
          event.preventDefault();
          if (activeIndex !== -1 && data[activeIndex]) {
            selectOption(data[activeIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
        default:
          break;
      }
    }
  };

  // Update dropdown position when opened or when window resizes
  useEffect(() => {
    if (isOpen) {
      updateDropdownPosition();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => updateDropdownPosition();
    if (isOpen) {
      window.addEventListener('resize', handleResize);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target) &&
        isOpen
      ) {
        setIsOpen(false);
        onBlur && onBlur();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onBlur]);

  // Scroll active element into view when it changes
  useEffect(() => {
    if (activeIndex !== -1 && dropdownRef.current) {
      const activeElement = dropdownRef.current.querySelector(
        `#${id}-option-${activeIndex}`
      );
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeIndex, id]);

  return (
    <div ref={selectRef} id={`select_${id}`} className="relative w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div
        tabIndex="0"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={labelId}
        className={`relative w-full min-h-[36px] px-4 py-1 text-left bg-white border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
          !hasSelectedValue ? 'text-gray-500' : ''
        }`}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
      >
        {!multiple ? (
          <div className="flex items-center justify-between">
            <span>{displayText}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
            />
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2 pr-8">
            {hasSelectedValue ? (
              modelValue.map((value) => (
                <span
                  key={value}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {getOptionText(value)}
                  <X
                    onClick={(e) => {
                      e.stopPropagation();
                      removeValue(value);
                    }}
                    className="ml-1 h-3 w-3 text-blue-400 cursor-pointer hover:text-blue-600"
                  />
                </span>
              ))
            ) : (
              <span>{placeholder}</span>
            )}
            <ChevronDown
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        )}
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg ${
            dropdownPosition === 'top' ? 'bottom-full mb-1' : ''
          }`}
        >
          {data.length > 0 ? (
            <ul
              role="listbox"
              aria-labelledby={labelId}
              tabIndex="-1"
              className="max-h-60 rounded-md border border-gray-300 bg-white py-1 text-base shadow-sm overflow-auto focus:outline-none sm:text-sm"
            >
              {data.map((option, index) => (
                <li
                  key={option.value}
                  id={`${id}-option-${index}`}
                  role="option"
                  aria-selected={isSelected(option.value)}
                  onClick={() => selectOption(option)}
                  onMouseEnter={() => setActiveIndex(index)}
                  tabIndex="0"
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    isSelected(option.value) ? 'bg-gray-200' : ''
                  } ${activeIndex === index ? 'bg-gray-100' : ''}`}
                >
                  <div className="flex items-center">{option.text}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No options available
            </div>
          )}
        </div>
      )}
      {errorText && (
        <span className="text-xs text-red-600 font-medium tracking-widest">
          {errorText}
        </span>
      )}
    </div>
  );
};

export default BaseSelect;
