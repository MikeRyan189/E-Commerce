import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkoutAsync } from "./checkoutSlice";


const Checkout = () => {
  const dispatch = useDispatch();
const navigate = useNavigate()
 

  const handleCheckout = () => {
    dispatch(checkoutAsync());
    alert('Your order is now being processed!')
    navigate('/products')
  };

  return (
    <>
    <form>
      <label>
        Name on Card:
        <input
          type='text'
        />
      </label>
      <label>
        Card Number:
        <input
          type="number"
          
        />
      </label>
      <br />
      <label>
        Expiration Date:
        <input
          type="number" 
        />
      </label>
      <br />
      <label>
        CVV:
        <input type="number"/>
      </label>
    <button onClick={handleCheckout}>
      Checkout
    </button>
    </form>

    </>
  );
};

export default Checkout;