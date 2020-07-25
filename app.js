const http = require("http"); 
const fs = require("fs");
const qs = require("querystring");
const localhost = "127.0.0.1";
const port = 3000;

const server = http.createServer(function(req, res){
    if (req.url === "/" && req.method === "GET"){
        console.log(`request was made at ${req.url} using ${req.method}`);
        res.writeHead(200, {"Content-Type":"text/html"});
        fs.createReadStream(__dirname + "/index.html", "utf8").pipe(res);
    } 
    else if (req.url === "/" && req.method === "POST"){
        console.log(`request was made at ${req.url} using ${req.method}`);
        var body = "";
        req.on("data", function(chunk){
            body += chunk;
        });

        req.on("end", ()=>{
           var data = qs.parse(body);
           let name = JSON.stringify(data.name);
           res.writeHead(200);
           res.end(`Hello ${name}! Welcome to WeJapa Internships.`);
           console.log(name);
        });
    }
    else {
        res.writeHead(404);
        res.end(`page not found`)
    }
})

server.listen(port, localhost, (err)=>{
    if (err) {
        return `oops! something is wrong.`;
    } else {
        console.log(`server is running at ${localhost}:${port}`);
    }
})