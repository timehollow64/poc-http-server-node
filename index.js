import { createServer } from "node:http";

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  const { method, url, rawHeaders } = req;

  let body = [];
  const statusCodes = [200, 400];
  req
    .on("error", (err) => {
      console.error(err.stack);
    })
    .on("data", (chunk) => {
      body.push(chunk.toString());
    });

  if (method === "POST" && url === "/echo") {
    req.pipe(res);
  } else if (method === "GET") {
    res.statusCode = statusCodes[0];
    res.end("ends");
  } else {
    res.statusCode = statusCodes[1];
    res.end();
  }

  res.on("error", (err) => {
    console.error(err);
  });
});

server.listen(port, hostname);
