import Trail from "./trail.js";
import {postReq, getReq} from "./requests.js";

const Get = (id) => {return document.getElementById(id)}; //shorthand for fetching from DOM

const testTrail = new Trail("Test Trail", 91362, "Thousand Oaks", "CA", 100, 50, "horrible");
Get("trail-list").appendChild(testTrail.getHTML);

const searchTrails = () => {

}

getReq("checkServer/");

Get("search-trails").addEventListener(searchTrails());