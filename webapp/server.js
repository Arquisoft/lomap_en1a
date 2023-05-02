let fs = require('fs');
let https = require('https');
const express = require('express');
let expressStaticGzip = require('express-static-gzip');
const path = require('path');

const portHttp = 80;
const portHttps = 443;

//Load certificates
let privateKey = fs.readFileSync("certificates/privkey.pem");
let certificate = fs.readFileSync("certificates/fullchain.pem");
let credentials = { key: privateKey, cert: certificate };

let app = express();

//Base path of our application. We serve first the brotli version (compression).
app.use('/', expressStaticGzip('build', {
    enableBrotli: true,
    orderPreference: ['br']
}));
//For react routes to work, fallback to index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.all('*', function (req, res, next) {
    if (req.secure) {
        return next();
    }
    res.redirect('https://' + req.hostname + req.url);
});

https.createServer(credentials, app).listen(portHttps, () => {
    console.log("Webapp listening on " + portHttps);
})
    .on("error", (error) => {
        console.error("Error occured: " + error.message);
    });;
app
    .listen(portHttp, () => {
        console.log("Webapp listening on " + portHttp);
    })
    .on("error", (error) => {
        console.error("Error occured: " + error.message);
    });