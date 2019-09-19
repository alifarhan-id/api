const express = require('express');
const db = require('../model/db.js');
const jwt = require('jsonwebtoken')

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'server running'
    })
})

const username = "bpd"
const password = "qwerty123"

router.post('/login', (req, res, next) => {
    const p_username = req.body.username
    const p_password = req.body.password
    if (p_username == username && p_password == password) {
        var token = jwt.sign({
                username: username
            },
            'secretkey', {
                expiresIn: '10h'
            },
            (err, token) => {
                res.json({
                    ok: true,
                    message: "Login successful",
                    token: token
                })
            })
    } else {
        res.send({
            ok: false,
            message: "Username or password incorrect"
        })
    }
})

router.get('/commands', (req, res) => {
    res.json({
        "1": '/login    -> url: http://bkd.sangat.top/api-phr/login',
        "2": '/commands -> url: http://bkd.sangat.top/api-phr/commands',
        "3": '/search   -> url: http://bkd.sangat.top/api-phr/search/:no_transaksi',
        "4": '/update   -> url: http://bkd.sangat.top/api-phr/update/:no_transaksi',
        "5": '/print    -> url: http://bkd.sangat.top/api-phr/print/:no_transaksi',
    })
})
router.get('/pembayaran/', verifyToken, (req, res, next) => {

    jwt.verify(req.token, 'secretkey', async (err) => {
        if (err) {
            res.sendStatus(403)
        } else {
            let hasil = await db.all()
            res.json({
                Status: 200,
                Data: hasil
            });
        }
    })

})
router.get('/search/data', verifyToken, (req, res, next) => {

    jwt.verify(req.token, 'secretkey', async (err) => {
        if (err) {
            res.sendStatus(403)
        } else {
            let hasil = await db.user()
            res.json({
                Status: 200,
                Data: hasil
            });
        }
    })

})

router.get('/search/:id', verifyToken, (req, res, next) => {

    jwt.verify(req.token, 'secretkey', async (err) => {
        if (err) {
            console.log(err)
            res.json({
                ok: false,
                message: 'tidak ada akses ambil token dulu hep',
                status: 'Forbidden'
            })
        } else {
            let hasil = await db.one(req.params.id);
            res.json({
                Status: 200,
                Data: hasil
            });
        }
    })

})

router.put('/update/:no_transaksi', verifyToken, (req, res, next) => { //search pembayaran by npwpd
    jwt.verify(req.token, 'secretkey', async (err) => {
        // var user_id = req.body.user_id
        if (err) {
            console.log(err)
            res.json({
                ok: false,
                message: 'tidak ada akses ambil token dulu hep',
                status: 'Forbidden'
            })
        } else {
            let hasil = await db.update(req.body.status_flag, req.params.no_transaksi);
            res.json({
                status: 200,
                "user_id": req.body.user_id,
                "status_flag": req.body.status_flag,
                message: "data berhasil di update"
            });
            console.log(user_id)
        }
    })


})

router.get('/search/data', verifyToken, (req, res, next) => {

    jwt.verify(req.token, 'secretkey', async (err) => {
        if (err) {
            res.sendStatus(403)
        } else {
            let hasil = await db.user()
            res.json({
                Status: 200,
                Data: hasil
            });
        }
    })

})


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        next();
    } else {
        res.sendStatus(403)
    }
}




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


module.exports = router;