const express = require("express");
const { requireSignIn, isAdmin } = require("../middileware/authMiddileware");
const { createProductController, findAllProductList, deleteProductController, updateProductController, singleProductController, fetchPhotoController, productFilterController, brainTreeTokenControoler, brainTreePaymentControoler } = require("../contorllers/productController");
const ExpressFormidable = require("express-formidable");

const router = express.Router();

//routes

router.post('/create-product', requireSignIn, isAdmin, ExpressFormidable(), createProductController)

router.post('/update-product/:id', requireSignIn, isAdmin, ExpressFormidable(), updateProductController)


router.get('/list-product', findAllProductList)

router.get('/single-product/:slug', singleProductController)

router.get('/photo-product/:pId', fetchPhotoController)


router.get('/filterByCatogary-product/:cId', productFilterController)



router.get('/delete-product/:id', requireSignIn, isAdmin, deleteProductController)

//payment gatway route
//token
router.get('/braintree/token', brainTreeTokenControoler)

//payment
router.post('/braintree/payment', requireSignIn, brainTreePaymentControoler)

module.exports = router