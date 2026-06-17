const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.join(__dirname, ".env") });

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
const rawMongoUri = process.env.MONGODB_URI && process.env.MONGODB_URI.trim();

if (!rawMongoUri) {
  throw new Error("MONGODB_URI is not set in .env");
}

const mongoUri = new URL(rawMongoUri);

if (process.env.MONGODB_DB) {
  mongoUri.pathname = `/${process.env.MONGODB_DB}`;
}

mongoose
  .connect(mongoUri.toString())
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
