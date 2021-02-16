const express = require('express')
const router = express.Router()

const OrderController = require('./order-controller')

router.post('/order/',OrderController.addOrder)
router.delete('/:id',OrderController.deleteOrder)
router.post('/updateOrder/', OrderController.updateOrder)
router.get('/',OrderController.indexOrders)
router.get('/customer/:id',OrderController.getCustomerOrders)



module.exports = router