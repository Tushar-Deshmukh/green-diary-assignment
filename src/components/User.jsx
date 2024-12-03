import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddUserDialog from "./AddUserDialog";


export default function User() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);

  const handleOpenUserDialog = () => {
    setOpenAddUserDialog(!openAddUserDialog);
  };

  // Fetch user data
  async function getUserData() {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (response) {
        setData(response.data);
        setFilteredData(response.data);
      }
    } catch (error) {
      console.error(error?.response);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  // Handle search
  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = data.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">User List</h1>

      <div className="w-full max-w-5xl grid gird-cols-1 sm:grid-cols-2 items-center mb-6">
        {/* Search Bar */}
        <div className="flex items-center w-full max-w-5xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:ring-blue-200"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>

        {/* Add user */}
        <div className="flex justify-end">
          <button
            onClick={handleOpenUserDialog}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Add User
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full max-w-5xl overflow-x-auto">
        <table className="table-auto w-full bg-white border border-gray-200 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              {["Sr No.", "Name", "Email", "Username", "Actions"].map(
                (item, i) => (
                  <th
                    key={i}
                    className="px-4 py-2 text-left font-medium uppercase text-sm"
                  >
                    {item}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-gray-500 text-lg"
                >
                  <div className="flex justify-center items-center space-x-2">
                    <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                    <span>Loading data...</span>
                  </div>
                </td>
              </tr>
            ) : filteredData.length > 0 ? (
              filteredData.map((user, i) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="border px-4 py-2 text-gray-700">{i + 1}</td>
                  <td className="border px-4 py-2 text-gray-700">
                    {user?.name}
                  </td>
                  <td className="border px-4 py-2 text-gray-700">
                    {user?.email}
                  </td>
                  <td className="border px-4 py-2 text-gray-700">
                    {user?.username}
                  </td>
                  <td className="border px-4 py-2 text-gray-700 text-center">
                    <button
                      onClick={() => navigate(`/user-details?id=${user?.id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-gray-500 text-lg"
                >
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openAddUserDialog && (
        <AddUserDialog
          open={openAddUserDialog}
          onClose={handleOpenUserDialog}
        />
      )}
    </div>
  );
}
