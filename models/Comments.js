const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    nama: {
        type: String,
        default: "Anonim"
    },

    komentar: {
        type: String,
        required: true
    },

    bintang: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    tanggal: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Comment", CommentSchema);