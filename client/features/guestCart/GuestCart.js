
import React, {useState} from 'react'

const GuestCart = () => {
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
      return product.price  * product.cartProduct.quantity
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
      console.log("ID",id)
    };
  
    const handleDecrementCart = (product) => {
      const amount = -1
      const id = product.id
      dispatch(editCartAsync({cartId, id, amount})).then(()=>
        dispatch(getCartAsync(me.id))
      )
      console.log("ID",id)
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
              
              
              {/* <p>Quantity: {cartProduct[0].quantity}</p> */}
              <button onClick={()=> handleRemoveFromCart(product.id)}>Remove all from Cart</button>
              </div>
            )): ""}
        </ul>
      </div>
      
  </div>
   )
  }
   


export default GuestCart