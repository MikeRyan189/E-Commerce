import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSingleProduct,
  fetchSingleProduct,
} from "../singleProduct/singleProductSlice.js";
import { EditProduct } from "../singleProduct/EditProduct";

import { editCartAsync } from "../cart/cartSlice.js";

import { selectMe } from '../auth/authSlice';

// TODO IMPLEMENT isADMIN VARIABLE

const SingleProduct = () => {
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const singleProduct = useSelector(selectSingleProduct);
  const me = useSelector(selectMe)
  console.log(" ME.if type: ",typeof me.id)

  const cartId = me.id
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch]);

  const {  name, price, description, imageUrl, quantity, cartQuantity } =
    singleProduct.singleProduct;

  const handleAddToCart = () => {
    // dispatch(addToCart(id));
    
    dispatch(editCartAsync({cartId, id}))
    console.log("ID",id)
  };

  const handleAddToGuestCart = () => {
    localStorage.setItem(`${id}`, JSON.stringify(singleProduct.singleProduct))
       };
   
    
  return (
    <div id="singleProduct">
      <div id="singleProductInfo">
        <img src={imageUrl} />
        <h1>{name}</h1>
        <h2>${price}</h2>
        <p>{description}</p>
        <p>Quantity: {quantity}</p>
        <p>Cart Quantity: {cartQuantity}</p>
      </div>
      {/* <button onClick={() => handleAddToCart()}>Add to cart</button> */}
      <button onClick={isLoggedIn ? () => handleAddToCart() :()=> handleAddToGuestCart()}>Add to cart</button>
    </div>
  );
};

{
  /* isAdmin ?         <EditProduct />
        : null      </div>
    </div>
  );
}; */
}

export default SingleProduct;
