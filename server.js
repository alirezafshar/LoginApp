const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const login = require("./routers/login");
const signup = require("./routers/signup");

require("dotenv").config();
const PORT = process.env.PORT || 8080;
app.use(cors());

app.use(express.static("server-assets"));
app.use(express.json({ limit: "50mb" }));

app.use("/login", login);
app.use("/signup", signup);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, "client/build/index.html"), (err) => {
            if (err) {
                res.status(500).send(err)
            }
        })
    })
}

app.listen(PORT, () => {
    console.log(`Server Connected ${PORT}`)
})