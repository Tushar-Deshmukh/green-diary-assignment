import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  username: Yup.string().required("Username is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),
  website: Yup.string().url("Invalid URL").required("Website is required"),
});

export default function AddUserDialog({ open, onClose }) {
  const handleAddUser = (values, { resetForm }) => {
    toast.success("User added successfully!");
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-md shadow-lg h-[80%] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Add New User</h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            username: "",
            phone: "",
            address: "",
            website: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleAddUser}
        >
          {() => (
            <Form>
              {["name", "email", "username", "phone", "address", "website"].map(
                (field, index) => (
                  <div className="mb-4" key={index}>
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <Field
                      name={field}
                      type="text"
                      id={field}
                      className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    <ErrorMessage
                      name={field}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                )
              )}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
