import React, { useState, useRef, useEffect } from "react";
import { useTableState } from "./hooks/useTableState";
import TableHeader from "./components/TableHeader";
import TableControls from "./components/TableControls";
import ColumnSelector from "./components/ColumnSelector";
import { dummyData } from "../../data/schemes";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Printer,
  Share2,
  Database,
  Building2,
  Home,
  CheckSquare,
  Search,
  SlidersHorizontal,
  Filter,
} from "lucide-react";
import { PropertyDetailsModal } from "../PropertyDetailsModal";
import classNames from "classnames";

export default function TableV3() {
  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    showColumnSelector,
    setShowColumnSelector,
    showFilters,
    setShowFilters,
    columns,
    sortConfig,
    toggleColumnVisibility,
    handleSort,
  } = useTableState();

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const tableRef = useRef<HTMLDivElement>(null);

  const getCategoryColor = (category: string) => {
    const colors = {
      MIG: "bg-blue-50/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
      LIG: "bg-green-50/80 dark:bg-green-900/30 text-green-700 dark:text-green-300",
      Commercial:
        "bg-purple-50/80 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
      Residential:
        "bg-orange-50/80 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
      EWS: "bg-pink-50/80 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-50/80 dark:bg-gray-800/30 text-gray-700 dark:text-gray-300"
    );
  };
  // Handle select all
  useEffect(() => {
    if (isSelectAll) {
      setSelectedRows(currentItems.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  }, [isSelectAll]);

  // Filter data based on search term
  const filteredData = dummyData.filter(
    (record) =>
      (categoryFilter === "all" || record.category === categoryFilter) &&
      Object.values(record).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Row selection handlers
  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Export handlers
  const exportToCSV = () => {
    const headers = columns
      .filter((col) => col.visible)
      .map((col) => col.label)
      .join(",");

    const rows = currentItems
      .map((record) =>
        columns
          .filter((col) => col.visible)
          .map((col) => record[col.key])
          .join(",")
      )
      .join("\n");

    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "property-records.csv";
    a.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white dark:bg-[#1C2537] rounded-lg shadow-md overflow-hidden">
      <div className="flex justify-between items-start p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative flex-1 max-w-lg">
          <input
            type="text"
            placeholder="Search properties..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-[#1C2537] dark:border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowColumnSelector(!showColumnSelector)}
            className="flex items-center space-x-2 px-4 py-2 dark:bg-[#1C2537] border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2D3748] dark:text-gray-200"
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span>Columns</span>
          </button>
          <button
            className="flex items-center space-x-2 px-4 py-2 dark:bg-[#1C2537] border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2D3748] dark:text-gray-200"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Category Filter */}
      {showFilters && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Filter by Category
          </h3>
          <div className="flex gap-2">
            {["all", "MIG", "LIG", "Commercial", "Residential", "EWS"].map(
              (category) => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    categoryFilter === category
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              )
            )}
          </div>
        </div>
      )}
      <ColumnSelector
        columns={columns}
        onToggleColumn={toggleColumnVisibility}
        show={showColumnSelector}
      />

      {/* Action Buttons */}
      <div className="px-4 py-3 border-t border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isSelectAll}
            onChange={() => setIsSelectAll(!isSelectAll)}
            className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700 rounded transition-all duration-200"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {selectedRows.length} row(s) selected
          </span>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={exportToCSV}
            className="flex items-center px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors duration-200"
          >
            <Download className="h-4 w-4 mr-1" />
            Export
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-colors duration-200"
          >
            <Printer className="h-4 w-4 mr-1" />
            Print
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-purple-700 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors duration-200">
            <Share2 className="h-4 w-5 mr-1" />
            Share
          </button>
        </div>
      </div>

      <div ref={tableRef} className="relative overflow-x-auto min-w-[1024px]">
        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-[#1C2537] sticky top-0 z-20">
            <tr className="divide-x divide-gray-700">
              <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={isSelectAll}
                  onChange={() => setIsSelectAll(!isSelectAll)}
                  className="h-5 w-5 text-blue-600 border-gray-700 rounded"
                />
              </th>
              {columns
                .filter((col) => col.visible && col.key !== "checkbox")
                .map((column, index) => (
                  <th
                    key={column.key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    {column.label}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {currentItems.map((record) => (
              <tr
                key={record.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 divide-x divide-gray-200 dark:divide-gray-700 transition-all duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(record.id)}
                    onChange={() => toggleRowSelection(record.id)}
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700 rounded"
                  />
                </td>
                {columns
                  .filter((col) => col.visible && col.key !== "checkbox")
                  .map((column, index) => (
                    <td
                      key={column.key}
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        column.key === "category"
                          ? `${getCategoryColor(record[column.key])} w-32`
                          : "text-gray-900 dark:text-gray-200"
                      } ${index === 0 ? "sticky left-0 bg-inherit z-10" : ""}`}
                    >
                      {record[column.key] != null
                        ? record[column.key].toString()
                        : ""}
                    </td>
                  ))}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => setSelectedProperty(record)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-[#1C2537] text-blue-500 hover:bg-[#2D3748] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 border-t dark:border-gray-700 bg-white dark:bg-[#1C2537] overflow-x-auto">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(indexOfLastItem, sortedData.length)}
            </span>{" "}
            of <span className="font-medium">{sortedData.length}</span> results
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-[#0F1729] text-sm font-medium text-gray-400 hover:bg-[#2D3748] disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === index + 1
                    ? "z-10 bg-blue-600 border-blue-600 text-white"
                    : "border-gray-700 bg-[#0F1729] text-gray-400 hover:bg-[#2D3748]"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-[#0F1729] text-sm font-medium text-gray-400 hover:bg-[#2D3748] disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}
