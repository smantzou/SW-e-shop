const express = require('express')
const router = express.Router()

const OrderController = require('./order-controller')

router.post('/addOrder/',OrderController.addOrder)
router.post('/deleteOrder/:id',OrderController.deleteOrder)
router.post('/updateOrder', OrderController.updateOrder)
router.get('/',OrderController.indexOrders)
router.get('/getCustomerOrders',OrderController.getCustomerOrders)



module.exports = router