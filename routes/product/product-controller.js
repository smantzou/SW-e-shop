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
    addProduct, removeProduct, updateProduct, indexProducts
}