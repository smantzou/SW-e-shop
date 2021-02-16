const express = require('express')
const router = express.Router()

const AdminController = require('./admin-controller')

router.post('/login', AdminController.adminlogin)
router.post('/register',AdminController.registerAdmin)
router.post('/update',AdminController.updateAdmin)
router.delete('/:id',AdminController.deleteAdmin)
router.get('/', AdminController.indexAdmins)

module.exports = router