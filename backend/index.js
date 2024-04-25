const express = require("express");
const dotenv = require("dotenv")
const connect = require("./confiq/db")
const cors = require("cors")

const authRout = require("./routes/authRoute")

const catogaryRoute = require('./routes/CatogaryRoute')

const productRoutes = require("./routes/productRoutes")

// congiq env
dotenv.config()

connect()

const app = express();

const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json());

app.use("/api/v1/auth", authRout)

app.use("/api/v1/catogary", catogaryRoute)

app.use("/api/v1/product", productRoutes)

app.get("/", (req, res) => {
    res.send("<h1>Hello welcome node project</h1>")
})

app.listen(port, () => {
    console.log(`server is running on 127.0.0.1:${port}`)
})