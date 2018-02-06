const request = require('request');

DARKSKY_API_KEY = '1255c857ebb9839a9bd129be4da6f297';


const getWeather = (lat, lng, callback) => {
  let message, result;
  request({
    url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${lat},${lng}?units=si`,
    json:true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      result = {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      };
    } else {
      message = 'Unable to fetch weather.';
    }
    callback(message, result);
  });
}


module.exports = {
  getWeather,
}
