const router = require("express").Router();
module.exports = router;

const {
  models: { Product, Cart, User, CartProduct },
} = require("../db");

// All products in cart route
router.get("/", async (req, res, next) => {
  try {
    const products = await Cart.findAll({ where: { userId: req.user.id } });
    res.send(products);
  } catch (error) {
    console.log("Error in all products route");
    next(error);
  }
});

router.delete("/:cartId", async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.cartId);
    res.send(await cart.destroy());
  } catch (error) {
    console.log("Error in delete cart route");
    next(error);
  }
});


router.put("/:cartId", async (req, res, next) => {
  try {
    const cartX = await CartProduct.findOne({where: {productId: req.body.id, cartId: req.params.cartId}})
    if(cartX){
      res.send(cartX.increment(['quantity'], {by: req.body.amount}))
    }else{
    const cart = await Cart.findByPk(req.params.cartId);
    res.send(await cart.addProduct(req.body.id));
    }
  } catch (error) {
    console.log("Error  in update cart route");
    next(error);
  }
});


router.put("/remove/:cartId", async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.body.meId);
    const product = await Product.findByPk(req.body.productId);
    res.send(await cart.removeProduct(product));
  } catch (error) {
    console.log("Error in remove from cart route");
    next(error);
  }
});


router.get("/:id/cart", async (req, res, next) => {
  try {
    const products = await Cart.findByPk(req.params.id, { include: Product});
    res.send(products);
  } catch (error) {
    console.log("Error in all products route");
    next(error);
  }
});
