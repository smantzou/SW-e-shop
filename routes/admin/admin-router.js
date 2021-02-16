const express = require('express')
const router = express.Router()

const AdminController = require('./admin-controller')

router.post('/adminlogin', AdminController.adminlogin)
router.post('/registerAdmin',AdminController.registerAdmin)
router.post('/updateAdmin',AdminController.updateAdmin)
router.post('/deleteAdmin',AdminController.deleteAdmin)
router.get('/', AdminController.indexAdmins)

module.exports = router