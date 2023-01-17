


import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { getCartAsync, selectCart, removeFromCartAsync } from './cartSlice'

import { selectProducts } from '../allproducts/productsSlice';
import { fetchProductsAsync } from '../allproducts/productsSlice';
import { getAllCartProductAsync, selectCartProduct } from './cartProductSlice';

import { selectMe } from '../auth/authSlice';
import { editCartAsync } from "../cart/cartSlice";


const Cart = () => {

  const me = useSelector(selectMe)
  const cartProduct = useSelector(selectCartProduct)
  
  console.log("CART PRODUCT: ", cartProduct)

 
  const cart = useSelector(selectCart)
  // console.log("CART IN CART COMPONENT: ", cart)
  const meId = me.id
  const cartId = cart.id
  // console.log("CARTID: ",typeof cartId)
  const products = cart.products
  const dispatch = useDispatch()

  console.log("PRODUCTSSSS : ", cart)


// Get all cartProducts where cartId: cartID
// add cartProduts to state
// Map through cartProducts and get quantity of each


  let totalMap;
  if(products && products.length){
  totalMap = products.map((product)=>{
    return product.price
  })
  }else{
    totalMap = []
  }
  let total = 0
  if(totalMap[0]){
  total = totalMap.reduce((a,b)=> a + b)
  }
  

  //  COULD USE COUNT MAGIC METHOD
  // const getNumber = (productId)=>{
  //   const idArray = products.filter((product) => {
  //     return Number(product.id) === productId
  //   })
  //     return idArray.length
  // }

  useEffect(() => {
    dispatch(getCartAsync(me.id))
  //   .then(()=>{
  //   dispatch(getAllCartProductAsync(me.id))
  // })
    // .then(()=>console.log( "CART PRODUCT ", cartId))
    
  }, [dispatch, handleAddToCart] );
  

  const handleRemoveFromCart = (productId)=>{
    dispatch(removeFromCartAsync({productId, meId})).then(()=>{
      dispatch(getCartAsync(me.id))
    })
  }
  
  const handleAddToCart = (product) => {
    const id = product.id
    dispatch(editCartAsync({cartId, id})).then(()=>
      dispatch(getCartAsync(me.id))
    )
    console.log("ID",id)
  };
  
 return (
  <div id="allProducts">
  <div>
    <h1>Your products</h1>
    <h1>TOTAL: {total}</h1>
      <ul className="media-list">
        {products && products.length ? 
          products.map((product) => (
            <div>
            <Link to={`/products/${product.id}`}>
              <img src={product.imageUrl} />
              <p>{product.name}</p>
              <p>${product.price}</p>
              <p>Quantity{product.cartProduct.quantity}</p>
            </Link>
            <button onClick={()=>handleAddToCart(product)}>Increase Quantity</button>
            <button>Decrease Quantity</button>
            
            
            {/* <p>Quantity: {cartProduct[0].quantity}</p> */}
            <button onClick={()=> handleRemoveFromCart(product.id)}>Delete From Cart</button>
            </div>
          )): ""}
      </ul>
    </div>
    <button>Checkout</button>
</div>
 )
}
 
export default Cart

