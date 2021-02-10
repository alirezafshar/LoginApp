const bookshelf = require("../bookshelf");

const userInfoModal = bookshelf.model("userInfoModel", {
    requireFetch: false,
    tableName: "userinfo",
    timestamp: ["create_at_userinfo"]
})

module.exports = userInfoModal;