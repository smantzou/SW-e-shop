const { response } = require('express')
const Order = require('../../models/Order')

const addOrder = (req, res, next) => {
    let orderedBy = req.body.orderedBy
    let productOrdered = req.body.productOrdered
    let orderedAt = req.body.orderedAt
    let paymentMethod = req.body.paymentMethod
    let quantity = req.body.quantity

    if ((orderedBy = '') || (productOrdered = '') || (orderedAt == '') || (paymentMethod == '') || (orderedAt == null) || (quantity == null)) {
        res.json({
            status: false,
            message: 'Order information missing!'
        })
        res.end()
    }
    else {
        let order = new Order({
            orderedBy: req.body.orderedBy,
            productOrdered: req.body.productOrdered,
            orderedAt: req.body.orderedAt,
            paymentMethod: req.body.paymentMethod,
            quantity: req.body.quantity
        })
        order.save()
            .then(() => {
                res.json({
                    status: true,
                    message: 'Order placed successfully!'
                })
            })
            .catch(error => {
                res.json({
                    status: false,
                    message: error
                })
            })
    }
}
const deleteOrder = (req, res, next) => {
    let ObjId = req.params.id
    Order.findByIdAndDelete(ObjId)
        .then(() => {
            res.json({
                status: true,
                message: 'Order deleted successfully!'
            })
        })
        .catch(error => {
            res.json({
                status: false,
                message: 'An error has Occured!'
            })
        })
}
const updateOrder = (req, res, next) => {
    let ObjId = req.body.ObjId
    if ((req.body.orderedBy == null) || (req.body.productOrdered == null) || (req.body.orderedAt == null) || (req.body.paymentMethod == '') || (req.body.quantity == null)) {
        res.json({
            status: false,
            message: "Please enter all fields!"
        })
        res.end()
    }
    else {
        let updatedOrder = {
            orderedBy: req.body.orderedBy,
            productOrdered: req.body.productOrdered,
            orderedAt: req.body.orderedAt,
            paymentMethod: req.body.paymentMethod,
            quantity: req.body.quantity
        }

        Order.findByIdAndUpdate(ObjId, { $set: updatedOrder }, { new: true })
            .then(() => {
                res.json({
                    status: true,
                    message: "Order Updated successfully"
                })
            })
            .catch(function (error) {
                res.json({
                    status: false,
                    message: error
                })
            })

    }
}
const indexOrders = (req, res, next) => {
    Order.find()
    .then(response =>{
        res.json({
            status : true,
            response
        })
    })
    .catch(error =>{
        res.json({
            status : false,
            message : "An error has occured!"
        })
    })
}
const getCustomerOrders = (req, res, next) => {
    let customerId = req.body.customerId
    
    Order.findOne({orderedBy: customerId})
    .then(response=>{
        res.json({
            status : true,
            response
        })
    })
    .catch(error =>{
        res.json({
            message : 'An error has occured!'
        })
    })
}


module.exports = {
    addOrder, deleteOrder, updateOrder, indexOrders, getCustomerOrders
}