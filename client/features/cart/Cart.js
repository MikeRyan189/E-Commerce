import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCartAsync, selectCart, removeFromCartAsync } from "./cartSlice";

import { selectProducts } from "../allproducts/productsSlice";
import { fetchProductsAsync } from "../allproducts/productsSlice";

import { selectMe } from "../auth/authSlice";
import { editCartAsync } from "../cart/cartSlice";

const Cart = () => {
  const me = useSelector(selectMe);
  const meId = me.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart);
  const cartId = cart.id;
  const products = cart.products;

  let totalMap;
  if (products && products.length) {
    totalMap = products.map((product) => {
      return product.price * product.cartProduct.quantity;
    });
  } else {
    totalMap = [];
  }
  let total = 0;
  if (totalMap[0]) {
    total = totalMap.reduce((a, b) => a + b);
  }
  // console.log("TOTALLL: ", total)

  useEffect(() => {
    dispatch(getCartAsync(me.id));
  }, [dispatch]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCartAsync({ productId, meId })).then(() => {
      dispatch(getCartAsync(meId));
    });
  };

  const handleAddToCart = (product) => {
    const amount = 1;
    const id = product.id;
    dispatch(editCartAsync({ cartId, id, amount })).then(() =>
      dispatch(getCartAsync(meId))
    );
  };

  const handleDecrementCart = (product) => {
    const amount = -1;
    const id = product.id;
    dispatch(editCartAsync({ cartId, id, amount })).then(() =>
      dispatch(getCartAsync(me.id))
    );
  };

  const handleNavigate = () => {
    navigate("/checkout");
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl text-center mb-6">Your products</h1>
      <h1 className="text-xl text-center mb-6">Total: {total}</h1>
      <div className="grid grid-cols-3 gap-4">
        {products && products.length
          ? products.map((product) => (
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <Link to={`/products/${product.id}`}>
                  <img className="w-full" src={product.imageUrl} />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{product.name}</div>
                    <p className="text-gray-700 text-base">${product.price}</p>
                    <p className="text-gray-700 text-base">Quantity: {product.cartProduct.quantity}</p>
                  </div>
                </Link>
                <div className="px-6 py-4">

                  <button className=" text-white bg-gray-700 hover:bg-gray-900 p-3 rounded-lg hover:shadow-md" onClick={() => handleAddToCart(product)}>
                    Increase Quantity
                  </button>
                  <button className= " text-white bg-gray-700 hover:bg-gray-900 p-3 rounded-lg hover:shadow-md" onClick={() => handleDecrementCart(product)}>
                    Decrease Quantity
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleRemoveFromCart(product.id)}>
                    Remove all from Cart
                    </button>
                </div>
              </div>
            ))
          : ""}
      </div>
      <button
        className="bg-sky-400 text-white py-1.5 px-3 rounded-lg hover:bg-sky-600"
        onClick={handleNavigate}
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;