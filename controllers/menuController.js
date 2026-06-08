const db = require('../database/db');

exports.index = async (req, res) => {
    try {
        const [menu] = await db.query(
            'SELECT * FROM TABLE_MENU ORDER BY ID_Menu DESC'
        );

        res.render('menu/index', { menu });
    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};

exports.createForm = async (req, res) => {
    res.render('menu/create');
};

exports.store = async (req, res) => {
    try {
        const { nama_menu, harga } = req.body;
        await db.query(
            `INSERT INTO TABLE_MENU 
            (Nama_Menu, Harga) 
            VALUES (?, ?)`,
            [nama_menu, harga]
        );

        res.redirect('/menu');
    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};

exports.editForm = async (req, res) => {
    try {
        const { id } = req.params;

        const [menu] = await db.query(
            'SELECT * FROM TABLE_MENU WHERE ID_Menu = ?',
            [id]
        );

        res.render('menu/edit', { menu: menu[0] });
    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_menu, harga } = req.body;

        await db.query(
            `UPDATE TABLE_MENU 
            SET 
                Nama_Menu = ?, 
                Harga = ? 
            WHERE ID_Menu = ?`,
            [nama_menu, harga, id]
        );

        res.redirect('/menu');
    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};

exports.destroy = async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            'DELETE FROM TABLE_MENU WHERE ID_Menu = ?',
            [id]
        );

        res.redirect('/menu');
    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan');
    }
};