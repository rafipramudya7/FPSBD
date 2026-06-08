const db = require('../database/db');

exports.index = async (req, res) => {
    try {
        const [pemesan] = await db.query(
            'SELECT * FROM TABLE_PELANGGAN ORDER BY ID_Pelanggan DESC'
        );

        res.render('pemesan/index', { pemesan });
    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};

exports.createForm = async (req, res) => {
    res.render('pemesan/create');
};

exports.store = async (req, res) => {
    try {
        const { nama_pelanggan, telepon, email } = req.body;

        await db.query(
            `INSERT INTO TABLE_PELANGGAN 
            (Nama_Pelanggan, NO_Hp, Email) 
            VALUES (?, ?, ?)`,
            [nama_pelanggan, telepon, email]
        );

        res.redirect('/pemesan');
    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};

exports.editForm = async (req, res) => {
    try {
        const { id } = req.params;

        const [pemesan] = await db.query(
            'SELECT * FROM TABLE_PELANGGAN WHERE ID_Pelanggan = ?',
            [id]
        );

        res.render('pemesan/edit', { pemesan: pemesan[0] });
    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_pelanggan, telepon, email } = req.body;

        await db.query(
            `UPDATE TABLE_PELANGGAN 
            SET 
                Nama_Pelanggan = ?, 
                NO_Hp = ?, 
                Email = ? 
            WHERE ID_Pelanggan = ?`,
            [nama_pelanggan, telepon, email, id]
        );

        res.redirect('/pemesan');
    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};

exports.destroy = async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            'DELETE FROM TABLE_PELANGGAN WHERE ID_Pelanggan = ?',
            [id]
        );

        res.redirect('/pemesan');
    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};