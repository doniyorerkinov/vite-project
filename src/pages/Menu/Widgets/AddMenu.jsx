import { LayoutGrid } from 'lucide-react';
import Modal from '../../../components/Base/Modal';

function AddMenu({ isMenuOpen, onMenuClose }) {
  return (
    <Modal isOpen={isMenuOpen} onClose={onMenuClose}>
      <div className="flex items-center gap-4 text-sm hover:bg-primary-bg p-2 rounded-md">
        <LayoutGrid size={20} /> Kategoriya qo'shish
      </div>
    </Modal>
  );
}

export default AddMenu;
