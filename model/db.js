const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 1000,
    user: 'root',
    password: '',
    database: 'api',
    host: '127.0.0.1',
    port: '3306'
})

let mydb = {};
mydb.all = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM pembayaran_pajak_temp', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });

    });
};
mydb.one = (npwpd) => {
    return new Promise((resolve, reject) => {

        pool.query('SELECT * FROM pembayaran_pajak_temp WHERE npwpd = ?', [npwpd], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
}

mydb.update = (no_transaksi, status_flag) => {
    return new Promise((resolve, reject) => {

        pool.query('INSERT INTO pembayaran_pajak_temp (no_transaksi, status_flag) VALUES ? ', [no_transaksi, status_flag], (err, results) => {

            if (err) {
                return reject(err);
            }
            return resolve(results[0]);


        });
    });
}

mydb.status = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT DISTINCT npwpd, no_transaksi, tgl_expired, status_flag FROM pembayaran_pajak_temp', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
}

module.exports = mydb;