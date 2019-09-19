const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    user: 'root',
    password: '',
    database: 'api',
    host: 'localhost',
    port: '3306'
})

let mydb = {};
mydb.all = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM pembayaran_pajak_temp WHERE status_flag = 0', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });

    });
};

mydb.one = (no_transaksi) => {
    return new Promise((resolve, reject) => {

        pool.query('SELECT * FROM pembayaran_pajak_temp WHERE no_transaksi = ?', [no_transaksi], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                console.log('data berhasil di temukan')
                return resolve(results[0]);

            }

        });
    });
}

mydb.update = (status_flag, no_transaksi) => {
    return new Promise((resolve, reject) => {
        pool.query("UPDATE pembayaran_pajak_temp SET status_flag = ? where no_transaksi = ? ", [status_flag, no_transaksi], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}
// mydb.getWp = () => {
//     return new Promise((resolve, reject, data) => {
//         let sql = `SELECT data_umum.npwpd, data_umum.kode_pajak, data_umum.kode_pajak_detail, data_umum.penanggung_pajak,
//         data_umum.alamat, data_umum.rt_rw, data_umum.kode_kelurahan, data_umum.kode_kecamatan, data_umum.kota, data_umum.kode_pos,
//         data_umum.no_telpon, data_umum.id, pembayaran_pajak_temp.id, pembayaran_pajak_temp.no_transaksi, pembayaran_pajak_temp.npwpd, pembayaran_pajak_temp.tgl_pembayaran, pembayaran_pajak_temp.bulan,
//         pembayaran_pajak_temp.tahun, pembayaran_pajak_temp.pendapatan, pembayaran_pajak_temp.pajak_terhutang, pembayaran_pajak_temp.denda, pembayaran_pajak_temp.total_bayar, pembayaran_pajak_temp.user_id,
//         pembayaran_pajak_temp.kode_pajak, pembayaran_pajak_temp.kode_pajak_detail, pembayaran_pajak_temp.nomor_rekening, pembayaran_pajak_temp.kode_golongan,
//         pembayaran_pajak_temp.status, pembayaran_pajak_temp.no_arsip, pembayaran_pajak_temp.tgl_expired, pembayaran_pajak_temp.keterangan,
//         pembayaran_pajak_temp.keterangan_kegiatan FROM data_umum,
//         pembayaran_pajak_temp WHERE data_umum.npwpd = pembayaran_pajak_temp.npwpd`
//         pool.query(sql, data, (err, results) => {
//             if (err) {
//                 return reject(err)
//             } else {
//                 return resolve(results)

//             }
//         })
//     })
// }

// mydb.insert = () => {
//     return new Promise((resolve, reject) => {

//         pool.query(`insert into pembayaran_pajak ( no_transaksi, 
//             npwpd, 
//             tgl_pembayaran, 
//             bulan, 
//             tahun, 
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
//             keterangan_kegiatan) values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//             [no_transaksi,
//                 npwpd,
//                 tgl_pembayaran,
//                 bulan,
//                 tahun,
//                 pendapatan,
//                 pajak_terhutang,
//                 denda,
//                 total_bayar,
//                 user_id,
//                 kode_pajak,
//                 kode_pajak_detail,
//                 nomor_rekening,
//                 kode_golongan,
//                 status,
//                 no_arsip,
//                 tgl_expired,
//                 keterangan,
//                 keterangan_kegiatan
//             ], (err, hasil) => {
//                 if (err) {
//                     reject(err)
//                 } else {
//                     resolve(hasil)
//                     console.log('data berhasil ditambahkan')
//                 }
//             })
//     })
// }



// mydb.status = () => {
//     return new Promise((resolve, reject) => {
//         pool.query('SELECT DISTINCT npwpd, no_transaksi, tgl_expired, status_flag FROM pembayaran_pajak_temp', (err, results) => {
//             if (err) {
//                 return reject(err);
//             }
//             return resolve(results[0]);
//         });
//     });
// }

module.exports = mydb;