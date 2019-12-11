require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html"));

io.on("connection", socket => {});

server.listen(process.env.PORT);
console.log(`Server started on port ${process.env.PORT}`);
