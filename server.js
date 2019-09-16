const express = require('express');
const apiRouter = require('./routes/routes.js');



const app = express();


app.use(express.json());

app.use('/api-phr', apiRouter);

app.listen(process.env.PORT || '3000', () => {
    console.log("server berjalan di port:  3000");
});