const express = require('express')
const bodyParser = require('body-parser')
var https = require('https');


const app = express()
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.get('/api-phr', (req, res) => {
    res.json("server running")
})

app.listen(3000, console.log("server running at port 3000"))