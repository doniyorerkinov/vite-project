import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate pagination buttons with ellipsis
  const generatePaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5; // Maximum number of visible page numbers (excluding ellipsis)

    if (totalPages <= maxVisiblePages) {
      // If total pages are less than or equal to maxVisiblePages, show all pages
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              currentPage === i ? 'bg-primary-green text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // Show ellipsis when there are more pages than maxVisiblePages
      const leftSiblingIndex = Math.max(currentPage - 1, 1);
      const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

      const shouldShowLeftEllipsis = leftSiblingIndex > 2;
      const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

      if (shouldShowLeftEllipsis) {
        buttons.push(
          <button
            key={1}
            className={`px-3 py-1 rounded ${
              currentPage === 1 ? 'bg-primary-green text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => onPageChange(1)}
          >
            1
          </button>
        );

        if (leftSiblingIndex > 2) {
          buttons.push(<span key="left-ellipsis" className="px-3 py-1">...</span>);
        }
      }

      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        buttons.push(
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              currentPage === i ? 'bg-primary-green text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }

      if (shouldShowRightEllipsis) {
        if (rightSiblingIndex < totalPages - 1) {
          buttons.push(<span key="right-ellipsis" className="px-3 py-1">...</span>);
        }

        buttons.push(
          <button
            key={totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages ? 'bg-primary-green text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }

    return buttons;
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Previous Button */}
      <button
        className={`px-3 py-1 rounded text-inactive ${
          currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300 hover:text-primary'
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft/>
      </button>

      {/* Page Numbers */}
      {generatePaginationButtons()}

      {/* Next Button */}
      <button
        className={`px-3 py-1 rounded text-inactive ${
          currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300 hover:text-primary'
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight/>
      </button>
    </div>
  );
};

export default Pagination;