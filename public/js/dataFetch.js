const weatherForm = document.querySelector('form');
const address = document.querySelector('input');
const message = document.getElementById('Weather info');
const para2 = document.getElementById('mess-2');
weatherForm.addEventListener('submit', e => {
	message.textContent = 'Loading Weather Data';
	para2.textContent = '';
	e.preventDefault();
	fetch(`http://localhost:3000/weather?location=${encodeURI(address.value)}`).then(res => {
		res.json().then(data => {
			if (data.error) {
				message.textContent = data.error;
			} else {
				console.log(address.value);
				message.textContent = data.Weather;
				para2.textContent = data.address;
			}
		});
	});
});
