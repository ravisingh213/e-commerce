const { hashPassword, comparePassword } = require("../helper/authHelper")
const userModel = require("../models/userModel")

const JWT = require("jsonwebtoken")
const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body

        if (!name) {
            return res.send("name is required")
        }
        if (!email) {
            return res.send("email is required")
        }
        if (!password) {
            return res.send("password is required")
        }
        if (!phone) {
            return res.send("phone is required")
        }
        if (!address) {
            return res.send("address is required")
        }

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(400).send({
                status: false,
                message: "already register please login"
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)
        const user = await new userModel({ name, email, password: hashedPassword, phone, address })

        const userRes = await user.save()

        res.status(201).send({
            status: true,
            message: "user register successfully",
            user: userRes
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in registration",
            error
        })
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(401).send({
                success: false,
                massage: "invalid email & password"
            })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                massage: "email is not register"
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(404).send({
                success: false,
                massage: "password not valid"

            })
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        res.status(200).send({
            success: true,
            massage: "login successfully",
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }, token
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            massage: "login failed",
            error
        })
    }
}

const testController = async (req, res) => {
    try {

        res.send('protected route')
    } catch (error) {
        res.send(error)
    }
}

module.exports = { registerController, loginController, testController }