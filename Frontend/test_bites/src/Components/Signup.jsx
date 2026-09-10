import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Role: "Public",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const {
    Name,
    Email,
    Password,
    ConfirmPassword,
    Role,
  } = formData;

  if (Name.trim() === "") {
    setError("Name is required");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(Email)) {
    setError("Please enter a valid email address");
    return;
  }

  if (Password.length < 6) {
    setError("Password must contain at least 6 characters");
    return;
  }

  if (Password !== ConfirmPassword) {
    setError("Passwords do not match");
    return;
  }

  if (!Role) {
    setError("Please select a role");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:4000/api/Resturent/signup",
      {
        Name,
        Email,
        Password,
        Role,
      }
    );

   console.log("Signup successful:", response.data);

// alert("Signup successful!");

console.log("Before navigation");

navigate("/", { replace: true });

console.log("After navigation");

  } catch (error) {
    console.log("Signup error:", error);

    if (error.response) {
      setError(error.response.data.message);
    } else {
      setError("Something went wrong. Please try again.");
    }
  }
};
  return (
    <div
      className="
        w-full
        bg-gradient-to-br
        from-red-100
        via-orange-50
        to-yellow-100
        flex
        items-center
        justify-center">

<div
  className="
    w-full
    max-w-sm
    bg-black/80
    backdrop-blur-2xl
    rounded-[2rem]
    border
    border-white/20
    shadow-2xl
    p-6
    sm:p-32
    md:p-10 
  "
>
        <div className="text-center mb-8">

          <h1
            className="
              text-3xl
              sm:text-4xl
              font-bold
              bg-gradient-to-r
              from-orange-400
              via-red-500
              to-yellow-400
              bg-clip-text
              text-transparent
            "
          >
            𝐓𝐄𝐒𝐓𝐘_𝐁𝐈𝐓𝐄𝐒
          </h1>

          <p className="text-gray-300 text-sm mt-2">
            Create your account
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">

            <label className="block text-gray-200 text-sm mb-2">
              Name
            </label>

            <input
              type="text"
              name="Name"
              placeholder="Enter your name"
              value={formData.Name}
              onChange={handleChange}
              className="
                w-full
                h-12
                px-4
                rounded-2xl
                bg-white/10
                border
                border-white/20
                text-white
                placeholder-gray-400
                outline-none
                focus:border-orange-400
                focus:bg-white/15
                transition
              "
            />

          </div>


          {/* EMAIL */}

          <div className="mb-4">

            <label className="block text-gray-200 text-sm mb-2">
              Email
            </label>

            <input
              type="email"
              name="Email"
              placeholder="Enter your email"
              value={formData.Email}
              onChange={handleChange}
              className="
                w-full
                h-12
                px-4
                rounded-2xl
                bg-white/10
                border
                border-white/20
                text-white
                placeholder-gray-400
                outline-none
                focus:border-orange-400
                focus:bg-white/15
                transition
              "
            />

          </div>


          {/* PASSWORD */}

          <div className="mb-4">

            <label className="block text-gray-200 text-sm mb-2">
              Password
            </label>

            <input
              type="password"
              name="Password"
              placeholder="Enter your password"
              value={formData.Password}
              onChange={handleChange}
              className="
                w-full
                h-12
                px-4
                rounded-2xl
                bg-white/10
                border
                border-white/20
                text-white
                placeholder-gray-400
                outline-none
                focus:border-orange-400
                focus:bg-white/15
                transition
              "
            />

          </div>



          <div className="mb-4">

            <label className="block text-gray-200 text-sm mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              name="ConfirmPassword"
              placeholder="Confirm your password"
              value={formData.ConfirmPassword}
              onChange={handleChange}
              className="
                w-full
                h-12
                px-4
                rounded-2xl
                bg-white/10
                border
                border-white/20
                text-white
                placeholder-gray-400
                outline-none
                focus:border-orange-400
                focus:bg-white/15
                transition
              "
            />

          </div>


          <div className="mb-5">

            <label className="block text-gray-200 text-sm mb-2">
              Account Type
            </label>

            <select
              name="Role"
              value={formData.Role}
              onChange={handleChange}
              className="
                w-full
                h-12
                px-4
                rounded-2xl
                bg-white/10
                border
                border-white/20
                text-white
                outline-none
                focus:border-orange-400
                transition
              "
            >
              <option value="Public" className="text-black">
                Public
              </option>

              <option value="Admin" className="text-black">
                Admin
              </option>
            </select>

          </div>


          {/* ERROR */}

          {error && (
            <p
              className="
                text-red-400
                text-sm
                text-center
                mb-4
              "
            >
              {error}
            </p>
          )}
          <button 
            type="submit"
            className="
              w-full
              h-12
              rounded-full
              bg-gradient-to-r
              from-orange-500
              to-red-500
              text-white
              font-bold
              shadow-lg
              hover:from-orange-600
              hover:to-red-600
              hover:scale-[1.02]
              active:scale-95
              transition-all
              duration-200
            "
          >
            Create Account
          </button>

        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?
          <a
            href="/login"
            className="text-orange-400 font-semibold ml-1"
          >
            Login
          </a>
        </p>

      </div>

    </div>
  );
}

export default Signup;