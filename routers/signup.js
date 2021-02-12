const express = require("express");
const router = express.Router();
const path = require("path");
const mv = require("mv");
const formidable = require("formidable");
const bcrypt = require("bcrypt");
const userInfo = require("../models/userInfoModel");
const saltRound = 10;

router.post("/", (req, res) => {
    const imgprefix = Date.now() + "-";
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, file) => {

        if (err) {
            return res.status(401).json({ err: err.message })
        }

        userInfo.where({ email: fields.email }).fetch()

            .then(response => {
                if (response) {
                    res.status(201).send("exist")
                } else {
                    bcrypt.hash(fields.password, saltRound, (err, hash) => {
                        return new userInfo().save({
                            email: fields.email,
                            password: hash,
                            imgurl: imgprefix + file.image.name
                        })
                    })

                    const tempath = file.image.path;
                    const newpath = path.join(__dirname, "../server-assets/images/" + imgprefix + file.image.name)

                    mv(tempath, newpath, (err) => {
                        if (err) throw err
                        res.status(201).send("added");
                        res.end()
                    })

                }
            })
    })
})

module.exports = router;