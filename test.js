const jwt = require("jsonwebtoken");

const secret = "your-secret-whatever";

const token = jwt.sign({ name: "zyh", age: 20, country: "china" }, secret);
console.log(token);
let data = jwt.verify(token, secret);
console.log(data);
