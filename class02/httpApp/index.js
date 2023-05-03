const http = require("http");
const fs = require("fs");
require("dotenv").config();
const data = require("./data.json");

function sendHtmlFile(res, fileName) {
  fs.readFile(__dirname + "/public/" + fileName, function (error, buffer) {
    if (error) {
      res.writeHeader(data.httpCode.serverError);
      res.end(data.httpResponseMessage.success);
    } else {
      res.setHeader(
        data.httpHeaderProperty.contentType,
        data.httpHeaderProperty.htmlText
      );
      res.writeHeader(data.httpCode.success);
      res.end(buffer);
    }
  });
}

function sendJsonData(res) {
  const jsonData = {
    message: data.httpResponseMessage.postSuccess,
  };
  res.setHeader(
    data.httpHeaderProperty.contentType,
    data.httpHeaderProperty.jsonApplication
  );
  res.writeHeader(data.httpCode.success);
  res.end(JSON.stringify(jsonData));
}

function sendNotFoundResponse(res) {
  res.writeHeader(data.httpCode.notFound);
  res.end(data.httpErrorMessage.notFound);
}

const requestResponse = function (req, res) {
  if (req.method === "POST") {
    switch (req.url) {
      case "/json":
        sendJsonData(res);
        break;
      default:
        sendNotFoundResponse(res);
    }
  } else {
    switch (req.url) {
      case "/":
        sendHtmlFile(res, "index.html");
        break;
      case "/index.html":
        sendHtmlFile(res, "/index.html");
        break;
      case "/page1.html":
        sendHtmlFile(res, "page1.html");
        break;
      case "/page2.html":
        sendHtmlFile(res, "page2.html");
        break;
      default:
        sendNotFoundResponse(res);
    }
  }
};

const server = http.createServer(requestResponse);
const serverListener = server.listen(process.env.HTTP_PORT, () => {
  console.log(data.serverStartText, serverListener.address().port);
});
