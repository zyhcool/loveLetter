const crypto = require("crypto");

const secret = "ilovechina";
const hash = crypto.createHmac("sha256", secret).update("123456").digest("hex");

console.log(crypto.verify("sha256", "123456"));
