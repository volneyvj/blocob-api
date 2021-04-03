const { Console } = require('console');
const http = require('http');

const app = require('./app');

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
    console.log(` Server listening at port ${process.env.PORT}`);
});


