import { postReq } from "./requests.js";

const colors = {"GOOD" : "green", "MID" : "yellow", "BAD" : "orange", "HORRIBLE" : "red"};

class Trail{
    constructor(name, zipcode, city, state, dist, longitude, latitude, condition){
        this.name = name;
        this.zipcode = zipcode;
        this.city = city;
        this.state = state;
        this.longitude = longitude;
        this.latitude = latitude;
        this.condition = condition;
        this.dist = dist;

        this.reviews = [];
        this.id = null;
    }

    get getHTML(){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const id = urlParams.get("id");

        let elm = document.createElement("li");
        let trailElm = document.createElement("div");
        
        let title = document.createElement("a");
        title.href = `trail.html?trailid=${this.id}&id=${id}`;
        title.appendChild(document.createTextNode(this.name));
        trailElm.appendChild(title);

        elm.appendChild(trailElm);
        elm.style.backgroundColor = colors[this.condition];
        
        return elm;
    }

    setId(id){
        this.id = id;
    }

    postTrail(){
        const data = {  "name" : this.name,
                        "zipcode" : this.zipcode,
                        "city" : this.city,
                        "state" : this.state,
                        "longitude" : this.longitude,
                        "latitude" : this.latitude,
                        "condition" : this.condition,
                        "project" : null,
                        "distance" : this.dist,
                        "reviews" : this.reviews};
        postReq(data, "trail")
    }
}

export default Trail;