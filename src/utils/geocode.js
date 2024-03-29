const request = require("request");

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoibWlrZTgyMDgwOCIsImEiOiJjanVsNTlqazYwZjM4M3ptcHNqcW93N2s4In0.2zM144Sw1k6U5X3w6aV6OQ&limit=1`;

	request(
		{
			url: url,
			json: true
		},
		(error, res) => {
			if (error) {
				callback("Unable to connect to location services!", undefined);
			} else if (res.body.features.length === 0) {
				callback("Unable to find location. Try another search", undefined);
			} else {
				callback(undefined, {
					lat: res.body.features[0].center[1],
					long: res.body.features[0].center[0],
					location: res.body.features[0].place_name
				});
			}
		}
	);
};

module.exports = geocode;
