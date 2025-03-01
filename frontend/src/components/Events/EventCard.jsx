import React, { useEffect } from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white rounded-lg p-4 my-5 shadow-md">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center p-4">
          <img
            src={data?.images?.[0]?.url}
            alt="Product"
            className="object-contain w-full h-auto max-h-96"
          />
        </div>
        {/* Details Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-4">
          <h2 className={`${styles.productTitle} text-lg md:text-xl font-bold mb-2`}>
            {data.name}
          </h2>
          <p className="text-sm md:text-base mb-4">{data.description}</p>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h5 className="font-medium text-base text-red-600 pr-3 line-through">
                {data.originalPrice}$
              </h5>
              <h5 className="font-bold text-xl text-gray-800">
                {data.discountPrice}$
              </h5>
            </div>
            <span className="font-normal text-base text-green-600">
              {data.sold_out} sold
            </span>
          </div>
          <CountDown data={data} />
          <div className="flex flex-col sm:flex-row items-center mt-4 space-y-2 sm:space-y-0 sm:space-x-4">
            <Link to={`/product/${data._id}?isEvent=true`} className="w-full sm:w-auto">
              <div className={`${styles.button} text-white text-center py-2 px-4 rounded`}>
                See Details
              </div>
            </Link>
            <button
              onClick={() => addToCartHandler(data)}
              className={`${styles.button} text-white w-full sm:w-auto text-center py-2 px-4 rounded`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
