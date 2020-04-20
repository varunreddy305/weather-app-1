const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { httpRequestToGetCoordinates, httpRequestToGetWeather } = require('./httpRequest');

const app = express();
const PORT = process.env.PORT ? process.env.PORT : 3000;

app.use(express.static(path.join(__dirname, './public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './public/templates/views'));
hbs.registerPartials(path.join(__dirname, './public/templates/partials'));

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather page',
		name: 'Varun'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.location) {
		return res.send({
			error: "You didn't provide valid location"
		});
	}
	httpRequestToGetCoordinates(req.query.location)
		.then(({ lattfromApi, place, placeLocation } = {}) => {
			httpRequestToGetWeather(lattfromApi, place, (error, { message = 'Please provide valid location' } = {}) => {
				if (error) {
					return res.send({
						error: "You didn't provide valid location"
					});
				}
				res.send({
					Weather: message,
					address: placeLocation,
					place
				});
			});
		})
		.catch(error => {
			return res.send({ error });
		});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About page',
		name: 'Varun'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'help page',
		message: 'You will be helped shortly',
		name: 'Varun'
	});
});

app.get('/help/*', (req, res) => {
	res.render('error', {
		title: '404 Page',
		error: 'Help article not found',
		name: 'Varun'
	});
});

app.get('*', (req, res) => {
	res.render('error', {
		title: '404 Page',
		error: 'Page not found',
		name: 'Varun'
	});
});

app.listen(PORT, () => {
	console.log('Listening at port ', PORT);
});
