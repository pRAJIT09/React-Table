import { useState } from "react";
import { toast } from "react-toastify";

export default function AddForm({ data, setData, darkMode }) {
  const [form, setForm] = useState({ id: "", name: "", age: "", role: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.id || !form.name || !form.age || !form.role) {
      toast.info("Please fill all fields!");
      return;
    }
    if (data.some((item) => item.id === form.id)) {
      toast.info("ID must be unique!");   // ✅ fixed here
      return;
    }
    setData([...data, { ...form, age: Number(form.age) }]);
    setForm({ id: "", name: "", age: "", role: "" });
    toast.success("User added successfully!"); // ✅ nice feedback
  };

  const inputClass = `border rounded px-2 py-1 ${
    darkMode ? "bg-gray-700 text-gray-100 border-gray-600" : ""
  }`;

  return (
    <form
      onSubmit={handleAdd}
      className={`flex gap-2 mb-6 flex-wrap justify-center ${
        darkMode ? "bg-gray-800 p-4 rounded-lg" : ""
      }`}
    >
      <input
        type="number"
        name="id"
        placeholder="ID"
        value={form.id}
        onChange={handleChange}
        className={inputClass}
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className={inputClass}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
        className={inputClass}
      />
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={form.role}
        onChange={handleChange}
        className={inputClass}
      />
      <button
        type="submit"
        className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add
      </button>
    </form>
  );
}
