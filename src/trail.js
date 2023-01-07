const trailLink = "https://prescriptiontrails.org/api/";
const colors = {"good" : "green", "medium" : "yellow", "bad" : "orange", "horrible" : "red"};

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
}

export default Trail;