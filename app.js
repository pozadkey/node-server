const http = require("http"); 
const fs = require("fs");
const qs = require("querystring");
const localhost = "127.0.0.1";
const port = 3000;

//create server
const server = http.createServer(function(req, res){
    //making a GET request to the specifed url
    if (req.url === "/" && req.method === "GET"){
        console.log(`a ${req.method} request was made at ${req.url}`);
        res.writeHead(200, {"Content-Type":"text/html"});
        fs.createReadStream(__dirname + "/index.html", "utf8").pipe(res);
    } 
    //making a POST request to the specifed url
    else if (req.url === "/" && req.method === "POST"){
        console.log(`a ${req.method} request was made at ${req.url}`);
        var body = "";
        req.on("data", function(chunk){
            body += chunk;
        });

        req.on("end", ()=>{
            //parse the POST request body to JSON
            var data = qs.parse(body);
            let name = JSON.stringify(data.name);
            res.writeHead(200);
            //display once the POST request has been parsed
            res.end(`Hello ${name}! Welcome to WeJapa Internships.`);
            console.log(data);    
        });
    }
    //handling error for incorrect url
    else {
        res.writeHead(404);
        res.end(`page not found.`);
    }
});

//run server and check for errors
server.listen(port, localhost, (err)=>{
    if (err) {
        console.log(`oops! something is wrong.`);
    } else {
        console.log(`server is running at ${localhost}:${port}`);
    }
});