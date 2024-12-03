import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("id");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data
  async function getUserData() {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (response.status === 200) {
        const user = response?.data?.find((user) => user.id == userId);
        setUserData(user);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex space-x-2 items-center">
          <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <span className="text-gray-700 text-lg">Loading user details...</span>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-500 text-lg font-medium">
          User not found. Please check the ID.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-6 space-y-4">
        <button
          onClick={() => navigate("/")}
          className="mb-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Go Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800">User Details</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Name</h2>
            <p className="text-gray-700">{userData.name}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Username</h2>
            <p className="text-gray-700">{userData.username}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Email</h2>
            <p className="text-gray-700">{userData.email}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Phone</h2>
            <p className="text-gray-700">{userData.phone}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Website</h2>
            <p className="text-blue-500 hover:underline">
              <a href={`http://${userData.website}`} target="_blank" rel="noreferrer">
                {userData.website}
              </a>
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Address</h2>
            <p className="text-gray-700">
              {userData.address.suite}, {userData.address.street}, <br />
              {userData.address.city} - {userData.address.zipcode}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Company</h2>
            <p className="text-gray-700">
              {userData.company.name} <br />
              <span className="text-gray-500 italic">
                "{userData.company.catchPhrase}"
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}