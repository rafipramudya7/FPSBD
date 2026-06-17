const router = require("express").Router();
const Comment = require("../models/Comments.js");

router.get("/", async (req, res) => {

    const filter = req.query.star;

    let comments;

    if (filter) {
        comments = await Comment.find({
            bintang: Number(filter)
        }).sort({ tanggal: -1 });
    }
    else {
        comments = await Comment.find()
            .sort({ tanggal: -1 });
    }

    const all = await Comment.find();

    let total = 0;

    all.forEach(c => {
        total += c.bintang;
    });

    const rata =
        all.length > 0
            ? (total / all.length).toFixed(1)
            : 0;

    const jumlah = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    };

    all.forEach(c => {
        jumlah[c.bintang]++;
    });

    res.render("komentar/commentar", {
        comments,
        rata,
        jumlah,
        totalUlasan: all.length,
        filter
    });
});
router.post("/create", async (req, res) => {

    let {
        nama,
        komentar,
        bintang
    } = req.body;

    if (!nama || nama.trim() === "") {
        nama = "Anonim";
    }

    await Comment.create({
        nama,
        komentar,
        bintang
    });

    res.redirect("/commentar");
});

module.exports = router;