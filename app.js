const express = require('express');
const bodyParser = require('body-parser');
const apiKey = 'f0e9ef46e03419a9df14ed4c3865d4b6';
const units = "metric";

const https = require('https');
// const = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// ';
//initializing the express application
const app = express();
//defining the folder to be served as statically
app.use(express.static('public'));
//using the body-parser module
app.use(bodyParser.urlencoded({extended:true}));
//Defining the Port Number
const port = 3000;

app.get('/',function(req,res){
res.sendFile(__dirname + '/html/index.html')
});


app.get('/result',(req,res)=>{
res.sendFile(__dirname + '/html/result.html');
});

app.post('/result',function(req,res){
    const cityName = req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data", (data)=>{
            const newData = JSON.parse(data);
            const icon = newData.weather[0].icon;
            const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            console.log(newData);
            res.write(`<h1>Country: ${cityName}</h1>`);
            res.write(`<h1>Temperature: ${newData.main.temp} degree Celcius</h1>`);
            
            res.write(`<img src=${imageUrl}>`)
            res.send();
        })
    });
    
});







// Starting the server at port 3000
app.listen(port,function(){
    console.log(`The server has been started at port ${port}`);
});














