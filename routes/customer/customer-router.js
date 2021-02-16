const express = require('express')
const router = express.Router()

const CustomerController = require('./customer-controller')


router.post('/login',CustomerController.login)
router.post('/register',CustomerController.register)
router.post('/update', CustomerController.updateCustomer)
router.delete('/:id',CustomerController.deleteCustomer)
router.get('/', CustomerController.indexCustomers)



module.exports = router