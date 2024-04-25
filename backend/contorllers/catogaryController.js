const catogeryModel = require("../models/catogeryModel")
const slugify = require('slugify')



const catogaryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(400).send({
                success: false,
                message: "name is required"
            })
        }

        const existingCatogary = await catogeryModel.findOne({ name })

        if (existingCatogary) {
            return res.status(400).send({
                success: false,
                message: "catogary alreday exist"
            })
        }

        const catogary = await new catogeryModel({ name, slug: slugify(name, '_') }).save()

        res.status(201).send({
            status: true,
            message: "catogry create successfully",
            catogary
        })



    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Catogary Not Created"
        })
    }
}

const updateCatogaryController = async (req, res) => {
    try {
        const { name } = req.body
        // console.log(req.params.id)
        if (!name) {
            return res.status(400).send({
                success: false,
                message: "name is required"
            })
        }

        const catogary = await catogeryModel.findByIdAndUpdate({ _id: req.params.id }, { name, slug: slugify(name, '_') }, { new: true })

        res.status(201).send({
            status: true,
            message: "catogry update successfully",
            catogary
        })



    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Catogary Not Updated"
        })
    }
}

const deleteCatogaryController = async (req, res) => {
    try {

        const catogary = await catogeryModel.findByIdAndDelete({ _id: req.params.id }, { new: true })

        res.status(201).send({
            status: true,
            message: "catogry Delete successfully",
            catogary
        })



    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Catogary Not Deleted"
        })
    }
}

const catogaryListController = async (req, res) => {
    try {

        const catogary = await catogeryModel.find().sort({ createdAt: -1 })

        res.status(201).send({
            status: true,
            message: "catogry List Fetch successfully",
            catogary
        })



    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Catogary List  Not Fetched"
        })
    }
}

const singleCatogaryController = async (req, res) => {
    try {

        // console.log(req.params.slug)
        const catogary = await catogeryModel.findOne({ slug: req.params.slug })

        res.status(200).send({
            status: true,
            message: "catogry Fetch successfully",
            catogary
        })



    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Catogary   Not Fetched"
        })
    }
}

module.exports = { catogaryController, updateCatogaryController, deleteCatogaryController, catogaryListController, singleCatogaryController }