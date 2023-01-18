


import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { getCartAsync, selectCart, removeFromCartAsync } from './cartSlice'

import { selectProducts } from '../allproducts/productsSlice';
import { fetchProductsAsync } from '../allproducts/productsSlice';


import { selectMe } from '../auth/authSlice';
import { editCartAsync } from "../cart/cartSlice";


const Cart = () => {

  const me = useSelector(selectMe)

  const cart = useSelector(selectCart)
  const meId = me.id
  const cartId = cart.id
  const products = cart.products
  const dispatch = useDispatch()

  

  let totalMap;
  if(products && products.length){
  totalMap = products.map((product)=>{
    return product.price  * product.cartProduct.quantity
  })
  }else{
    totalMap = []
  }
  let total = 0
  if(totalMap[0]){
  total = totalMap.reduce((a,b)=> a + b)
  }
  // console.log("TOTALLL: ", total)


  useEffect(() => {
    dispatch(getCartAsync(me.id))
  }, [dispatch] );
  

  const handleRemoveFromCart = (productId)=>{
    dispatch(removeFromCartAsync({productId, meId})).then(()=>{
      dispatch(getCartAsync(meId))
    })
  }
  
  const handleAddToCart = (product) => {
    const amount = 1
    const id = product.id
    dispatch(editCartAsync({cartId, id, amount})).then(()=>
      dispatch(getCartAsync(meId))
    )
  };

  const handleDecrementCart = (product) => {
    const amount = -1
    const id = product.id
    dispatch(editCartAsync({cartId, id, amount})).then(()=>
      dispatch(getCartAsync(me.id))
    )
  };
  
 return (
  <div id="allProducts">
  <div>
    <h1>Your products</h1>
    <h1>CART TOTAL: ${total}</h1>
    <button>Checkout</button>
      <ul className="media-list">
        {products && products.length ? 
          products.map((product) => (
            <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.imageUrl} />
              <p>{product.name}</p>
              <p>${product.price} each</p>
              <p>Quantity: {product.cartProduct.quantity}</p>
            </Link>
            <button onClick={()=>handleAddToCart(product)}>Increase Quantity</button>
            <button onClick={()=>handleDecrementCart(product)}>Decrease Quantity</button>
            <button onClick={()=> handleRemoveFromCart(product.id)}>Remove all from Cart</button>
            </div>
          )): ""}
      </ul>
    </div>
    
</div>
 )
}
 
export default Cart

