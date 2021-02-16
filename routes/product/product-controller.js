const path = require('path')
const Product = require('../../models/Product')

const addProduct = (req, res, next) => {
    let product = new Product({
        title: req.body.title,
        description: req.body.description,
        inStock: req.body.inStock,
        price: req.body.price,
    })
    product.save()
        .then(product => {
            res.json({ status: true, message: "Product added to Stock!" })
        })
        .catch(error => {
            res.json({
                status: false,
                message: "Error Occured!"
            })
        })

}
const removeProduct = (req, res, next) => {
    let ObjId = req.body.ObjId
    Product.findOneAndRemove(ObjId)
        .then(() => {
            res.json({
                status: true,
                message: 'Producted removed successfully!'
            })
        })
        .catch(error => {
            res.json({
                status: false,
                message: 'An error has occured!'
            })
        })

}
const updateProduct = (req, res, next) => {
    let ObjId = req.body.ObjId

    let updatedProduct = {
        title: req.body.title,
        description: req.body.description,
        inStock: req.body.inStock,
        price: req.body.price
    }
    Product.findByIdAndUpdate(ObjId, { $set: updatedProduct }, { new: true })
        .then(() => {
            res.json({
                status: true,
                message: 'Product updated successfully!'
            })
        })
        .catch(function (error) {
            res.json({
                status: false,
                message: 'An error has occurred'
            })
        })




}
const productOrdered = (req, res, next) => {
    let ObjId = req.body.ObjId
    let quantityOrdered = req.body.quantityOrdered
    let newStock = parseInt(req.body.inStock) - parseInt(quantityOrdered)
    console.log(req.body.inStock,quantityOrdered)
    let updatedProduct = {
        title: req.body.title,
        description: req.body.description,
        inStock: newStock,
        price: req.body.price
    }
    console.log(newStock)
    if (newStock < 0) {
        res.json({
            status: false,
            message: 'Quantity ordered larger than Stock'
        })
        res.end()
    }
    else{
        Product.findByIdAndUpdate(ObjId, { $set: updatedProduct }, { new: true })
        .then(() => {
            res.json({
                status: true,
                message: 'Product quantity was decreased'
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
const indexProducts = (req,res,next)=>{
    Product.find()
    .then(response=>{
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





module.exports = {
    addProduct, removeProduct, updateProduct, productOrdered, indexProducts
}