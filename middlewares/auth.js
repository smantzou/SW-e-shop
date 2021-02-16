
var checkAuthentication = function(req,res,next){
    console.log(req.url)
    req.tasos = 'poytsa'
    console.log("Hello from Auth")
    next()
}

module.exports = checkAuthentication