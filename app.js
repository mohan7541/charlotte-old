const express = require('express');
const compression = require("compression");

const path = require('path');
const http = require('http');

const app = express();
app.use(compression());

const port = process.env.port || 80;
const _appDirectory = '/dist/charlotte/';
const serverURL = 'http://localhost:8092/';
const qrURL = 'http://localhost:8093/';

//const serverURL = 'http://172.31.33.237:8092/';
//const qrURL = 'http://172.31.42.200:8093/';

console.log(path.resolve(__dirname + _appDirectory));
app.use(express.static(path.resolve(__dirname + _appDirectory)));


app.get("*", (req, res) => {
  res.sendFile(_appDirectory+"index.html", { root: __dirname });
});
//server.listen(port, () => console.log(`Server started at port :${port}`));
app.listen(port, function () {
  console.log("Node Express server for " + app.name + " listening on http://localhost:" + port);
});
