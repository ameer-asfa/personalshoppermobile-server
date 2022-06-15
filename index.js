const http = require("http");
const app = require("./app");
const ip = require("ip");
const clc = require("cli-color");

const port = process.env.PORT || 3000;
const server = http.createServer(app);

var printServerInfo =
  clc.cyan.bold("[server]") +
  " Sever deployed on: " +
  clc.magentaBright("http://" + ip.address() + ":" + port);
server.listen(port, () => console.log(clc.blueBright(printServerInfo)));