const yargs = require('yargs');
const axios = require('axios');

const GEOCODE_API_KEY = 'AIzaSyAjLDY8wEOqWjwt5_rHM0I2zYebXgbitPI'
const DARKSKY_API_KEY = '1255c857ebb9839a9bd129be4da6f297';

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

const encodedAddress = encodeURIComponent(argv.address);

const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GEOCODE_API_KEY}`

axios.get(geocodeUrl).then( (response) => {
  if (response.data.status == 'ZERO_RESULTS'){
    throw new Error('Unable to find that address.')
  }
    console.log(response.data.results[0].formatted_address);
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    const weatherUrl = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${lat},${lng}?units=si`
    return axios.get(weatherUrl);
}).then( (response) => {
    const temperature = response.data.currently.temperature;
    const feelsLike = response.data.currently.apparentTemperature;
    console.log(`It is currently ${temperature}. It feels like ${feelsLike}`);
}).catch( (e) => {
  if (e.code == 'ENOTFOUND'){
    console.log('Failed to connect to Google API servers.')
  } else {
    console.log(e.message);
  }
});
