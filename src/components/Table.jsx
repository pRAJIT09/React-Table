import { useState } from "react";
import TableRow from "./TableRow";
import { getFilteredData } from "../utils/getFilteredData";
import { getSortedData } from "../utils/getSortedData";
import { getHandleSortData } from "../utils/getHandlesortData";

export default function Table({ data, setData, darkMode, search, setSearch }) {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // Apply search filter first
  const filteredData = getFilteredData(data, search);

  // Apply sorting on filtered data
  const sortedData = getSortedData(filteredData, sortField, sortOrder);


  return (
    <div className="w-full max-w-4xl">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by ID, Name or Role..."
        className={`border rounded-md px-3 py-2 mb-4 w-80 ${
          darkMode
            ? "bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
            : ""
        }`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <table className="table-auto border-collapse border border-gray-400 w-full shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            {["id", "name", "age", "role"].map((field) => (
              <th
                key={field}
                className="border border-gray-400 px-4 py-2 cursor-pointer"
                onClick={() => getHandleSortData(field,sortField,sortOrder,setSortField,setSortOrder)}
              >
                {field.toUpperCase()}{" "}
                {sortField === field && (sortOrder === "asc" ? "⬆" : "⬇")}
              </th>
            ))}
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((item) => (
              <TableRow
                key={item.id}
                item={item}
                data={data}
                setData={setData}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
