const request = require("request");

// const url =
// 	"https://api.darksky.net/forecast/94983b3c2ab5e0f14bb532060c9bb8fa/37.8267,-122.4233?units=si&lang=es";

// request(
// 	{
// 		url: url,
// 		json: true
// 	},
// 	(error, res) => {
// 		const currently = res.body.currently;

// 		console.log(
// 			res.body.daily.data[0].summary,
// 			"It's currently ",
// 			currently.temperature,
// 			" degrees out. There is a ",
// 			currently.precipProbability,
// 			"% chance of rain"
// 		);
// 	}
// );

const forecast = (lat, long, callback) => {
	const url = `https://api.darksky.net/forecast/94983b3c2ab5e0f14bb532060c9bb8fa/${lat},${long}`;

	request(
		{
			url: url,
			json: true
		},
		(error, res) => {
			if (error) {
				callback("Unable to reach the forecast data!", undefined);
			} else if (res.body.error) {
				callback("No data found!", undefined);
			} else {
				const currently = res.body.currently;

				const forecastData = `${
					res.body.daily.data[0].summary
				} It's currently,${currently.temperature} degrees out. There is a${
					currently.precipProbability
				}% chance of rain`;

				callback(undefined, forecastData);
			}
		}
	);
};

module.exports = forecast;
