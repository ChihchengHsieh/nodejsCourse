console.log("Client side javascript file is loaded");

const waetherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

waetherForm.addEventListener("submit", e => {
	e.preventDefault();

	messageOne.textContent = "Loading...";

	const address = search.value;

	if (address.trim()) {
		fetch(`http://localhost:3000/weather?address=${address}`).then(res => {
			res.json().then(data => {
				if (data.error) {
					console.log(data.error);
					messageOne.textContent = data.error;
					messageTwo.textContent = "";
				} else {
					messageOne.textContent = "";
					messageTwo.textContent = JSON.stringify(data);
					console.log(data);
				}
			});
		});
	} else {
		console.log("Please provide a valid address");
	}
});
