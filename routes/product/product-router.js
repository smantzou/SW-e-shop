const express = require('express')
const router = express.Router()

const ProductController = require('./product-controller')

router.post('/product', ProductController.addProduct)
router.delete('/:id', ProductController.removeProduct)
router.post('/update', ProductController.updateProduct)
router.post('/order', ProductController.productOrdered)
router.get('/', ProductController.indexProducts)


module.exports = router
