const express = require("express");
const router = express.Router();
const path = require("path");
const formidable = require("formidable");
const bcrypt = require("bcrypt");
const userInfo = require("../models/userInfoModel");
const saltRound = 10;

router.post("/", (req, res) => {
    const imgprefix = Date.now() + "-";
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, file) => {
        console.log("fields: ", fields)
        console.log("file: ", file)
        if (err) {
            return res.status(401).json({ err: err.message })
        }

        bcrypt.hash(fields.password, saltRound, (err, hash) => {
            new userInfo().save({
                email: fields.email,
                password: hash,
                imgurl: imgprefix + file.image.name
            })
        })

    })

    form.on("fileBegin", (name, file) => {
        file.path = path.join(__dirname, "../server-assets/images/" + imgprefix + file.name)
    })

    form.on("end", () => {
        setTimeout(() => {
            return res.status(201).send("added")
        }, 500)
    })
})

module.exports = router;