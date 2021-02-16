const express = require('express')
const router = express.Router()

const ProductController = require('./product-controller')

router.post('/addProduct', ProductController.addProduct)
router.post('/removeProduct', ProductController.removeProduct)
router.post('/updateProduct', ProductController.updateProduct)
router.post('/productOrdered', ProductController.productOrdered)
router.get('/', ProductController.indexProducts)


module.exports = router
