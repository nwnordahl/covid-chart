import "./index.css";
import Chart from "chart.js/auto";
import moment from "moment";

// Query selectors
const body = document.querySelector("body");
const themeButton = document.querySelector("#change-theme");
const countryForm = document.querySelector("#country-form");

// Chart setup
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

// Event listeners
themeButton.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
});

countryForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

countryForm.addEventListener("input", () => {});

// Arrays
const label = [];
const deaths = [];
const countries = [];

// Fetch Covid-19 data
fetch("https://api.covid19api.com/")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

fetch("https://api.covid19api.com/")
  .then((response) => response.json())
  .then((data) => data.forEach((element) => countries.push(element)))
  .catch((error) => console.log(error));

fetch("https://api.covid19api.com/dayone/country/norway")
  .then((response) => response.json())
  .then((data) =>
    data.forEach((element) => {
      deaths.push(element.Deaths);
      label.push(element.Date.split("T")[0]);
    })
  )
  .catch((error) => console.log(error));

// Draw chart
let chartInstance = new Chart(context, {
  type: "bar",
  data: {
    labels: label,
    datasets: [
      {
        label: "Deaths",
        data: deaths,
      },
    ],
  },
});
