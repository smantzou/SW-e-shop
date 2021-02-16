const express = require('express')
const router = express.Router()
const ProductRoute = require('./product/product-router')
const AdminRoute = require('./admin/admin-router')
const OrderRoute = require('./order/order-router')
const CustomerRoute = require('./customer/customer-router')

router.use('/products', ProductRoute)
router.use('/admins', AdminRoute)
router.use('/orders', OrderRoute)
router.use('/customers', CustomerRoute)

module.exports = router