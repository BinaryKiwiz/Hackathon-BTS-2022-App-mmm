import Trail from "./trail.js";

const apiLink = "https://hackathonbackend-bnldi3x7oq-uw.a.run.app/api/";
const Get = (id) => {return document.getElementById(id)};

export async function postReq(data, path, link = apiLink){
    fetch(link + path, {
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    })
    .catch((err) => console.log(err))
    .then(response => response.json())
    .then(response => console.log(response));
}

export async function login(elm, user, pass, data, link = apiLink){
    fetch(link + `authPassword?username=${user}&password=${pass}`, {
        method: "GET",
        headers:{
            "Content-Type" : "application/json"
        }
    })
    .catch((err) => console.log(err))
    .then(response => response.json())
    .then(id => {
        if(id == "Incorrect Password"){
            elm.innerHTML = "Incorrect Credentials";
            console.log("Incorrect Credentials");  
            return;
        }

        window.location.href = `/index.html?id=${id}`;
    });
}

export async function getReq(path, link = apiLink){
    fetch(link + path, {
        method: "GET",
        headers:{
            "Content-Type" : "application/json"
        }
    })
    .catch((err) => console.log(err))
    .then((res) => res.json())
    .then((data) => {
        for(let i = 0; i < data.length; i++){
            const dict = data[i];
            const trail = new Trail(dict.name, dict.zipcode, dict.city, dict.state, dict.distance, dict.longitude, dict.latitude, dict.condition);
            trail.setId(dict._id);
            Get("trail-list").appendChild(trail.getHTML);
        }
    })
}

export async function checkServer(link = apiLink){
    fetch(link + "checkServer/", {
        method: "GET",
        headers:{
            "Content-Type" : "application/json"
        }
    })
    .catch((err) => console.log(err))
    .then((res) => res.json())
    .then((res) => console.log(res))
}

export async function patchReq(data, path, query, link = apiLink){
    fetch(link + path, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    })
    .catch((err) => console.log(err))
    .then(response => response.text())
    .then(response => console.log(response));
}

export async function getTrailInfo(id, link = apiLink){
    fetch(`${link}idTrail?_id=${id}`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json"
        }
    })
    .catch((err) => console.log(err))
    .then(response => response.json())
    .then(json => {
        const dict = json[0];
        document.getElementById("name").innerHTML = dict["name"];
        document.getElementById("distance").innerHTML = dict["distance"];
        document.getElementById("zip").innerHTML = dict["zipcode"];
        document.getElementById("city").innerHTML = dict["city"];
        document.getElementById("state").innerHTML = dict["state"];
        document.getElementById("condition").innerHTML = dict["condition"];

        const comments = dict["comments"];

        if(!comments){return;}

        for(let comment of comments){
            let elm = document.createElement("span");
            elm.appendChild(document.createTextNode(comment["user"]));
            elm.appendChild(document.createElement("br"));
            elm.appendChild(document.createTextNode(comment["body"]));

            document.getElementById("comments").appendChild(elm)
        }
    });
}

export async function comment(trailid, userid, body, link = apiLink){

}