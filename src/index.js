import Trail from "./trail.js";
import {postReq, getReq} from "./requests.js";

const trailAPI = "https://prescriptiontrails.org/api/";
const Get = (id) => {return document.getElementById(id)}; //shorthand for fetching from DOM

const testTrail = new Trail("Test Trail", 91362, "Thousand Oaks", "CA", 100, 50, "horrible");
Get("trail-list").appendChild(testTrail.getHTML);

const searchTrails = (queryType, query) => {
    if(queryType == "city"){
        byCity(query);
    }
}

const byCity = (city) => {
    
}

console.log(document.querySelector("input[name = 'search-by']:checked"));

//Get("trail-search-query").value

getReq("checkServer/");

Get("search-trails").addEventListener("click", () => {
    const queryType = document.querySelector("input[name = 'search-by']:checked");
    const query = Get("trail-search-query").value;

    if(!queryType || !query){
        alert("Please input valid search options");
        return;
    }

    searchTrails(queryType.id, query);
});