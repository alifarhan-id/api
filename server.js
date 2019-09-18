const express = require('express');
const apiRouter = require('./routes/routes.js');
const bodyParser = require('body-parser')



const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())


app.use(express.json());

app.use('/api-phr', apiRouter);

app.listen(process.env.PORT || '3000', () => {
    console.log("server berjalan di port:  3000");
});