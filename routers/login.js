const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userInfo = require("../models/userInfoModel");

router.post("/", (req, res) => {

    userInfo.where({ email: req.body.email }).fetch()
        .then(response => {
            if (!response) {
                res.status(201).send("wrong")
            } else {
                bcrypt.compare(req.body.password, response.attributes.password, (err, result) => {
                    if (result === true) {
                        res.status(201).json({
                            email: response.attributes.email,
                            image: response.attributes.imgurl
                        })
                    } else {
                        res.status(201).send("wrong")
                    }
                })
            }
        })
});

module.exports = router;