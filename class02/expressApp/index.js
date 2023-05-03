const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const data = require("./data.json");

function sendHtmlFile(req, res) {
  res
    .status(data.httpCode.success)
    .sendFile(path.join(__dirname, "public/index.html"));
}

function sendJsonData(req, res) {
  const jsonData = {
    message: data.httpResponseMessage.postSuccess,
  };
  res.status(data.httpCode.success).json(jsonData);
}

app.set("port", process.env.HTTP_PORT);

app.get("/", sendHtmlFile);

app.post("/json", sendJsonData);

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(app.get("port"), () => {
  console.log(data.serverStartText, server.address().port);
});
