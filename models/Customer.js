const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema(
    {
        name:{
            type: String,
        },
        surname:{
            type:String,
        },
        email :{
            type: String,
        },
        telephoneNumber : {
            type: String,
        },
        username:{
            type : String,
        },
        password : {
            type: String
        },
        address:{
            type : String,
        }
    }
);

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;