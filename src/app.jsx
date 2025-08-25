import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddForm from "./components/AddForm";
import Table from "./components/Table";

export default function App() {
  const [data, setData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");


  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Tables
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Form */}
      <AddForm data={data} setData={setData} darkMode={darkMode} />

      {/* Table */}
      <Table data={data} setData={setData} darkMode={darkMode} search={search} setSearch={setSearch}/>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}