const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    address: {
      alias: 'a',
      describe: 'Address to fetch weather for',
      demand: true,
      string: true,
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (errorMessage, results) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${results.temperature}C, and it feels like ${results.apparentTemperature}C.`);
      }
    });
  }
});

const [lat, lng] = [52.406374,16.9251681]
