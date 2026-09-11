import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);

  
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    console.log("Saved user:", savedUser);

    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);

        console.log("Logged user:", userData);

        setUser(userData);
      } catch (error) {
        console.log("Error reading user:", error);

        localStorage.removeItem("user");
      }
    }
  }, []);

  
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  setUser(null);
  setShowLogout(false);


  navigate("/", { replace: true });
};
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
       "https://resturent-managments.onrender.com/api/Resturent/products"
      );

      console.log("Products from database:", response.data.data);

      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

 
  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    return (
      product.name?.toLowerCase().includes(searchText) ||
      product.category?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="min-h-screen bg-sky-100">

     

      <nav className="fixed top-0 left-0 w-full z-50 px-3 sm:px-6 py-3 sm:py-4">
        <div
          className="
            bg-black/60
            backdrop-blur-2xl
            border border-white/20
            rounded-2xl
            px-4 sm:px-8
            py-3 sm:py-4
            shadow-2xl
          "
        >

          {/* LOGO */}

          <div className="flex items-center justify-center sm:justify-between">
            <h1
              className="
                text-2xl
                sm:text-3xl
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
          </div>

          {/* NAV LINKS */}

          <div
            className="
              flex
              items-center
              justify-center
              flex-wrap
              gap-2
              sm:gap-5
              mt-3
              sm:mt-0
              sm:absolute
              sm:right-12
              sm:top-1/2
              sm:-translate-y-1/2
            "
          >

            {/* HOME */}

            <Link
              to="/"
              className="
                text-xs
                sm:text-base
                font-medium
                text-black
                bg-red-300
                border-2
                sm:border-4
                border-fuchsia-500
                hover:bg-blue-950
                hover:text-white
                px-3
                sm:px-5
                py-2
                rounded-full
                transition-all
                duration-300
                hover:scale-105
              "
            >
              Home
            </Link>


            {/* SIGNUP */}

            {!user && (
              <Link
                to="/signup"
                className="
                  text-xs
                  sm:text-base
                  font-medium
                  text-black
                  bg-red-300
                  border-2
                  sm:border-4
                  border-fuchsia-500
                  hover:bg-blue-950
                  hover:text-white
                  px-3
                  sm:px-5
                  py-2
                  rounded-full
                  transition-all
                  duration-300
                  hover:scale-105
                "
              >
                Signup
              </Link>
            )}


            {/* LOGIN / USER NAME */}

            {user ? (
              <div className="relative">

                <button
                  type="button"
                  onClick={() => setShowLogout(!showLogout)}
                  className="
                    text-xs
                    sm:text-base
                    font-medium
                    text-black
                    bg-red-300
                    border-2
                    sm:border-4
                    border-fuchsia-500
                    hover:bg-blue-950
                    hover:text-white
                    px-3
                    sm:px-5
                    py-2
                    rounded-full
                    transition-all
                    duration-300
                    hover:scale-105
                  "
                >
                  {user.Name} ▼
                </button>


                {/* LOGOUT DROPDOWN */}

                {showLogout && (
                  <div
                    className="
                      absolute
                      right-0
                      top-full
                      mt-2
                      w-32
                      bg-white
                      rounded-xl
                      shadow-2xl
                      overflow-hidden
                      z-[100]
                    "
                  >

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="
                        w-full
                        px-4
                        py-3
                        text-red-600
                        font-semibold
                        text-left
                        hover:bg-red-50
                        transition
                      "
                    >
                      Logout
                    </button>

                  </div>
                )}

              </div>
            ) : (
              <Link
                to="/login"
                className="
                  text-xs
                  sm:text-base
                  font-medium
                  text-black
                  bg-red-300
                  border-2
                  sm:border-4
                  border-fuchsia-500
                  hover:bg-blue-950
                  hover:text-white
                  px-3
                  sm:px-5
                  py-2
                  rounded-full
                  transition-all
                  duration-300
                  hover:scale-105
                "
              >
                Login
              </Link>
            )}


            {/* ADMIN */}

            <Link
              to="/create-product"
              className="
                text-xs
                sm:text-base
                font-medium
                text-black
                bg-red-300
                border-2
                sm:border-4
                border-fuchsia-500
                hover:bg-blue-950
                hover:text-white
                px-3
                sm:px-5
                py-2
                rounded-full
                transition-all
                duration-300
                hover:scale-105
              "
            >
              Admin
            </Link>

          </div>
        </div>
      </nav>



      <main className="pt-36 px-8 pb-16">

        

        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Indian Food
          </h1>

          <p className="text-gray-600 text-lg">
            Enjoy delicious Indian dishes
          </p>

        </div>


        {/* SEARCH */}

        <div className="max-w-2xl mx-auto mb-12">

          <div
            className="
              bg-white/50
              backdrop-blur-2xl
              border border-white/60
              rounded-full
              shadow-xl
              p-2
              flex
              items-center
            "
          >

            <input
              type="text"
              placeholder="Search your favourite dish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                px-6
                py-4
                bg-transparent
                outline-none
                text-gray-800
                placeholder-gray-500
                text-lg
              "
            />

            <button
              className="
                bg-black
                text-white
                px-7
                py-3
                rounded-full
                hover:bg-orange-500
                transition-all
                duration-300
              "
            >
              Search
            </button>

          </div>

        </div>


        <div className="max-w-7xl mx-auto mb-6">

          <p className="text-gray-600">

            {search
              ? `${filteredProducts.length} dish found`
              : `${products.length} Indian dishes available`}

          </p>

        </div>


        {/* LOADING */}

        {loading ? (

          <div className="text-center py-20">

            <h2 className="text-3xl font-bold text-gray-700">
              Loading dishes...
            </h2>

          </div>

        ) : filteredProducts.length > 0 ? (

          /* PRODUCT GRID */

          <div
            className="
              max-w-7xl
              mx-auto
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-8
            "
          >

            {filteredProducts.map((product) => (

              <div
                key={product._id}
                className="
                  bg-white/50
                  backdrop-blur-2xl
                  border border-white/60
                  rounded-3xl
                  overflow-hidden
                  shadow-xl
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all
                  duration-300
                "
              >

                {/* IMAGE */}

                <div className="relative h-72 overflow-hidden">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="
                      w-full
                      h-full
                      object-cover
                      hover:scale-110
                      transition-transform
                      duration-500
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/90
                      via-black/30
                      to-transparent
                    "
                  ></div>


                  {/* AVAILABILITY */}

                  <div className="absolute top-4 right-4">

                    {product.availability ? (

                      <span
                        className="
                          bg-green-500/80
                          backdrop-blur-md
                          text-white
                          px-4
                          py-2
                          rounded-full
                          text-sm
                          font-semibold
                          border
                          border-white/30
                          shadow-lg
                        "
                      >
                        ● Available
                      </span>

                    ) : (

                      <span
                        className="
                          bg-red-500/80
                          backdrop-blur-md
                          text-white
                          px-4
                          py-2
                          rounded-full
                          text-sm
                          font-semibold
                          border
                          border-white/30
                          shadow-lg
                        "
                      >
                        ● Not Available
                      </span>

                    )}

                  </div>


                  {/* PRODUCT INFORMATION */}

                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      right-0
                      p-5
                      text-white
                    "
                  >

                    <p className="text-orange-400 text-sm font-semibold mb-1">
                      {product.category}
                    </p>

                    <h2 className="text-2xl font-bold mb-2">
                      {product.name}
                    </h2>

                    <p className="text-sm text-gray-200 line-clamp-2">
                      {product.description}
                    </p>

                  </div>

                </div>


                {/* PRICE + DETAILS */}

                <div className="p-5">

                  <div className="flex items-center justify-between">

                    <span className="text-2xl font-bold text-gray-900">
                      ₹{product.price}
                    </span>


                    {/* DETAILS BUTTON */}

                    <button
                      disabled={!product.availability}
                      onClick={() => {

                        console.log(
                          "Clicked product:",
                          product
                        );

                        console.log(
                          "MongoDB ID:",
                          product._id
                        );

                        navigate(
                          `/product-details/${product._id}`
                        );

                      }}
                      className={`
                        px-6
                        py-3
                        rounded-full
                        font-semibold
                        transition-all
                        duration-200

                        ${
                          product.availability
                            ? `
                              bg-black
                              text-white
                              hover:bg-orange-500
                              hover:scale-105
                              active:scale-95
                            `
                            : `
                              bg-gray-400
                              text-gray-200
                              cursor-not-allowed
                            `
                        }
                      `}
                    >

                      {product.availability
                        ? "Details"
                        : "Unavailable"}

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* NO PRODUCT */

          <div className="text-center py-20">

            <h2 className="text-3xl font-bold text-gray-700 mb-3">
              No dish found
            </h2>

            <p className="text-gray-500">
              Try searching for another Indian dish.
            </p>

          </div>

        )}

      </main>



      <div className="w-full bg-amber-100"></div>

      <footer className="w-full min-h-screen bg-amber-200 flex flex-col justify-between">

        <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 py-16">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">




            <div>

              <h1
                className="
                  text-4xl
                  font-bold
                  bg-fuchsia-500
                  bg-clip-text
                  text-transparent
                  mb-5
                "
              >
                𝐓𝐄𝐒𝐓𝐘_𝐁𝐈𝐓𝐄𝐒
              </h1>

              <p className="text-gray-700 leading-7">
                Delicious Indian food made with fresh ingredients,
                traditional flavors and lots of love.
              </p>

              <p className="mt-5 text-gray-700">
                🍽️ Taste the tradition
              </p>

            </div>


            <div>

              <h2 className="text-2xl font-bold text-gray-900 mb-5 underline">
                Quick Links
              </h2>

              <div className="flex flex-col gap-3">

                <Link
                  to="/"
                  className="text-gray-700 hover:text-red-600 transition"
                >
                  Home
                </Link>

                {!user && (
                  <Link
                    to="/signup"
                    className="text-gray-700 hover:text-red-600 transition"
                  >
                    Signup
                  </Link>
                )}

                {!user && (
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-red-600 transition"
                  >
                    Login
                  </Link>
                )}

                {user && (
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-600 transition text-left"
                  >
                    Logout
                  </button>
                )}

                <Link
                  to="/create-product"
                  className="text-gray-700 hover:text-red-600 transition"
                >
                  Admin
                </Link>

              </div>

            </div>



            <div>

              <h2 className="text-2xl font-bold text-gray-900 mb-5">
                Contact Us
              </h2>

              <div className="flex flex-col gap-4 text-gray-700">

                <p>
                  📍 Kolkata, West Bengal, India
                </p>

                <p>
                  📞 +91 1234567898
                </p>

                <p>
                  ✉️ testybites@gmail.com
                </p>

                <p>
                  🕐 Mon - Sun : 10:00 AM - 11:00 PM
                </p>

              </div>

            </div>



            <div>

              <h2 className="text-2xl font-bold text-gray-900 mb-5">
                Follow Us
              </h2>

              <p className="text-gray-700 mb-6">
                Follow us and stay updated with our latest dishes
                and special offers.
              </p>

              <div className="flex gap-4">

                <a
                  href="#"
                  className="
                    w-11
                    h-11
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-black
                    text-white
                    hover:bg-orange-500
                    hover:scale-110
                    transition-all
                  "
                >
                  f
                </a>

                <a
                  href="#"
                  className="
                    w-11
                    h-11
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-black
                    text-white
                    hover:bg-orange-500
                    hover:scale-110
                    transition-all
                  "
                >
                  𝕏
                </a>

                <a
                  href="#"
                  className="
                    w-11
                    h-11
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-black
                    text-white
                    hover:bg-orange-500
                    hover:scale-110
                    transition-all
                  "
                >
                  ◎
                </a>

              </div>

            </div>

          </div>



          <div
            className="
              mt-16
              bg-black/80
              backdrop-blur-xl
              rounded-3xl
              p-8
              text-white
              flex
              flex-col
              md:flex-row
              items-center
              justify-between
              gap-6
            "
          >

            <div>

              <h2 className="text-2xl font-bold mb-2">
                Hungry for something delicious?
              </h2>

              <p className="text-gray-300">
                Explore our delicious Indian dishes today.
              </p>

            </div>

            <Link
              to="/"
              className="
                px-7
                py-3
                rounded-full
                bg-orange-500
                text-white
                font-semibold
                hover:bg-orange-600
                hover:scale-105
                transition-all
              "
            >
              Explore Menu
            </Link>

          </div>

        </div>



        <div className="border-t border-black/20 py-6">

          <div
            className="
              max-w-7xl
              mx-auto
              px-6
              flex
              flex-col
              sm:flex-row
              items-center
              justify-between
              gap-3
              text-center
              sm:text-left
            "
          >

            <p className="text-gray-700 text-sm">
              © 2026 TESTY_BITES. All rights reserved.
            </p>

            <p className="text-gray-700 text-sm">
              Made with ❤️ for food lovers
            </p>

          </div>

        </div>

      </footer>
  
    </div>
  );
}

export default Home;