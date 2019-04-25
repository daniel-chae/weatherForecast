const request = require("request");

const forecast = (latitude, longtitude, callback) => {
  const url = `https://api.darksky.net/forecast/6e7591392120eb62da1609c327530732/${latitude},${longtitude}?unit=si&lang=en`;
  request({ url, json: true }, (error, { body: responseBody }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (responseBody.error) {
      callback(responseBody.error, undefined);
    } else {
      const forecast = `${
        responseBody.daily.data[0].summary
      }. It is currently ${
        responseBody.currently.temperature
      } degrees out and humidity is ${responseBody.currently.humidity *
        100}%. There is a ${
        responseBody.currently.precipProbability
      }% chance of rain.`;
      callback(undefined, forecast);
    }
  });
};

module.exports = forecast;
