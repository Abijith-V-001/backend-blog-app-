const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { blogmodel } = require('./Models/Blog')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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

    res.json({ "status": "success" })
})

app.post("/signin", (req, res) => {
    let input = req.body
    blogmodel.find({ "email": req.body.email }).then(
        (response) => {

            if (response.length > 0) {
                let dbpwd = response[0].pwd
                console.log(dbpwd)
                bcrypt.compare(input.pwd, dbpwd, (error, ismatch) => {
                    if (ismatch) {
                        jwt.sign({email:input.emailid},"blog-app",{expiresIn:"1d"},(error,token)=>{
                            if (error) {
                                res.json({"status":"unable to create token"})
                            } else {
                                res.json({"status":"Logged in","userId":response[0]._id,"token":token})
                            }
                        })
                    } else {
                        res.json({ "status": "Password Incorrect" })
                    }
                }
                )

            } else {
                res.json({ "status": "Entered email id is not registered" })
            }
        }
    ).catch()
})




app.listen(8083, () => {
    console.log("Server Running")
})