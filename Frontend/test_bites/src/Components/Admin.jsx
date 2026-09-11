import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    availability: true,
    image: null,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      setIsAdmin(false);
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      console.log("Logged user:", user);

      if (user.Role === "Admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.log("Error reading user:", error);
      setIsAdmin(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("availability", formData.availability);
      data.append("image", formData.image);

      // Get JWT token from localStorage
      const token = localStorage.getItem("token");

      console.log("Token:", token);

      // Your existing add-product API
      const response = await axios.post(
        "https://resturent-managments.onrender.com/api/Resturent/add-product",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Add product response:", response.data);

      alert("Product added successfully!");

      // Clear form
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        availability: true,
        image: null,
      });
    } catch (error) {
      console.log("Add product error:", error);

      if (error.response) {
        alert(error.response.data.message || "Failed to add product");
      } else {
        alert("Something went wrong");
      }
    }
  };

  // Only Admin can access
  if (!isAdmin) {
    return (
      <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 text-center">
          <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>

          <p className="mt-3 text-gray-600">This page is only for Admin.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center items-center py-10">
      <div className="w-full max-w-xl bg-white rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-2">Admin Panel</h1>

        <p className="text-center text-gray-500 mb-8">Add New Product</p>

        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-5">
            <label className="block font-semibold mb-2">Product Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="block font-semibold mb-2">Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="4"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>

          {/* Category */}
          <div className="mb-5">
            <label className="block font-semibold mb-2">Category</label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Pizza, Burger, Drinks..."
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>

          {/* Price */}
          <div className="mb-5">
            <label className="block font-semibold mb-2">Price</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              min="0"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>

          {/* Availability */}
          <div className="mb-5 flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.availability}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  availability: e.target.checked,
                }))
              }
              className="w-5 h-5"
            />

            <label className="font-semibold">Product Available</label>
          </div>

          {/* Image */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Product Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              required
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-700"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
