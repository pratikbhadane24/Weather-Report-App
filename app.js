const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "0b9eafc9b73df8a5d448528e3b09c714";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + "";

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weather_data = JSON.parse(data)
            const temp = weather_data.main.temp;
            console.log(temp);
            const weatherdescription = weather_data.weather[ 0 ].description;
            console.log(weatherdescription);
            const icon = weather_data.weather[ 0 ].icon
            const imgurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1>The temperature in " + query + " is " + temp + " degree Celcuis.</h1>");
            res.write("<h3>And the weather is currently " + weatherdescription + " </h3>");
            res.write("<img src=" + imgurl + ">");
            res.send();
        });
    });
});

app.listen(3000, function () {
    console.log("Server started on port 3000.");
});