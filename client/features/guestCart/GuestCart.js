
import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsAsync, selectProducts } from "../allproducts/productsSlice";
import { Link } from 'react-router-dom';



const GuestCart = () => {

 
  const handleRemoveFromCart = (product)=>{

localStorage.removeItem(`${product.id}`)
     location.reload()
  }


let productsX = []
Object.keys(localStorage).forEach((key)=>{
    const product = localStorage.getItem(key)
    productsX.push(product)
})


 const products = productsX.map((product)=>{
    let parsedProduct = JSON.parse(product)
    parsedProduct.count = 1
   return parsedProduct
 })


const handleAddCount = (product) =>{
    const cart = localStorage.getItem(`${product.id}`)
    const cartObj = JSON.parse(cart)
   cartObj.cartQuantity+=1
   const newCart = JSON.stringify(cartObj)
   localStorage.setItem(`${product.id}`, newCart)
   location.reload()
}
const handleDecreaseCount = (product) =>{
  const cart = localStorage.getItem(`${product.id}`)
  const cartObj = JSON.parse(cart)
 cartObj.cartQuantity-=1
 const newCart = JSON.stringify(cartObj)
 localStorage.setItem(`${product.id}`, newCart)
 location.reload()
}


let totalMap;
  if(products && products.length){
  totalMap = products.map((product)=>{
    return product.price  * product.cartQuantity
  })
  }else{
    totalMap = []
  }
  let total = 0
  if(totalMap[0]){
  total = totalMap.reduce((a,b)=> a + b)
  }

   return (
    <div id="allProducts">
    <div>
      <h1>Your products</h1>
      <h1>CART TOTAL: ${total}</h1>
      <button>Checkout</button>
         <ul className="media-list"> 
          { products && products.length ?
            products.map((product) => (
              <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img src={product.imageUrl} />
                <p>{product.name}</p>
                <p>${product.price} each</p>
                <p>Quantity {product.cartQuantity} </p>
              </Link>
                <button onClick={()=>handleAddCount(product)}>Add Quantity</button>
                <button onClick={()=>handleDecreaseCount(product)}>Remove Quantity</button>
              <button onClick={()=> handleRemoveFromCart(product)}>Remove all from Cart</button>
              </div>
             )): " "} 
        </ul>  
      </div>
      
  </div>
   )
  }
   


export default GuestCart