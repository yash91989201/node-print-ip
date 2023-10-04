const http = require("http");
const os = require("os");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const publicIp = getPublicIpAddress();
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      `<html><body><h1>This webpage is served by ec2 instance with ip address: </h1><p>${publicIp}</p></body></html>`
    );
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

function getPublicIpAddress() {
  const ifaces = os.networkInterfaces();
  let publicIp = "N/A";

  for (const ifaceName in ifaces) {
    const iface = ifaces[ifaceName];
    for (const entry of iface) {
      if (entry.family === "IPv4" && !entry.internal) {
        publicIp = entry.address;
        break;
      }
    }
    if (publicIp !== "N/A") break;
  }

  return publicIp;
}
