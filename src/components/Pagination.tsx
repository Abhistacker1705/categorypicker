import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (currentPage > 4) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={`outline-none ${
            currentPage === 1 ? "text-black" : "text-checkboxUnselect"
          }`}
        >
          {1}
        </button>,
      );
      pageNumbers.push(
        <span key="ellipsis-start" className="text-checkboxUnselect">
          ...
        </span>,
      );
    }

    const leftRange = Math.max(currentPage - 3, 1);

    for (let i = leftRange; i < currentPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
          className={`outline-none ${
            i === currentPage ? "text-black" : "text-checkboxUnselect"
          }`}
        >
          {i}
        </button>,
      );
    }
    if (totalPages !== currentPage) {
      pageNumbers.push(
        <button
          key={currentPage}
          onClick={() => handlePageChange(currentPage)}
          disabled
          className="text-black outline-none"
        >
          {currentPage}
        </button>,
      );
    }

    const rightRange = Math.min(currentPage + 3, totalPages - 1);

    for (let i = currentPage + 1; i <= rightRange; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
          className={`outline-none ${
            i === currentPage ? "text-black" : "text-checkboxUnselect"
          }`}
        >
          {i}
        </button>,
      );
    }

    if (currentPage < totalPages - 3) {
      pageNumbers.push(
        <span key="ellipsis-end" className="text-checkboxUnselect">
          ...
        </span>,
      );
    }

    pageNumbers.push(
      <button
        key={totalPages}
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`outline-none ${
          currentPage === totalPages ? "text-black" : "text-checkboxUnselect"
        }`}
      >
        {totalPages}
      </button>,
    );

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center gap-2 text-xl">
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="text-checkboxUnselect outline-none disabled:opacity-50"
      >
        {"<<"}
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-checkboxUnselect outline-none disabled:opacity-50"
      >
        {"<"}
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-checkboxUnselect outline-none disabled:opacity-50"
      >
        {">"}
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="text-checkboxUnselect outline-none disabled:opacity-50"
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
