import Trail from "./trail.js";

const addTrail = () => {
    const name = document.getElementById("name").value;
    const zipcode = document.getElementById("zipcode").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const long = document.getElementById("long").value;
    const lat = document.getElementById("lat").value;
    const condition = document.getElementById("cond").value;
    const distance = document.getElementById("dist").value;

    document.getElementById("name").value = "";
    document.getElementById("zipcode").value = "";
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
    document.getElementById("long").value = "";
    document.getElementById("lat").value = "";
    document.getElementById("cond").value = "";
    document.getElementById("dist").value = "";
    
    const trail = new Trail(name, zipcode, city, state, distance, long, lat, condition);
    trail.postTrail();
}

document.getElementById("submit-new-trail").addEventListener("click", addTrail);