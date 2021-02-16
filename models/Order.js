const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        orderedBy : [{
            type : mongoose.Schema.Types.ObjectId, ref:'Customer',
        }],
        productOrdered : [{
            type : mongoose.Schema.Types.ObjectId, ref:'Product',
        }],
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