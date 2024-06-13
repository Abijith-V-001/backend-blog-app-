const mongoose = require("mongoose")
const schema = mongoose.Schema(
    {
        "name": String,
        "email": String,
        "pwd": String
    }
)

let blogmodel = mongoose.model("users", schema);
module.exports = { blogmodel }