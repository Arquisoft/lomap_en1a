let fs = require('fs');
let https = require('https');
const express = require('express');
let expressStaticGzip = require('express-static-gzip');
const path = require('path');

const portHttp = 80;
const portHttps = 443;

//Load certificates

let privateKey = fs.readFileSync("certificates/host.key");
let certificate = fs.readFileSync("certificates/host.cert");
let credentials = { key: privateKey, cert: certificate };

try {
    privateKey = fs.readFileSync("certificates/privkey.pem");
    certificate = fs.readFileSync("certificates/fullchain.pem");
    credentials = { key: privateKey, cert: certificate };
} catch (e) { console.log("Error loading certificates: " + e.message); }

let app = express();

app.all('*', function (req, res, next) {
    if (req.secure) {
        return next();
    }
    res.redirect('https://lomapen1a.cloudns.ph' + req.url);
});

//Base path of our application. We serve first the brotli version (compression).
app.use('/', expressStaticGzip('build', {
    enableBrotli: true,
    orderPreference: ['br']
}));
//For react routes to work, fallback to index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app
    .listen(portHttp, () => {
        console.log("Webapp listening on " + portHttp);
    })
    .on("error", (error) => {
        console.error("Error occured: " + error.message);
    });


https.createServer(credentials, app).listen(portHttps, () => {
    console.log("Webapp listening on " + portHttps);
})
    .on("error", (error) => {
        console.error("Error occured: " + error.message);
    });