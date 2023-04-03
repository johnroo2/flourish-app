const express = require("express");
const request = require("request");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=42.984924&lon=-81.245277&appid=d40c85f3ab82af7c1266223395301792`;
    request(url, (err, response, body) => {
        if (err) {
            console.log("error!");
        }
        else {
            weather = JSON.parse(body);
            res.send(weather);
        }
    })
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});