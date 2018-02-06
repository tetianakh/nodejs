const request = require('request');

const GEOCODE_API_KEY = 'AIzaSyAjLDY8wEOqWjwt5_rHM0I2zYebXgbitPI'


const geocodeAddress = (address, callback) => {
    let message, result;
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GEOCODE_API_KEY}`,
      json: true,
    }, (error, response, body) => {
      if (error) {
        message = 'Unable to connect to Google servers.';
      } else if (body.status === 'ZERO_RESULTS'){
        message = 'Unable to fetch data for this address.';
      } else if (body.status === 'OK') {
        result = {
          address: body.results[0].formatted_address,
          longitude: body.results[0].geometry.location.lng,
          latitude: body.results[0].geometry.location.lat,
        }
      } else {
        message = `Unforseen error has occured: ${body.status}`;
      }
      callback(message, result);
    })
};


module.exports = {
  geocodeAddress,
}
