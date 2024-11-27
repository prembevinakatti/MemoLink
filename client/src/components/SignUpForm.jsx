import React, { useState } from "react";
import axios from "axios";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Validate username as the user types
    if (name === "username") {
      validateUsername(value);
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validateUsername = async (username) => {
    try {
      if (username.length === 0) {
        setUsernameMessage("");
        setIsUsernameAvailable(false);
        return;
      }

      const response = await axios.post("http://localhost:3000/api/MemoLink/auth/checkUsername", { username });
      setUsernameMessage(response.data.message);
      setIsUsernameAvailable(response.data.success);
    } catch (error) {
      setUsernameMessage(
        error.response?.data?.message || "Error checking username"
      );
      setIsUsernameAvailable(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isUsernameAvailable) {
      alert("Please use a unique username.");
      return;
    }

    console.log("Form Submitted: ", { ...formData, profilePhoto });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-white">
          Sign Up
        </h2>

        {/* Profile Photo Upload */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-24 h-24">
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Profile Preview"
                className="w-full h-full rounded-full object-cover shadow-md border-4 border-gray-700"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
                Upload
              </div>
            )}
          </div>
          <div>
            <input
              type="file"
              id="profile-photo"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            <label
              htmlFor="profile-photo"
              className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow-lg"
            >
              Choose Photo
            </label>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`mt-1 block w-full bg-gray-700 border ${
                isUsernameAvailable
                  ? "border-green-500"
                  : "border-gray-600 focus:border-blue-500"
              } rounded-lg shadow-sm text-sm px-4 py-2 placeholder-gray-400 focus:ring-blue-500`}
              placeholder="Enter your username"
            />
            {usernameMessage && (
              <p
                className={`mt-1 text-sm ${
                  isUsernameAvailable ? "text-green-500" : "text-red-500"
                }`}
              >
                {usernameMessage}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm text-sm px-4 py-2 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm text-sm px-4 py-2 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm text-sm px-4 py-2 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow-lg"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
