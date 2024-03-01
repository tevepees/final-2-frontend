import React, { useEffect, useState } from "react";
import { BsPlus, BsEyeFill, BsBag } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { IoArrowBackCircle } from "react-icons/io5";
import {
  IoMdArrowForward,
  IoMdAdd,
  IoMdClose,
  IoMdRemove,
} from "react-icons/io";
import { useParams } from "react-router-dom";
import axios from "axios";
import ItemList from "./ItemList";

export default function Product({ cartItems, setCartItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  const addToCart = (product) => {
    const addedProduct = {
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
    };
    const checkItem = cartItems.find((item) => item.id === addedProduct.id);
    if (checkItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === addedProduct.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cartItems, { ...addedProduct, quantity: 1 }];
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  const changePage = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  const { productId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://fakestoreapi.com/products`
        );

        const expandedData = [];
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 20; j++) {
            const product = response[j];
            expandedData.push({ ...product, id: 20 * i + (j + 1) });
            setData(expandedData);
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="products" className="pt-[8rem]">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold mb-10 text-center">
          Explore Our Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-screen-lg mx-auto">
          {data
            .slice((currentPage - 1) * 8, currentPage * 8)
            .map((product, index) => (
              <ItemList addToCart={addToCart} key={index} product={product} />
            ))}
        </div>
        <nav className="my-4">
          <ul className="flex justify-center">
            {[...Array(Math.ceil(data.length / jobsPerPage)).keys()].map(
              (num) => (
                <li key={num}>
                  <button
                    className={`mx-1 px-6 py-4 rounded shadow font-bold ${
                      currentPage === num + 1
                        ? "text-white bg-black font-bold"
                        : "bg-white text-black border-solid border border-black"
                    }`}
                    onClick={() => changePage(num + 1)}
                  >
                    {num + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </section>
  );
}
