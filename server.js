const http = require('http');
const index = require('./index');
const port = process.env.port || 5000;
const server = http.createServer(index);
server.listen(port, ()=>{
    console.log('Started on port' + port);
})