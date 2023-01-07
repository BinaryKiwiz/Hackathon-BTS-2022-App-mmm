import { postReq } from "./requests.js";

const colors = {"GOOD" : "#55cf55", "MID" : "#fff15c", "BAD" : "#ffbb5c", "HORRIBLE" : "#fa6048"};

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
        elm.style.display = "flex";
        elm.style.flexDirection = "row";
        elm.style.alignItems = "center";
        elm.style.gap = "1em";
        elm.classList.add("listed-trail");
        let trailElm = document.createElement("div");
        
        let title = document.createElement("a");
        title.style.padding = "1em";
        title.href = `HackathonFrontend/trail.html?trailid=${this.id}&id=${id}`;
        title.appendChild(document.createTextNode(this.name));
        trailElm.appendChild(title);

        let cond = document.createElement("div");
        cond.appendChild(document.createTextNode("Condition: " + this.condition));

        let zip = document.createElement("div");
        zip.appendChild(document.createTextNode("Zipcode: " + this.zipcode));

        let distance = document.createElement("div");
        distance.appendChild(document.createTextNode("Distance: " + this.dist + " miles"));

        elm.appendChild(trailElm);
        elm.appendChild(cond);
        elm.appendChild(distance);
        elm.appendChild(zip);
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