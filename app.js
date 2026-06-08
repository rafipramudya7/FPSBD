const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

const pemesanRoutes = require('./routes/pemesanRoutes');
const karyawanRoutes = require('./routes/karyawanRoutes');
const menuRoutes = require('./routes/menuRoutes');

app.use('/pemesan', pemesanRoutes);
app.use('/karyawan', karyawanRoutes);
app.use('/menu', menuRoutes);
app.get('/', (req, res) => {
    res.send('FPSBD Catering Management');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});