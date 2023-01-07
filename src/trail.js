import { postReq } from "./requests.js";

const colors = {"GOOD" : "green", "MID" : "yellow", "BAD" : "orange", "HORRIBLE" : "red"};

class Trail{
    constructor(name, zipcode, city, state, longitude, latitude, condition){
        this.name = name;
        this.zipcode = zipcode;
        this.city = city;
        this.state = state;
        this.longitude = longitude;
        this.latitude = latitude;
        this.condition = condition;

        this.reviews = [];
    }

    get getHTML(){
        let elm = document.createElement("li");
        let trailElm = document.createElement("div");
        
        let title = document.createElement("a");
        title.appendChild(document.createTextNode(this.name));
        trailElm.appendChild(title);

        elm.appendChild(trailElm);
        elm.style.backgroundColor = colors[this.condition];
        
        return elm;
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
                        "reviews" : this.reviews};
        postReq(data, "trail")
    }
}

export default Trail;