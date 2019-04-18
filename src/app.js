const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views/");
const partialsPath = path.join(__dirname, "../templates/partials/");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "Chihcheng"
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Page",
		name: "Chihcheng Hsieh"
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Helping page",
		name: "Chihcheng Hsieh"
	});
});

app.get("/weather", (req, res) => {
	const { address } = req.query;

	if (address && typeof address === "string") {
		geocode(address.toString(), (error, { lat, long, location } = {}) => {
			if (error) {
				return res.send({
					error
				});
			}

			forecast(lat, long, (error, forecastData) => {
				if (error) {
					return res.send({
						error
					});
				}
				return res.send({
					forecastData,
					address,
					location
				});
			});
		});
	} else {
		return res.send({
			errorMessage: "Please provide valid location"
		});
	}

	// if (!address) {
	// 	return res.send({
	// 		error: "You must provide an address"
	// 	});
	// }

	// res.send({
	// 	forecast: "forecast information",
	// 	location: "location information",
	// 	address
	// });
});

// app.get("/help/*", (req, res) => {
// 	res.render("404", {
// 		title: "404 Not Found",
// 		name: "Chihcheng Hsieh"
// 	});
// });

app.get("/product", (req, res) => {
	const { search } = req.query;

	if (!search) {
		return res.send({
			error: "You must provide a search term"
		});
	}

	console.log(req.query);
	res.send({
		product: []
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404 Not Found",
		name: "Chihcheng Hsieh"
	});
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
