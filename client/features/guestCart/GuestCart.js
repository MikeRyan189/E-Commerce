
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
              <Link href={`/products/${product.id}`}>
                <img className="w-full" src={product.imageUrl} />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{product.name}</div>
                  <p className="text-gray-700 text-base">${product.price}</p>
                </div>
              </Link>
              <div className="px-6 py-4">
                <button onClick={() => handleAddCount(product)}>
                  Increase Quantity
                </button>
                <button onClick={() => handleDecreaseCount(product)}>
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
   


export default GuestCart