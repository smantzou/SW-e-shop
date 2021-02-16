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
app.use('/api', routes)


app.listen(port, () => {
    console.log('Server is running on port ' + port)
})

/**
 *Make categories for products not something crazy just suppose an eshop and 3 simple categories to classify the items in the collection
 *implement this into the api
 *and see Angular.js tutorials
 *USE STATUS CODES
 make an api request just for password changes
 *cookies and protected
 *if poss environmentals
 */