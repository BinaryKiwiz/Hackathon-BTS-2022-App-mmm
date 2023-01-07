const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const id = urlParams.getAll('id');
console.log(id);
if(id.length == 0){
    window.location.href = "HackathonFrontend/mainPage.html";
}

import Trail from "./trail.js";
import { getReq, checkServer } from "./requests.js";

const trailAPI = "https://prescriptiontrails.org/api/";
const Get = (id) => {return document.getElementById(id)}; //shorthand for fetching from DOM

//const testTrail = new Trail("Test Trail", 91362, "Thousand Oaks", "CA", 6, 100, 50, "BAD");
//Get("trail-list").appendChild(testTrail.getHTML);
//createPage(testTrail);

const searchTrails = (queryType, query) => {
    if(queryType == "city"){
        byCity(query);
        return;
    }
    if(queryType == "zipcode"){
        byZip(query);
        return;
    }
}

const byCity = (city) => {
    city = city.replaceAll(" ", "+").toLowerCase();
    console.log(city);

    getReq(`cityTrail?city=${city}`);
}

const byZip = (zip) => {
    zip = zip.replaceAll(" ", "");
    console.log(zip);

    getReq(`zipcodeTrail?zipcode=${zip}`);
}

checkServer();

Get("search-trails").addEventListener("click", () => {
    const queryType = document.querySelector("input[name = 'search-by']:checked");
    const query = Get("trail-search-query").value;

    if(!queryType || !query){
        alert("Please input valid search options");
        return;
    }

    searchTrails(queryType.id, query);
});
