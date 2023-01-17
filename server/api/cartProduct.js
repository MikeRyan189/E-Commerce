const router = require("express").Router();
module.exports = router;

const {
  models: { Product, Cart, User, CartProduct },
} = require("../db");



router.get("/:cartId", async (req, res, next) => {
    console.log("GET CART PARAMS: ", req.params.cartId)
    // REQ>BODY IN UPDATE CART { cartId: 102, id: '2' }
    try {
       const cart = await CartProduct.findAll({where: { cartId: req.params.cartId}})
    // const cart = await Cart.findOne({where: {id : req.params.cartId},include : Product})
     res.send(cart)
    
    } catch (error) {
      console.log("Error 1 in update cart route");
      next(error);
    }
  });

router.get("/:cartId/:productId", async (req, res, next) => {
    console.log("REQ>BODY IN UPDATE CART", req.body)
    // REQ>BODY IN UPDATE CART { cartId: 102, id: '2' }
    try {
      const cart = await CartProduct.findOne({where: {productId: req.params.productId, cartId: req.params.cartId}})
    
     res.send(cart)
    
    } catch (error) {
      console.log("Error 1 in update cart route");
      next(error);
    }
  });
  