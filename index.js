import { createServer } from "node:http";

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  const { method, url, rawHeaders } = req;

  let body = [];
  const statusCodes = [200, 400];
  req
    .on("data", (chunk) => {
      body.push(chunk.toString());
    })
    .on("end", () => {
      if (method === "POST" && url === "/echo") {
        res.statusCode = statusCodes[0];
        res.end(JSON.stringify(body));
      } else if (method === "GET") {
        res.statusCode = statusCodes[0];
        res.end("Get method successful");
      } else {
        res.statusCode = statusCodes[1];
        res.end();
      }
    })
    .on("error", (err) => {
      console.error(err.stack);
    });
});

server.listen(port, hostname);
