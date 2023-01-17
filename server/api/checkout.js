// GO BACK TO IF YOU WANNA USE DELETE IF NOT

const router = require("express").Router();
module.exports = router;


// CHECKOUT PORTION
router.post('/', async (req, res, next) => {
    try {
      // Retrieve the cart for the current user
      const cart = await Cart.findAll({ where: { userId: req.user.id } });
      // Clear the cart for the current user
      await Cart.destroy({ where: { userId: req.user.id } });
      // Send a response indicating that the checkout was successful
      res.send({ message: 'Checkout successful!' });
    } catch (error) {
      console.log("Error in checkout route");
      next(error);
    }
  });