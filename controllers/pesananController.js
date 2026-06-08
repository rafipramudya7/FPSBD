const db = require('../database/db');

exports.createForm = async (req, res) => {
    try {
        const [pelanggan] = await db.query('SELECT * FROM TABLE_PELANGGAN');
        const [menu] = await db.query('SELECT * FROM TABLE_MENU');
        const [karyawan] = await db.query('SELECT * FROM TABLE_KARYAWAN');

        if (karyawan.length === 0) {
            return res.status(400).send('<h1>Error: Data Karyawan belum ada!</h1><p>Harus ada minimal 1 karyawan di database untuk mengeksekusi transaksi ini.</p><a href="/karyawan/create">Tambah Karyawan Dulu</a>');
        }
        res.render('pesanan/create', { pelanggan, menu, karyawan });
    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan saat memuat form pemesanan');
    }
};

exports.store = async (req, res) => {
    try {
        const { id_pelanggan, id_karyawan, id_menu, jumlah_porsi, alamat_tujuan } = req.body;

        const menuArray = Array.isArray(id_menu) ? id_menu : [id_menu];
        const porsiArray = Array.isArray(jumlah_porsi) ? jumlah_porsi : [jumlah_porsi];

        let totalHargaTransaksi = 0;
        const listIdDetailInserted = [];

        for (let i = 0; i < menuArray.length; i++) {
            const currentMenuId = menuArray[i];
            const currentPorsi = parseInt(porsiArray[i]);

            if (!currentMenuId) continue;

            const [menuRows] = await db.query('SELECT Harga FROM TABLE_MENU WHERE ID_Menu = ?', [currentMenuId]);
            if (menuRows.length === 0) continue;

            const hargaMenu = menuRows[0].Harga;
            const totalSubHarga = hargaMenu * currentPorsi;
            totalHargaTransaksi += totalSubHarga;

            const [detailResult] = await db.query(
                `INSERT INTO TABLE_DETAIL (ID_Menu, Jumlah_Porsi, Total_Sub_Harga) VALUES (?, ?, ?)`,
                [currentMenuId, currentPorsi, totalSubHarga]
            );
            listIdDetailInserted.push(detailResult.insertId);
        }

        if (listIdDetailInserted.length === 0) {
            return res.send('Gagal memproses pesanan: Tidak ada menu valid yang dipilih.');
        }

        const [pengirimanResult] = await db.query(
            `INSERT INTO TABLE_PENGIRIMAN (ID_Karyawan, Waktu_Kirim, Alamat_Tujuan, Status_Pengiriman) VALUES (?, NOW(), ?, ?)`,
            [id_karyawan, alamat_tujuan, 'Pending']
        );
        const idPengiriman = pengirimanResult.insertId;

        const idDetailUtama = listIdDetailInserted[0];
        const [transaksiResult] = await db.query(
            `INSERT INTO TABLE_TRANSAKSI (ID_Pelanggan, ID_Pengiriman, ID_Detail, Tanggal_Pemesanan, Total_Harga, ID_Karyawan) VALUES (?, ?, ?, NOW(), ?, ?)`,
            [id_pelanggan, idPengiriman, idDetailUtama, totalHargaTransaksi, id_karyawan]
        );
        const idTransaksi = transaksiResult.insertId;

        await db.query(
            `INSERT INTO TABLE_PEMBAYARAN (ID_Transaksi, Metode_Pembayaran, Status) VALUES (?, ?, ?)`,
            [idTransaksi, 'Belum Memilih', 'Belum Bayar']
        );

        res.redirect(`/pesanan/invoice/${idTransaksi}`);

    } catch (error) {
        console.log(error);
        res.send('Terjadi kesalahan saat memproses pemesanan.');
    }
};

exports.showInvoice = async (req, res) => {
    try {
        const { id_transaksi } = req.params;

        const [transaksi] = await db.query(
            `SELECT t.ID_Transaksi, p.Nama_Pelanggan, m.Nama_Menu, d.Jumlah_Porsi, t.Total_Harga, b.Status AS Status_Bayar
             FROM TABLE_TRANSAKSI t
             JOIN TABLE_PELANGGAN p ON t.ID_Pelanggan = p.ID_Pelanggan
             JOIN TABLE_DETAIL d ON t.ID_Detail = d.ID_Detail
             JOIN TABLE_MENU m ON d.ID_Menu = m.ID_Menu
             JOIN TABLE_PEMBAYARAN b ON t.ID_Transaksi = b.ID_Transaksi
             WHERE t.ID_Transaksi = ?`,
            [id_transaksi]
        );

        if (transaksi.length === 0) return res.send('Data Invoice tidak ditemukan.');

        res.render('pesanan/invoice', { data: transaksi[0] });
    } catch (error) {
        console.log(error);
        res.send('Gagal memuat invoice.');
    }
};

exports.processPayment = async (req, res) => {
    try {
        const { id_transaksi } = req.params;

        await db.query(
            `UPDATE TABLE_PEMBAYARAN 
             SET Metode_Pembayaran = 'QRIS (Gateway)', Status = 'Lunas' 
             WHERE ID_Transaksi = ?`,
            [id_transaksi]
        );

        const [transaksi] = await db.query(
            `SELECT t.ID_Transaksi, p.Nama_Pelanggan, m.Nama_Menu, d.Jumlah_Porsi, t.Total_Harga, b.Status AS Status_Bayar
             FROM TABLE_TRANSAKSI t
             JOIN TABLE_PELANGGAN p ON t.ID_Pelanggan = p.ID_Pelanggan
             JOIN TABLE_DETAIL d ON t.ID_Detail = d.ID_Detail
             JOIN TABLE_MENU m ON d.ID_Menu = m.ID_Menu
             JOIN TABLE_PEMBAYARAN b ON t.ID_Transaksi = b.ID_Transaksi
             WHERE t.ID_Transaksi = ?`,
            [id_transaksi]
        );

        res.render('pesanan/success', { data: transaksi[0] });
    } catch (error) {
        console.log(error);
        res.send('Proses pelunasan gagal.');
    }
};