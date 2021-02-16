const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema(
    {
        name : {
            type : String,
        },
        surname : {
            type : String,
        },
        email : {
            type : String,
        },
        username : {
            type : String,
        },
        password : {
            type : String,
        }

    }
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin