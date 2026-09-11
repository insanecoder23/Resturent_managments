import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `https://resturent-managments.onrender.com/api/Resturent/product/${id}`,
        );

        console.log(response.data);

        setProduct(response.data.data);
      } catch (error) {
        console.log(error);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-100">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-sky-100">
        <h1 className="text-2xl font-bold text-red-500">
          {error || "Product not found"}
        </h1>

        <button
          onClick={() => navigate("/")}
          className="
            mt-5
            px-6
            py-3
            bg-black
            text-white
            rounded-full
            hover:bg-orange-500
            transition
          "
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-100 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="
            mb-6
            px-5
            py-2
            bg-black
            text-white
            rounded-full
            hover:bg-orange-500
            transition
          "
        >
          ← Back
        </button>

        <div
          className="
            bg-white
            rounded-3xl
            shadow-2xl
            overflow-hidden
            grid
            grid-cols-1
            md:grid-cols-2
          "
        >
          <div
            className="
              relative
              min-h-[400px]
              md:min-h-[600px]
              bg-cover
              bg-center
              bg-no-repeat
            "
            style={{
              backgroundImage: `url(${product.image})`,
            }}
          >
            <div
              className="
                absolute
                inset-0
                bg-black/20
              "
            ></div>

            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                p-6
                bg-gradient-to-t
                from-black/80
                via-black/30
                to-transparent
              "
            >
              <p className="text-orange-400 font-semibold uppercase">
                {product.category}
              </p>

              <h2 className="text-3xl font-bold text-white mt-1">
                {product.name}
              </h2>
            </div>
          </div>

          <div className="p-6 sm:p-10 flex flex-col justify-center">
            <p className="text-orange-500 font-semibold uppercase">
              {product.category}
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold mt-2">
              {product.name}
            </h1>

            <p className="text-2xl font-bold text-orange-500 mt-5">
              ₹{product.price}
            </p>

            <p className="text-gray-600 mt-6 leading-7">
              {product.description}
            </p>

            <div className="mt-6">
              <span
                className={`
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-semibold
                  ${
                    product.availability
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
              >
                {product.availability ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* ORDER BUTTON */}

            {product.availability && (
              <button
                className="
                  w-full
                  mt-8
                  py-3
                  rounded-full
                  bg-black
                  text-white
                  font-semibold
                  hover:bg-orange-500
                  transition
                  duration-300
                "
              >
                Order Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
