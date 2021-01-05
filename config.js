module.exports = {
  //Twitter API credentials
  consumer_key: 'YOUR CONSUMER KEY',
  consumer_secret: 'YOUR CONSUMER SECRET KEY',
  access_token: 'YOUR ACCESS TOKEN',
  access_token_secret: 'YOUR SECRET ACCESS TOKEN',

  //Open-Weather API credentials
  apiLink: 'https://api.openweathermap.org/data/2.5/onecall?',
  lat: ['lat=', '39.530895'],
  lon: ['&lon=', '-119.814972'],
  units: ['&units=','imperial'],
  exclude: ['&exclude=', 'minutely,hourly'],
  appID: ['&appid=', 'YOUR OPENWEATHER API KEY']
}
