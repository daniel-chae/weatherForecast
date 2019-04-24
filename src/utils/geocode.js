const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZGFuaWVsY2hhZSIsImEiOiJjanUzZDNoZHEwajB6NDRvMXB2bWxmNGU0In0.3GWJ5d9RuuyxOIXctw4WVg&limit=1`;
  request({ url, json: true }, (error, { body: responseBody }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (!responseBody.features || responseBody.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        longtitude: responseBody.features[0].center[0],
        latitude: responseBody.features[0].center[1],
        location: responseBody.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
