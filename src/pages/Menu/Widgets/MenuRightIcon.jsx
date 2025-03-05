import { LayoutGrid, Plus, Soup } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import CategoryAddModal from './CategoryAddModa';
import AddMenu from './AddMenu';

function MenuRightIcon() {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  // Function to handle clicks outside the "Hello" div
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    }

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className="relative">
      <div
        onClick={() => setIsModalOpen(true)}
        className="p-2 rounded-full hover:bg-gray-200 cursor-pointer transition-colors delay-100"
      >
        <Plus size={16} className="mx-auto" />
      </div>

      {/* Modal that appears when isModalOpen is true */}
      {isModalOpen && (
        <div
          ref={modalRef}
          className="absolute top-3 left-4 min-w-50 bg-white shadow-md p-1 rounded-md flex flex-col gap-1"
        >
          <div
            onClick={() => setIsCategoryModalOpen(true)}
            className="flex items-center gap-4 text-sm hover:bg-primary-bg p-2 rounded-md"
          >
            <LayoutGrid size={20} /> Kategoriya qo'shish
          </div>
          <div
            onClick={() => setIsMenuModalOpen(true)}
            className="flex items-center gap-4 text-sm hover:bg-primary-bg p-2 rounded-md"
          >
            <Soup size={20} /> Tovar qo'shish
          </div>
        </div>
      )}

      <CategoryAddModal
        isCategoryOpen={isCategoryModalOpen}
        onCategoryClose={() => setIsCategoryModalOpen(false)}
      />
      <AddMenu
        isMenuOpen={isMenuModalOpen}
        onMenuClose={() => setIsMenuModalOpen(false)}
      />
    </div>
  );
}

export default MenuRightIcon;
