const form = document.querySelector("form");
const search = document.querySelector("input");
const btn = document.querySelector("button");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");
const message3 = document.querySelector("#message-3");
const message4 = document.querySelector("#message-4");
const message5 = document.querySelector("#message-5");
const message6 = document.querySelector("#message-6");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const location = search.value.trim().toLowerCase();
    search.value = "";
    if (!location) return search.focus();

    btn.setAttribute("disabled", "disabled");

    message1.textContent = "Loading...";
    message2.textContent = "";
    message3.textContent = "";
    message4.textContent = "";
    message5.textContent = "";
    message6.textContent = "";

    fetch(`/weather?location=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.err) {
                message1.textContent = data.err;
            } else {
                message1.textContent = data.location;
                message2.textContent = data.forecast.summary;
                message3.textContent = `Temp: ${data.forecast.temperature} °F`;
                message4.textContent = `Precipitation Probability: ${data.forecast.precipProbability}%`;
                message5.textContent = `Sunrise: ${data.forecast.sunRise}`;
                message6.textContent = `Sunset: ${data.forecast.sunSet}`;
            }
            btn.removeAttribute("disabled");
            search.focus();
        }
        )
    });
});
