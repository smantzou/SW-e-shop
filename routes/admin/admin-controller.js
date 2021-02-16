const Admin = require('../../models/Admin')
const bcrypt = require('bcryptjs')
const { response } = require('express')


const adminlogin = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    if (username == '' || password == '') {
        res.status(400).json({  message: "Please enter all fields!" })
    }
    Admin.findOne({ username: username })
        .then(admin => {
            if (admin) {
                bcrypt.compare(password, admin.password, function (err, result) {
                    if (err) {
                        res.json({
                            status: false,
                            message: "Error Occured!"
                        })
                    }
                    if (result) {
                        res.cookie('adminsession', admin.username, { maxAge: 3600000 })
                        res.json({ status: true, message: 'Sign In Complete!' })
                        res.end()
                    }
                    else {
                        res.json({
                            status: false,
                            message: 'Password does not match!'
                        })
                    }
                }
                )
            }
            else {
                res.json({
                    status: false,
                    message: 'No user found!'
                })
            }
        })

}
const registerAdmin = (req, res, next) => {
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
        Admin.findOne({ username: req.body.username }, function (err, existingAdmin) {
            if (existingAdmin == null) {
                Admin.findOne({ email: req.body.email }, function (err, existingEmail) {
                    if (existingEmail == null) {
                        bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
                            if (err) {
                                res.json({
                                    status: false,
                                    message: "Error Occured!"
                                })
                            }
                            let admin = new Admin({
                                username: req.body.username,
                                email: req.body.email,
                                password: hashedPass,
                                name: req.body.name,
                                surname: req.body.surname
                            })
                            admin.save()
                                .then(() => {
                                    res.json({ status: true, message: "Registration Complete!" })
                                })
                                .catch(() => {
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
const updateAdmin = (req,res,next)=>{
    if ((req.body.username == '') || (req.body.email == '') || (req.body.password == '') || (req.body.name == '') || (req.body.surname == '')) {
        res.json({
            status: false,
            message: "Please enter all fields"
        })
        res.end()
    }
    else{
        bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
            if (err) {
                res.json({
                    status: false,
                    message: "An error occured"
                })
            }
            
            let updatedAdmin = {
                username: req.body.username,
                email: req.body.email,
                password: hashedPass,
                name: req.body.name,
                surname: req.body.surname,
                address: req.body.address
            }
            let ObjId = req.body.ObjId
            Admin.findByIdAndUpdate(ObjId, { $set: updatedAdmin }, { new: true })
                .then(() => {
                    res.json({
                        status: true,
                        message: 'Admin Updated sucessfully'
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
const deleteAdmin = (req,res,next)=>{
    let adminId = req.params.id
    Admin.findByIdAndDelete(adminId)
    .then(()=>{
        res.json({
            status : true ,
            message : "Admin Deleted Successfully"
        })
    })
    .catch(error => {
        res.json({
            status: false,
            message: 'An error has occured!'
        })
    })
}
const indexAdmins = (req,res,next)=>{
    Admin.find()
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
    adminlogin, registerAdmin , updateAdmin , deleteAdmin, indexAdmins
}
