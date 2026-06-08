const db = require('../database/db');

exports.index = async (req, res) => {
    try {

        const [karyawan] = await db.query(
            'SELECT * FROM TABLE_KARYAWAN ORDER BY ID_Karyawan DESC'
        );

        res.render('karyawan/index', {
            karyawan
        });

    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};

exports.createForm = async (req, res) => {
    res.render('karyawan/create');
};

exports.store = async (req, res) => {
    try {

        const {
            nama_karyawan,
            jabatan,
            telepon
        } = req.body;

        await db.query(
            `INSERT INTO TABLE_KARYAWAN
            (Nama, Jabatan, NO_Hp)
            VALUES (?, ?, ?)`,
            [nama_karyawan, jabatan, telepon]
        );

        res.redirect('/karyawan');

    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};

exports.editForm = async (req, res) => {
    try {

        const { id } = req.params;

        const [karyawan] = await db.query(
            'SELECT * FROM TABLE_KARYAWAN WHERE ID_Karyawan = ?',
            [id]
        );

        res.render('karyawan/edit', {
            karyawan: karyawan[0]
        });

    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};

exports.update = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            nama_karyawan,
            jabatan,
            telepon
        } = req.body;

        await db.query(
            `UPDATE TABLE_KARYAWAN
            SET
                Nama = ?,
                Jabatan = ?,
                NO_Hp = ?
            WHERE ID_Karyawan = ?`,
            [nama_karyawan, jabatan, telepon, id]
        );

        res.redirect('/karyawan');

    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};

exports.destroy = async (req, res) => {
    try {

        const { id } = req.params;

        await db.query(
            'DELETE FROM TABLE_KARYAWAN WHERE ID_Karyawan = ?',
            [id]
        );

        res.redirect('/karyawan');

    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};