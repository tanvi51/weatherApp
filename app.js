const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '743325bf6dc7c4608458f108eb13714e';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let unit = "metric";
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `The temperature is ${weather.main.temp} °C in ${weather.name}. 
        The weather is currently ${weather.weather[0].description} !`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})