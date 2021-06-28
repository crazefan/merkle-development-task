import React from "react";

import { PageControlProps } from "../../../types";

const PageControl = ({ currentPage, totalPages, handlePageChange }: PageControlProps) => {
  return (
    <div className="flex justify-center mx-auto space-x-5">
      <button
        className="w-24 bg-purple-500 hover:bg-purple-800 text-white font py-1 px-1 rounded disabled:opacity-20"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(-1)}
      >
        Previous
      </button>
      <p>
        {currentPage} of {totalPages}
      </p>
      <button
        className="w-12 bg-purple-500 hover:bg-purple-800 text-white font py-1 px-1 rounded disabled:opacity-20"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(1)}
      >
        Next
      </button>
    </div>
  );
};

export default PageControl;
