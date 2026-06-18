const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Helper: skor prioritas untuk sorting (makin kecil = tampil duluan)
function skorStatus(statusKirim, statusBayar) {
    const sk = (statusKirim || '').toLowerCase();
    const sb = (statusBayar || '').toLowerCase();

    // Tentukan "warna" kirim
    let kirimWarna = 2; // default kuning
    if (sk.includes('selesai') || sk.includes('sampai'))   kirimWarna = 3; // hijau
    else if (sk.includes('proses') || sk.includes('dikirim')) kirimWarna = 2; // kuning
    else if (sk.includes('pending') || sk.includes('menunggu') || sk === '') kirimWarna = 1; // merah

    // Tentukan "warna" bayar
    let bayarWarna = 1; // default merah
    if (sb.includes('lunas') || sb.includes('selesai') || sb.includes('berhasil')) bayarWarna = 3; // hijau
    else if (sb.includes('proses'))  bayarWarna = 2; // kuning
    else if (sb.includes('pending') || sb.includes('belum') || sb === '') bayarWarna = 1; // merah

    // Skor: kombinasi (kirim * 10 + bayar), makin kecil = tampil duluan
    return kirimWarna * 10 + bayarWarna;
}

router.get('/', async (req, res) => {
    const query = `
        SELECT 
            t.ID_Transaksi,
            t.Tanggal_Pemesanan,
            t.Total_Harga,
            p.Nama_Pelanggan,
            k.Nama AS Nama_Karyawan,
            k.Jabatan,
            pg.ID_Pengiriman,
            pg.Status_Pengiriman,
            pg.Alamat_Tujuan,
            pg.Waktu_Kirim,
            pb.Metode_Pembayaran,
            pb.Status AS Status_Pembayaran
        FROM TABLE_TRANSAKSI t
        LEFT JOIN TABLE_PELANGGAN p ON t.ID_Pelanggan = p.ID_Pelanggan
        LEFT JOIN TABLE_KARYAWAN k ON t.ID_Karyawan = k.ID_Karyawan
        LEFT JOIN TABLE_PENGIRIMAN pg ON t.ID_Pengiriman = pg.ID_Pengiriman
        LEFT JOIN TABLE_PEMBAYARAN pb ON t.ID_Transaksi = pb.ID_Transaksi
    `;

    try {
        const [rows] = await db.query(query);

        // Sort: paling bermasalah (merah-merah) duluan
        rows.sort((a, b) => {
            return skorStatus(a.Status_Pengiriman, a.Status_Pembayaran)
                 - skorStatus(b.Status_Pengiriman, b.Status_Pembayaran);
        });

        res.render('log/logPemesanan', { transaksi: rows });
    } catch (err) {
        console.error('Error logPemesanan:', err);
        res.send('Gagal memuat log pemesanan');
    }
});

// Route: update status pengiriman jadi Selesai
router.post('/selesaikan/:id_pengiriman', async (req, res) => {
    try {
        const { id_pengiriman } = req.params;
        await db.query(
            `UPDATE TABLE_PENGIRIMAN SET Status_Pengiriman = 'Selesai' WHERE ID_Pengiriman = ?`,
            [id_pengiriman]
        );
        res.redirect('/logPemesanan');
    } catch (err) {
        console.error('Error update pengiriman:', err);
        res.status(500).send('Gagal update status pengiriman');
    }
});

module.exports = router;