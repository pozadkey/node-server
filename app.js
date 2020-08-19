const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const localhost = '127.0.0.1';
const port = 3000;

//create server
const server = http.createServer((req, res)=>{
    let body = '';
    //handle get request
    if (req.method === 'GET' && req.url === '/'){
        console.log(`request was made at ${req.url} using ${req.method}`);
        res.writeHead(200, {'Content-Type':'text/html'})
        fs.readFile('index.html', 'utf8', (err, data)=>{
            if (err) throw err;
            else
            res.write(data);
            res.end();
        })
    }
    //handle post request
    else if (req.method === 'POST' && req.url === '/'){
        console.log(`request was made at ${req.url} using ${req.method}`);
        req.on('data', (data)=>{
            body += data;
        })
        req.on('end', ()=>{
            let data = qs.parse(body),
            //convert data to json format
            info = JSON.stringify(data);
            //convert json to object
            mydata = JSON.parse(info);
            let name = mydata.name;
            res.writeHead(200, {'Content-Type':'text/html'})
            res.end(`Hello ${name}! Welcome to WeJapa Internships.`)
        })
    }

    else {
        res.writeHead(404, {'Content-Type':'text/plain'})
        res.end(`Sorry! Page not found.`)
    }
})

    

server.listen(port, localhost, (err)=>{
    if (err)
    console.log(`oops! server failed to start ${err}`);
    else 
    console.log(`server is running at ${localhost}:${port}`);
})