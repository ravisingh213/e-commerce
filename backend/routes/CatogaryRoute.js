const express = require("express");
const { requireSignIn, isAdmin } = require("../middileware/authMiddileware");
const { catogaryController, updateCatogaryController, deleteCatogaryController, catogaryListController, singleCatogaryController } = require("../contorllers/catogaryController");

const router = express.Router();


// routes

router.post('/create-catogary', requireSignIn, isAdmin, catogaryController)

router.post('/update-catogary/:id', requireSignIn, isAdmin, updateCatogaryController)

router.get('/delete-catogary/:id', requireSignIn, isAdmin, deleteCatogaryController)

router.get('/single-catogary/:slug', requireSignIn, isAdmin, singleCatogaryController)

router.get('/list-catogary', requireSignIn, catogaryListController)



module.exports = router