const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

const pemesanRoutes = require("./routes/pemesanRoutes");
const karyawanRoutes = require("./routes/karyawanRoutes");
const menuRoutes = require("./routes/menuRoutes");
const pesananRoutes = require("./routes/pesananRoutes");
const commentRoute = require("./routes/commentarRoutes");

app.use("/commentar", commentRoute);
app.use("/pesanan", pesananRoutes);
app.use("/pemesan", pemesanRoutes);
app.use("/karyawan", karyawanRoutes);
app.use("/menu", menuRoutes);
app.get("/", (req, res) => {
  res.render("index");
});

const PORT = 3000;
mongoose
  .connect(process.env.MONGODB_URI + process.env.DB_NAME)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
