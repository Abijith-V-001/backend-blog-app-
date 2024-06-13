const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { blogmodel } = require('./Models/Blog')
const bcrypt = require("bcryptjs")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://abijith0a31:abijith1415@cluster0.fodkdeb.mongodb.net/blogDB?retryWrites=true&w=majority&appName=Cluster0")


const generateHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

app.post("/signup", async (req, res) => {
    let input = req.body
    let hashedPassword = await generateHashedPassword(input.pwd)
    console.log(hashedPassword)
    input.pwd = hashedPassword
    let Blog = new blogmodel(input)
    Blog.save()

    res.send("Sign up for working")
})



app.listen(8084, () => {
    console.log("Server Running")
})