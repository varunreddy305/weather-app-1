const axios = require('axios');
const path = require('path');
const { fileWriter, fileReader } = require('./fileWriter');
const app = axios;
const httpRequestToGetCoordinates = location => {
	return new Promise((resolve, reject) => {
		const access_token = 'pk.eyJ1IjoidmFydW4zMDUiLCJhIjoiY2s4eGduaHVhMDE0NzNmcW5qbHZ4aDhjdCJ9.L3bseCzjaYWrjVjGYEmtZQ';
		app
			.get(
				`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
					location
				)}.json?access_token=${access_token}&limit=1`
			)
			.then(({ data }) => {
				//fileWriter(path.join(__dirname, 'LL.json'), JSON.stringify(data));
				const placeLocation = data.features[0].place_name;
				const place = data.features[0].text;
				const coordinates = Object.assign({}, data.features[0].center.reverse());
				const lattfromApi = coordinates[0] + ',' + coordinates[1];
				resolve({ lattfromApi, place, placeLocation });
			})
			.catch(e => {
				reject('Unable to find location', e);
			});
	});
};


const httpRequestToGetWeather = (coordinates, place, callback) => {
	const access_key = '64448117058301120e076dafd6d7f32a';
	app
		.get(`http://api.weatherstack.com/current?access_key=${access_key}&query=${coordinates}`)
		.then(({ data }) => {
			//fileWriter(path.join(__dirname, 'weather.json'), JSON.stringify(data));
			const message = `Currently the weather forecast in ${place} is ${data.current.weather_descriptions[0]}. The current temperature is ${data.current.temperature} and it feels like ${data.current.feelslike}`;
			callback(undefined, { message, place });
		})
		.catch(e => {
			callback('Cannot find location', undefined);
		});
};

module.exports = {
	httpRequestToGetCoordinates,
	httpRequestToGetWeather,
};
