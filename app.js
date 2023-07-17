const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

  res.sendFile(__dirname +"/index.html");

    });

app.post("/",function(req,res){


  const query = req.body.cityName;
  const apiKey = "ff26ddc3a3682629863d8f1f7e44ea61";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const weatherTemp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openwe athermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The temperature in "+query+" is "+weatherTemp+" degree celcius.");
      res.write("<p>The weather is currently "+weatherDescription+".</p>");

      res.write("<img src=" + imageURL + ">");
      res.send();

  });
});
})




app.listen(3000,function(){
  console.log("The server is at port 3000");
});
