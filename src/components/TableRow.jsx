import { useState } from "react";
import { toast } from "react-toastify";

export default function TableRow({ item, data, setData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...item });

  // Handle input change
  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Save changes
  const handleSave = () => {
    if (!editForm.id || !editForm.name || !editForm.age || !editForm.role) {
      toast.info("Please fill all fields!");
      return;
    }

    // Check for unique ID if changed
    if (
      editForm.id !== item.id &&
      data.some((row) => row.id === editForm.id)
    ) {
      toast.info("ID must be unique!");
      return;
    }

    setData(
      data.map((row) => (row.id === item.id ? { ...editForm, age: Number(editForm.age) } : row))
    );
    setIsEditing(false);
    toast.success("User updated successfully!");
  };

  // Delete row
  const handleDelete = (id) => {
    setData(data.filter((row) => row.id !== id));
  };

  return (
    <>
      <tr className="text-center bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <td className="border border-gray-400 px-4 py-2">{item.id}</td>
        <td className="border border-gray-400 px-4 py-2">{item.name}</td>
        <td className="border border-gray-400 px-4 py-2">{item.age}</td>
        <td className="border border-gray-400 px-4 py-2">{item.role}</td>
        <td className="border border-gray-400 px-4 py-2 flex justify-center gap-2">
          <button
            className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            onClick={() => {
              setData(data.filter((u) => u.id !== item.id));
              toast.error("User deleted!");
          }}
        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
      Delete
    </button>
        </td>
      </tr>

      {/* Edit Modal */}
      {isEditing && (
        <tr className="bg-gray-100 dark:bg-gray-700">
          <td colSpan="5" className="p-4">
            <div className="flex flex-col gap-2 md:flex-row md:gap-4 items-center justify-center">
              <input
                type="number"
                name="id"
                value={editForm.id}
                onChange={handleChange}
                className="border rounded px-2 py-1"
                placeholder="ID"
              />
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleChange}
                className="border rounded px-2 py-1"
                placeholder="Name"
              />
              <input
                type="number"
                name="age"
                value={editForm.age}
                onChange={handleChange}
                className="border rounded px-2 py-1"
                placeholder="Age"
              />
              <input
                type="text"
                name="role"
                value={editForm.role}
                onChange={handleChange}
                className="border rounded px-2 py-1"
                placeholder="Role"
              />
              <button
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
