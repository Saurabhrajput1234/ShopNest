import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";

const server = process.env.REACT_APP_ENDPOINT_API;

const ProductDetails = ({ data }) => {
  const { products } = useSelector((state) => state.products);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.shop?._id) {
      dispatch(getAllProductsShop(data.shop._id));
    }
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist, dispatch]);

  // Remove from wish list
  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  // Add to wish list
  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  // Add to cart
  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // Send message
  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className="w-[90%] md:w-[80%] mx-auto py-5">
          <div className="flex flex-col md:flex-row">
            {/* Left Section: Product Images */}
            <div className="w-full md:w-1/2">
              {data.images && data.images[select] && (
                <img
                  src={data.images[select].url}
                  alt="Product"
                  className="w-[80%] mx-auto"
                />
              )}
              <div className="flex justify-center mt-4">
                {data.images &&
                  data.images.map((i, index) => (
                    <img
                      key={index}
                      src={i.url}
                      alt="Thumbnail"
                      className={`h-[200px] w-[150px] object-cover mx-2 cursor-pointer ${
                        select === index
                          ? "border-2 border-teal-500"
                          : "border"
                      }`}
                      onClick={() => setSelect(index)}
                    />
                  ))}
              </div>
            </div>
            {/* Right Section: Product Details */}
            <div className="w-full md:w-1/2 pt-5">
              <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
              <p className="text-gray-600 mb-4">{data.description}</p>
              <div className="flex items-center">
                <h4 className="text-xl text-teal-500 font-bold">
                  {data.discountPrice}$
                </h4>
                {data.originalPrice && (
                  <h3 className="text-lg text-gray-400 line-through ml-4">
                    {data.originalPrice}$
                  </h3>
                )}
              </div>

              {/* Quantity & Wishlist */}
              <div className="flex items-center mt-6 space-x-4">
                <button
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                  onClick={decrementCount}
                >
                  -
                </button>
                <span className="px-4 py-2 bg-gray-200">{count}</span>
                <button
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                  onClick={incrementCount}
                >
                  +
                </button>

                <div>
                  {click ? (
                    <AiFillHeart
                      size={30}
                      className="cursor-pointer text-red-500"
                      onClick={() => removeFromWishlistHandler(data)}
                    />
                  ) : (
                    <AiOutlineHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => addToWishlistHandler(data)}
                    />
                  )}
                </div>
              </div>

              {/* Add to Cart */}
              <button
                className="mt-6 w-full bg-gradient-to-r from-teal-400 to-teal-500 text-white rounded h-11 flex items-center justify-center shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                onClick={() => addToCartHandler(data._id)}
              >
                Add to Cart <AiOutlineShoppingCart className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
