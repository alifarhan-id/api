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

router.get('/pembayaran/search/:id', async (req, res, next) => { //search pembayaran by npwpd
    try {
        let hasil = await db.one(req.params.id);
        res.json(hasil);
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

router.get('/wp/search/', async (req, res, next) => {
    try {
        let hasil = await db.getWp()
        res.json(hasil)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})


// router.post('/pembayaran/create/', async (req, res, next) => {

//     no_transaksi = req.body.no_transaksi,
//         npwpd = req.body.npwpd,
//         tgl_pembayaran = req.body.tgl_pembayaran,
//         bulan = req.body.bulan,
//         tahun = req.body.tahun,
//         pendapatan = req.body.pendapatan,
//         pajak_terhutang = req.body.pajak_terhutang,
//         denda = req.body.denda,
//         total_bayar = req.body.total_bayar,
//         user_id = req.body.user_id,
//         kode_pajak = req.body.kode_pajak,
//         kode_pajak_detail = req.body.kode_pajak_detail,
//         nomor_rekening = req.body.nomor_rekening,
//         kode_golongan = req.body.kode_golongan,
//         status = req.body.status,
//         no_arsip = req.body.no_arsip,
//         tgl_expired = req.body.tgl_expired,
//         keterangan = req.body.keterangan,
//         keterangan_kegiatan = req.body.keterangan_kegiatan
//     try {
//         let hasil = await db.insert(no_transaksi, npwpd, tgl_pembayaran, bulan, tahun,
//             pendapatan,
//             pajak_terhutang,
//             denda,
//             total_bayar,
//             user_id,
//             kode_pajak,
//             kode_pajak_detail,
//             nomor_rekening,
//             kode_golongan,
//             status,
//             no_arsip,
//             tgl_expired,
//             keterangan,
//             keterangan_kegiatan)
//         res.json(hasil)
//     } catch (e) {
//         console.log(e)
//         res.sendStatus(500)
//     }
// })

router.put('/pembayaran/update/:no_transaksi', async (req, res, next) => { //search pembayaran by npwpd

    try {
        let hasil = await db.update(req.body.status_flag, req.params.no_transaksi);
        res.json(hasil);
        console.log('data berhasil diperbaharui')
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})





module.exports = router;