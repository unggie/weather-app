import '../css/styles.css';
import { fetchData } from "./fetchData";
// Use DOMContentLoaded to check if the contents of the DOM are loaded
document.querySelector("#form").addEventListener("submit", (event) => {
    event.preventDefault();

    const location = document.querySelector('#location-input');
    const locationClean = location.value.trim();
    location.value = '';

    console.log(fetchData(locationClean));

});
// console.log(DOMContentLoaded);