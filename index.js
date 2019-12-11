require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const SerialPort = require("serialport")(process.env.USB_PATH, {
  baudRate: 115200
});
const Readline = require("@serialport/parser-readline");
const parser = new Readline();
SerialPort.pipe(parser);

app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html"));

io.on("connection", socket => {
  parser.on("data", line => socket.emit("data", line));
});

server.listen(process.env.PORT);
console.log(`Server started on port ${process.env.PORT}`);
