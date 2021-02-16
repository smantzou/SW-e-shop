const port = 3000
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const authMiddleware = require('./middlewares/auth')

mongoose.set('useFindAndModify', false);
const uri = "mongodb+srv://smantzou:lightbringer@swshop.d4zrk.mongodb.net/swshop?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})
db.once('open', () => {
    console.log('Database Connection Established!')
})

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(authMiddleware)
app.use('/api',routes)


app.listen(port, () => {
    console.log('Server is running on port ' + port)
})

/**
 * Make categories for products not something crazy just suppose an eshop and 3 simple categories to classify the items in the collection
 * implement this into the api 
 * start the postman collection 
 * and see Angular.js tutorials 
 * Change verbs of endpoints to nouns for example to make a new user [POST] localhost://3000/api/user thats the format 
 * USE DELETE METHOD
 * NEST THE API 
 * USE STATUS CODES
 * QUERY PARAMETERS ON URL
 * cookies and protected 
 * if poss environmentals
 */