import Modal from './Modal';

function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  categoryId,
  title,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Delete"
      width="max-w-md"
    >
      <div className="bg-white p-4">
        <p className="text-gray-700 mb-4">{title}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            No
          </button>
          <button
            onClick={() => onConfirm(categoryId)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteConfirmationModal;
