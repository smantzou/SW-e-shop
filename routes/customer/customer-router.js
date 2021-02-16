const express = require('express')
const router = express.Router()

const CustomerController = require('./customer-controller')


router.post('/login',CustomerController.login)
router.post('/register',CustomerController.register)
router.post('/updateCustomer', CustomerController.updateCustomer)
router.post('/deleteCustomer',CustomerController.deleteCustomer)
router.get('/', CustomerController.indexCustomers)



module.exports = router