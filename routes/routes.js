const express = require('express');
const db = require('../model/db.js');
const router = express.Router();


router.get('/pembayaran/', async (req, res, next) => {
    try {
        let hasil = await db.all()
        res.json(hasil);
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

router.get('/pembayaran/search/:id', async (req, res, next) => {
    try {
        let hasil = await db.one(req.params.id);
        res.json(hasil);
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})



module.exports = router;