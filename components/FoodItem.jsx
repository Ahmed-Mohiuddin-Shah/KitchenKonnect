import { useCartStore } from "@/store/cart";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";

export default function FoodItem({ item }) {
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleAddToCart = (id) => {
    addToCart(id);
    toast.success("Item added to cart");
  };

  return (
    <>
      <article className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a
          onClick={() => setShowModal(true)}
          className="flex justify-center items-center"
        >
          <Image
            src={item.image}
            className="p-8 rounded-t-lg"
            alt="product-img"
            width={300}
            height={300}
            priority
          />
        </a>
        <div className="p-5">
          <a onClick={() => setShowModal(true)}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.name}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {item.description}
          </p>

          <div className="flex items-center mb-4 justify-between">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {[1, 2, 3, 4, 5].map((index) => (
                <svg
                  key={index}
                  className={`w-4 h-4 ${
                    index <= rating
                      ? "text-yellow-300"
                      : "text-gray-200 dark:text-gray-600"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                  onClick={() => handleStarClick(index)}
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>
            <span className="bg-orange-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-gray-800 ms-3">
              {rating}.0
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Rs. {item.price}
            </span>
            <button
              className="text-white bg-primary hover:bg-primary3 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:hover:bg-primary dark:focus:ring-0"
              onClick={() => handleAddToCart(item._id)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </article>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <p></p>
      </Modal>
    </>
  );
}
