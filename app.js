const { query } = require("express");
const express = require("express");
const app = express();
const path= require('path');
const PORT=process.env.PORT || 5100;
const https = require("https");
app.set("view engine","ejs");
// app.use(express.static("./public")); 
app.use(express.static(path.join(__dirname,'/public')));

app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{

    // const cityName = Delhi;
    const query = "Delhi";
    const apiKey = "ccde7908aa38fd57bfef1e0baf297092";
    const units = "metric";
    
    
    
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid=" + apiKey;
    
    https.get(url,(response)=>{
        // console.log(response);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const tempFeelLike = weatherData.main.feels_like;
            const desc = weatherData.weather[0].description;
            const humidity = weatherData.main.humidity;
            const icon = weatherData.weather[0].icon;
            const windSpeed = weatherData.wind.speed;
            const long = weatherData.coord.lon;
            const latt = weatherData.coord.lat;
            console.log(icon);
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";  //image concatenation

            res.render("index",{ name : query ,pos:true, temperature : temp,feelsLike : tempFeelLike, description : desc , humidi : humidity , winSpeed : windSpeed});
            
        })
    });
});

app.post("/",function(req,res){
    console.log(req.body);
    if(req.body.city.length>0){
    const cityName = req.body.city;
    const query = cityName;
    const apiKey = "ccde7908aa38fd57bfef1e0baf297092";
    const units = "metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid=" + apiKey;
    https.get(url,(response)=>{
        // console.log(response);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const tempFeelLike = weatherData.main.feels_like;
            const desc = weatherData.weather[0].description;
            const humidity = weatherData.main.humidity;
            const icon = weatherData.weather[0].icon;
            const windSpeed = weatherData.wind.speed;
            const long = weatherData.coord.lon;
            const latt = weatherData.coord.lat;
            console.log(icon);
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";  //image concatenation
            res.render("index",{ name : query ,pos:false, temperature : temp, feelsLike : tempFeelLike, description : desc , humidi : humidity , winSpeed : windSpeed});
        })
    });
     }else{
    //    const query="Delhi";
        const url =`https://api.openweathermap.org/data/2.5/weather?lat=${req.body.lattitude}&lon=${req.body.longitude}&units=metric&appid=ccde7908aa38fd57bfef1e0baf297092`;
      
    https.get(url,(response)=>{
        // console.log(response);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const name=weatherData.name;
            const tempFeelLike = weatherData.main.feels_like;
            const desc = weatherData.weather[0].description;
            const humidity = weatherData.main.humidity;
            const icon = weatherData.weather[0].icon;
            const windSpeed = weatherData.wind.speed;
            const long = weatherData.coord.lon;
            const latt = weatherData.coord.lat;
            console.log(icon);
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";  //image concatenation
            res.render("index",{ name : name ,pos:false, temperature : temp, feelsLike : tempFeelLike, description : desc , humidi : humidity , winSpeed : windSpeed});
        })
    });

     }
});

app.listen(PORT,()=>{
    console.log(`Server running at PORT: ${PORT}`);
})