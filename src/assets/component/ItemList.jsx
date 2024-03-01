import React from "react";
import { BsPlus, BsEyeFill, BsBag } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { IoArrowBackCircle } from "react-icons/io5";
import {
  IoMdArrowForward,
  IoMdAdd,
  IoMdClose,
  IoMdRemove,
} from "react-icons/io";
import { Link } from "react-router-dom";

export default function ItemList({ product, addToCart }) {
  return (
    <div className="p-4 ">
      <div className="border border-[#e4e4e4] mb-4 relative overflow-hidden group transition rounded-lg">
        <div className="aspect-w-1 aspect-h-1 flex justify-center items-center p-[1rem]">
          <div className="w-[200px] h-[200px] flex justify-center items-center px-3">
            <img
              className="object-cover max-w-full max-h-full group-hover:scale-110 transition duration-300 rounded-lg"
              src={product.image}
              alt=""
            />
          </div>
        </div>
        <div className="absolute top-1 -right-11 group-hover:right-2 flex flex-row justify-center items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            style={{ background: "transparent", boxShadow: "none" }}
            className="border-none p-0"
          >
            <div
              className="flex justify-center items-center text-white w-12 h-12 bg-teal-500 rounded-full"
              onClick={() => addToCart(product)}
            >
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <Link to={`/${product.id}`}>
            <div className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl rounded-full">
              <BsEyeFill />
            </div>
          </Link>
        </div>
      </div>
      <div>
        <div className="text-sm capitalize text-black mb-1">
          {product.category}
        </div>
        <div>
          <h2 className="font-semibold mb-1">{product.title}</h2>
        </div>
        <h2 className="font-semibold">${product.price}</h2>
      </div>
    </div>
  );
}
