const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        orderedBy : {
            type : String
        },
        productOrdered : {
            type : String
        },
        orderedAt : {
            type : Date,
        },
        paymentMethod : {
            type : String,
        },
        quantity : {
            type : Number,
        },
    }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;