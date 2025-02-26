import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { backend_url } from "../../server";
import { addTocart, removeFromCart } from "../../redux/actions/cart";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  //remove from cart
  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  // Total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>Cart items is empot!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5 ">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart && cart.length} items
                </h5>
              </div>

              {/* Cart Single item */}
              <br />
              <div className="w-full border-t">
                {cart &&
                  cart.map((i, index) => {
                    return (
                      <CartSingle
                        data={i}
                        key={index}
                        quantityChangeHandler={quantityChangeHandler}
                        removeFromCartHandler={removeFromCartHandler}
                      />
                    );
                  })}
              </div>
            </div>

            <div className="px-5 mb-3">
              {/* Check out btn */}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (USD${totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      /* The line `const updateCartData = { ...data, qty: value + 1 };` is creating a new object
            `updateCartData` by spreading the properties of the `data` object and adding a new
            property `qty` with the value of `value + 1`. This is typically used to update the
            quantity of an item in the cart. */
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  // Decrement
  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <>
      <div className="border-b p-4">
        <div className="w-full flex items-center">
          <div>
            <div
              className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
              onClick={() => increment(data)}
            >
              <HiPlus size={18} color="#fff" />
            </div>
            <span className="pl-[10px]">{data.qty}</span>
            <div
              className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
              onClick={() => decrement(data)}
            >
              <HiOutlineMinus size={16} color="#7d879c" />
            </div>
          </div>
          <img
            src={`${backend_url}${data?.images[0]}`}
            className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
            alt="side card"
          />

          <div className="pl-[15px]">
            <h1>{data.name}</h1>
            <h4 className="font-[400] text-[15px] text-[#00000082]">
              {" "}
              ${data.discountPrice} * {value}
            </h4>
            <h4 className="font-[400] text-[17px] pt-[3px]  text-[#d02222] font-Roboto ">
              US${totalPrice}
            </h4>
          </div>
          <RxCross1
            size={99}
            color="#7d879c"
            className="cursor-pointer"
            onClick={() => removeFromCartHandler(data)}
          />
        </div>
      </div>
    </>
  );
};

export default Cart;
