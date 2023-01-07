const trailLink = "https://prescriptiontrails.org/api/";

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
        
    }

    
}

export default Trail;