const http = require("http");
const fs = require("fs");
require("dotenv").config();
const data = require("./data.json");

function sendFile(res, fileName) {
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

const requestResponse = function (req, res) {
  if (req.method === "POST") {
    res.setHeader(
      data.httpHeaderProperty.contentType,
      data.httpHeaderProperty.jsonApplication
    );
    res.writeHeader(data.httpCode.success);
    const data = {
      message: data.httpResponse.postSuccessMessage,
    };
    res.end(JSON.stringify(data));
  } else {
    switch (req.url) {
      case "/":
        sendFile(res, "index.html");
        break;
      case "/index.html":
        sendFile(res, "/index.html");
        break;
      case "/page1.html":
        sendFile(res, "page1.html");
        break;
      case "/page2.html":
        sendFile(res, "page2.html");
        break;
      default:
        res.writeHeader(data.httpCode.notFound);
        res.end(data.httpErrorMessage.notFound);
    }
  }
};

const server = http.createServer(requestResponse);
const serverListener = server.listen(process.env.HTTP_PORT, () => {
  console.log(data.serverStartText, serverListener.address().port);
});
