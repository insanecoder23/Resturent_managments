import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { Email, Password } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(Email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (Password.length < 6) {
      setError("Password must contain at least 6 characters");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/Resturent/login",
        {
          Email,
          Password,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Login response:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      alert("Login successful!");

      navigate("/", { replace: true });
    } catch (error) {
      console.log("Login error:", error);

      if (error.response) {
        setError(error.response.data.message || "Invalid email or password");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        w-full
        h-[100dvh]
        bg-sky-100
        flex
        items-center
        justify-center
        px-4
      "
    >
      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-sm
          sm:max-w-md
          bg-black/60
          backdrop-blur-2xl
          border
          border-white/20
          rounded-3xl
          p-5
          sm:p-20
          md:p-20 
          shadow-2xl
        "
      >
        <h1
          className="
            text-3xl
            sm:text-4xl
            font-bold
            text-white
            text-center
            mb-6
            sm:mb-8
          "
        >
          Welcome Back
        </h1>

        <div className="mb-4">
          <label htmlFor="Email" className="block text-white text-sm mb-2">
            Email
          </label>

          <input
            id="Email"
            type="email"
            name="Email"
            placeholder="Enter your email"
            value={formData.Email}
            onChange={handleChange}
            className="
              w-full
              p-3
              sm:p-3.5
              rounded-xl
              bg-white/10
              backdrop-blur-md
              border
              border-white/20
              text-white
              placeholder-gray-300
              text-sm
              sm:text-base
              outline-none
              focus:border-white/60
              focus:bg-white/20
              transition
            "
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Password" className="block text-white text-sm mb-2">
            Password
          </label>

          <input
            id="Password"
            type="password"
            name="Password"
            placeholder="Enter your password"
            value={formData.Password}
            onChange={handleChange}
            className="
              w-full
              p-3
              sm:p-3.5
              rounded-xl
              bg-white/10
              backdrop-blur-md
              border
              border-white/20
              text-white
              placeholder-gray-300
              text-sm
              sm:text-base
              outline-none
              focus:border-white/60
              focus:bg-white/20
              transition
            "
          />
        </div>

        {error && (
          <div className="mb-4">
            <p className="text-red-400 text-xs sm:text-sm leading-5">{error}</p>
          </div>
        )}

        <button
          type="submit"
          className="
            w-full
            py-3
            sm:py-3.5
            rounded-full
            bg-white/30
            backdrop-blur-2xl
            border
            border-white/50
            text-white
            text-sm
            sm:text-base
            font-semibold
            tracking-wide
            shadow-lg
            hover:bg-white/40
            hover:border-white/70
            hover:scale-[1.02]
            active:scale-95
            transition-all
            duration-200
          "
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
