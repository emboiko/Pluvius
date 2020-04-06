const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/${process.env.FORECAST_KEY}/${latitude},${longitude}`;

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback("Unable to connect to weather service.");
        } else if (body.error) {
            callback("Unable to find location.");
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            });
        }
    });
}

module.exports = forecast;
