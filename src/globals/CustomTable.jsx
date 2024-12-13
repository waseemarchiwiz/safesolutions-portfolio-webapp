import React, { useState, useMemo } from "react";
import { Trash2, Pencil, ChevronLeft, ChevronRight } from "lucide-react";

const CustomTable = ({
  headers = [],
  data = [],
  onEdit = () => {},
  onDelete = () => {},
  itemsPerPage = 5,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Memoized pagination calculations with fallback for empty data
  const paginationData = useMemo(() => {
    // Ensure data is an array
    const safeData = Array.isArray(data) ? data : [];

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = safeData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(safeData.length / itemsPerPage);

    return {
      currentItems,
      totalPages,
      totalDataLength: safeData.length,
      indexOfFirstItem,
      indexOfLastItem,
    };
  }, [data, currentPage, itemsPerPage]);

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < paginationData.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Render empty state if no data
  if (paginationData.totalDataLength === 0) {
    return (
      <div className="text-center py-8 text-gray-500">No data available</div>
    );
  }

  return (
    <div className="font-sans container mx-auto px-4 py-8">
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full">
          <thead className="bg-gradient-to-r bg-[#2170B7]">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginationData.currentItems.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
              >
                {Object.values(row).map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 text-sm text-gray-800"
                  >
                    {cell}
                  </td>
                ))}
                <td className="px-6 py-4 flex space-x-3">
                  <button
                    onClick={() => onEdit(row)}
                    className="text-blue-600 hover:text-blue-800 transition-colors bg-emerald-500 p-2 rounded-md"
                    title="Edit"
                  >
                    <Pencil className="h-5 w-5 text-white" />
                  </button>
                  <button
                    onClick={() => onDelete(row)}
                    className="text-red-600 hover:text-red-800 transition-colors bg-red-500 rounded-md p-2"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5 text-white " />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50">
          <div className="text-sm text-gray-600">
            Showing {paginationData.indexOfFirstItem + 1} to{" "}
            {Math.min(
              paginationData.indexOfLastItem,
              paginationData.totalDataLength
            )}{" "}
            of {paginationData.totalDataLength} entries
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-blue-100 text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-200 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {paginationData.totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === paginationData.totalPages}
              className="p-2 rounded-full bg-blue-100 text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-200 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
