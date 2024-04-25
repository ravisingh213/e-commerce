const { default: slugify } = require("slugify");
const productModel = require("../models/productModel")
const fs = require('fs')
var braintree = require("braintree");

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: `${process.env.BRAINTREE_Merchant_ID}`,
    publicKey: `${process.env.BRAINTREE_PUBLIC_KEY}`,
    privateKey: `${process.env.BRAINTREE_PRIVATE_KEY}`,
});

// payment gatway controoler

//token
const brainTreeTokenControoler = async () => {

}
//payment
const brainTreePaymentControoler = async () => {

}

const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quatity, shipping } = req.fields;
        // console.log(req.files)
        const { photo } = req.files;
        console.log(photo)
        // validation

        switch (true) {
            case !name:
                return res.status(500).send({
                    success: false,
                    message: "name required"
                })
            case !description:
                return res.status(500).send({
                    success: false,
                    message: "description required"
                })
            case !price:
                return res.status(500).send({
                    success: false,
                    message: "price required"
                })
            case !category:
                return res.status(500).send({
                    success: false,
                    message: "catogary required"
                })
            case !quatity:
                return res.status(500).send({
                    success: false,
                    message: "quatity required"
                })
            case photo & photo.size > 100000:
                return res.status(500).send({
                    success: false,
                    message: "photo is required and less than 1mb"
                })
        }
        const product = new productModel({ ...req.fields, slug: slugify(name) })
        // console.log(photo)
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }

        const productres = await product.save()
        res.status(201).send({
            success: true,
            message: 'product create successfully',
            product: productres
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Product Not Created",
            error
        })
    }

}

const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quatity, shipping } = req.fields;
        const { photo } = req.files;
        // validation

        switch (true) {
            case !name:
                return res.status(500).send({
                    success: false,
                    message: "name required"
                })
            case !description:
                return res.status(500).send({
                    success: false,
                    message: "description required"
                })
            case !price:
                return res.status(500).send({
                    success: false,
                    message: "price required"
                })
            case !category:
                return res.status(500).send({
                    success: false,
                    message: "catogary required"
                })
            case !quatity:
                return res.status(500).send({
                    success: false,
                    message: "quatity required"
                })
            case photo & photo.size > 100000:
                return res.status(500).send({
                    success: false,
                    message: "photo is required and less than 1mb"
                })
        }



        const product = await productModel.findByIdAndUpdate({ _id: req.params.id }, { ...req.fields, slug: slugify(name) }, { new: true })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(201).send({
            success: true,
            message: 'product update successfully',
            product: product
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Product Not update",
            error
        })
    }

}

const findAllProductList = async (req, res) => {
    try {
        const products = await productModel.find({}).select('-photo').populate('category').limit(3).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            message: "proct list fectch ",
            products,
            totalCount: products.length
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "proct list fectch issue",
            error
        })
    }
}

const deleteProductController = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete({ _id: req.params.id }, { new: true }).select("-photo")
        res.status(200).send({
            success: true,
            message: "product delete",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "product not delete",
            error
        })
    }
}

const singleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select('-photo').populate('category')
        res.status(200).send({
            success: true,
            message: 'fetch product',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "not fetch",
            error
        })
    }
}

const fetchPhotoController = async (req, res) => {
    try {
        const productPhoto = await productModel.findById(req.params.pId).select('photo')
        console.log(productPhoto)
        if (productPhoto.photo.data) {
            res.set("content-type", productPhoto.photo.contentType)
            return res.status(200).send(productPhoto.photo.data)
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: true,
            message: 'photo not fetch',
            error
        })
    }
}

const productFilterController = async (req, res) => {
    try {
        const products = await productModel.find({ category: req.params.cId })
        console.log(products)
        return res.status(200).send({
            success: true,
            message: 'products fetched by category',
            products
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: true,
            message: 'photo not fetch',
            error
        })
    }
}

module.exports = { createProductController, findAllProductList, deleteProductController, updateProductController, singleProductController, fetchPhotoController, productFilterController, brainTreeTokenControoler, brainTreePaymentControoler }