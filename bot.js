console.log("The Bot is Online!");


//Dependencies & Packages
var request = require("request");
var Twit = require("twit");
var config = require("./config");

//config twitter API
var T = new Twit(config);

var currentTemp;
var minTemp;
var maxTemp;
var hum;
var desc;
var windSpeed;
var url = config.apiLink + config.lat[0] + config.lat[1] +
config.lon[0] + config.lon[1] + config.units[0] + config.units[1] +
config.exclude[0] + config.exclude[1] + config.appID[0] + config.appID[1];

getData();
setInterval(getData, 1000*60*60*12);

function getData() {
  request({url:url, json:true}, function(err, response, body) {
    if(!err && response.statusCode === 200) {
      console.log("Connection Established")
      //console.log(body); //Displays all information requested
      currentTemp = body.current.temp;
      minTemp = body.daily[0].temp.min;
      maxTemp = body.daily[0].temp.max;
      hum = body.current.humidity;
      desc = body.current.weather[0].description;
      windSpeed = body.current.wind_speed;
      cleanData();
    } else {
      console.log("Data Retrival Error");
      console.log(err);
    }
  })
}

function cleanData() {
  currentTemp = currentTemp.toFixed(0);
  minTemp = minTemp.toFixed(0);
  maxTemp = maxTemp.toFixed(0);
  Tweet();
}

function Tweet() {
  var report = "In Reno:" +
  " Currently " + desc + ", at " + currentTemp +
  "°F, with humidity at " + hum +
  "%, windspeed of " + windSpeed +
  "mph.\n\n" + "Forecast: High is " + maxTemp +
  "°F, and low is " + minTemp + "°F"
  "\n" + "#Reno #RenoWeather"

  //console.log(report);

  var tweet = {
    status: report
  }

  T.post('statuses/update', tweet, tweeted);

  function tweeted(err, data, response) {
    if(err) {
      console.log("something went wrong");
      console.log(err);
    } else {
      console.log("It worked: \n" + report);
    }
  }
}
