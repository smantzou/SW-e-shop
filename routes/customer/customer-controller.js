const Customer = require('../../models/Customer')
const bcrypt = require('bcryptjs')
const path = require('path')
const { response } = require('express')


const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    if (username == '' || password == '') {
        res.status(400).json({ status: false, message: "Please enter all fields!" })
    }
    Customer.findOne({ username: username })
        .then(customer => {
            if (customer) {
                bcrypt.compare(password, customer.password, function (err, result) {
                    if (err) {
                        res.json({
                            status: false,
                            message: "Error Occured!"
                        })
                    }
                    if (result) {
                        res.cookie('customersession', customer.username, { maxAge: 3600000 })
                        res.json({ status: true, message: "Sign In Complete!" })
                        res.end()

                    }
                    else {
                        res.json({
                            status: false,
                            message: 'Password does not match!'
                        })
                    }
                })
            }
            else {
                res.json({
                    status: false,
                    message: 'No user found!'
                })
            }
        })

}

const register = (req, res, next) => {
    let username = req.body.username.split('')
    for (let i = 0; i < username.length; i++) {
        if (username[i] == ' ') {
            return res.json({
                status: false,
                message: "No spaces allowed in username!"
            })
        }
    }

    if (req.body.username == '' || req.body.password == '' || req.body.email == '' || req.body.confirmpassword == '') {
        res.status(400).json({ status: false, message: "Please enter all fields!" })
    }
    else if (req.body.password != req.body.confirmpassword) {
        res.status(400).json({ status: false, message: "Password Confirmation Failed!" })
    }
    else {
        Customer.findOne({ username: req.body.username }, function (err, existingCustomer) {
            if (existingCustomer == null) {
                Customer.findOne({ email: req.body.email }, function (err, existingEmail) {
                    if (existingEmail == null) {
                        bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
                            if (err) {
                                res.json({
                                    status: false,
                                    message: "Error Occured!"
                                })
                            }
                            let customer = new Customer({
                                username: req.body.username,
                                email: req.body.email,
                                password: hashedPass,
                                name: req.body.name,
                                surname: req.body.surname,
                                address: req.body.address,
                                telephoneNumber: req.body.telephoneNumber
                            })
                            customer.save()
                                .then(customer => {
                                    res.json({ status: true, message: "Registration Complete!" })
                                })
                                .catch(error => {
                                    res.json({
                                        status: false,
                                        message: "Error Occured!"
                                    })
                                })

                        })
                    }
                    else {
                        res.status(400).json({ status: false, message: "Email Already Exists!" })

                    }
                })

            }
            else {
                res.status(400).json({ status: false, message: "Username Already Claimed!" })
            }
        })


    }


}
const updateCustomer = (req, res, next) => {

    if ((req.body.ObjId==null)||(req.body.username == '') || (req.body.email == '') || (req.body.password == '') || (req.body.name == '') || (req.body.surname == '') || (req.body.address == '') || (req.body.telephoneNumber == '')) {
        res.json({
            status: false,
            message: "Please enter all fields"
        })
        res.end()
    }
    else {
        bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
            if (err) {
                res.json({
                    status: false,
                    message: "An error occured"
                })
            }
            let updatedCustomer = {
                username: req.body.username,
                email: req.body.email,
                password: hashedPass,
                name: req.body.name,
                surname: req.body.surname,
                address: req.body.address,
                telephoneNumber: req.body.telephoneNumber
            }
            let ObjId = req.body.ObjId
            Customer.findByIdAndUpdate(ObjId, { $set: updatedCustomer }, { new: true })
                .then(() => {
                    res.json({
                        status: true,
                        message: 'Customer Updated sucessfully'
                    })
                })
                .catch(function (error) {
                    res.json({
                        status: false,
                        message: 'An error has occurred'
                    })
                })
        })




    }


}
const deleteCustomer = (req,res,next)=>{
    let customerId = req.params.id
    Customer.findByIdAndDelete(customerId)
    .then(()=>{
        res.json({
            status : true ,
            message : "Customer Deleted Successfully"
        })
    })
    .catch(error => {
        res.json({
            status: false,
            message: 'An error has occured!'
        })
    })


}
const indexCustomers = (req,res,next)=>{
    Customer.find()
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
    login, register, updateCustomer ,deleteCustomer, indexCustomers
}