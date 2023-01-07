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

        const comments = dict["reviews"];
        const users = dict["users"];

        if(!comments){return;}

        for(let i = 0; i < comments.length; i++){
            let elm = document.createElement("div");
            elm.classList.add("comment");
            let span = document.createElement("span");
            span.classList.add("userIcon");
            span.appendChild(document.createTextNode(users[i]));
            span.id = BIG_ID;
            updateProjectParticipant(BIG_ID, users[i]);
            BIG_ID++;
            elm.append(span);
            elm.appendChild(document.createElement("br"));
            elm.appendChild(document.createTextNode(comments[i]));


            document.getElementById("comments").appendChild(elm)
        }
    });
}

export async function comment(trailid, userid, data, link = apiLink){
    console.log(userid);

    fetch(`${link}addReviews`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            "_id" : trailid,
            "userid" : [userid],
            "reviews" : [data]
        })
    })
    .catch((err) => console.log(err))
    .then((response) => response.json())
    .then((response) => console.log(response));
}

export async function createProject(trailid, userid, data, link = apiLink){
    fetch(link + "project", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    })
    .catch((err) => console.log(err))
    .then((response) => response.json())
    .then((json) => location.reload());
}

const joinProject = (id, projectid, link = apiLink) => {
    const data = {
        "_id" : projectid,
        "participants" : [id]
    }

    fetch(`${link}addProjectParticipants`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    })
    .catch((err) => console.log(err))
    .then(() => {
        location.reload();
    });
}

const updateProjectOwner = (id, userid) => {
    fetch(apiLink + "user?_id=" + userid, {
        method: "GET",
        headers: {
            "Content-Type" : "application.json"
        }
    })
    .catch((err) => console.log(err))
    .then((response) => response.json())
    .then((json) => {
        document.getElementById(id).innerHTML = `Project Organized by ${json["firstName"]} ${json["lastName"]}`;
    })
}

const updateProjectParticipant = (id, userid) =>{
    fetch(apiLink + "user?_id=" + userid, {
        method: "GET",
        headers: {
            "Content-Type" : "application.json"
        }
    })
    .catch((err) => console.log(err))
    .then((response) => response.json())
    .then((json) => {
        document.getElementById(id).innerHTML = `${json["firstName"]} ${json["lastName"]}`;
    })
}

let BIG_ID = 0;
export async function getTrailProjects(userid, trailid, link = apiLink){
    fetch(link + `project?trail=${trailid}`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json"
        }})
        .catch((err) => console.log(err))
        .then((response) => response.json())
        .then((json) => {
            const projectDiv = document.getElementById("projects");

            for(const dict of json){
                const div = document.createElement("div");
                div.classList.add("project");

                const heading = document.createElement("h2");
                heading.appendChild(document.createTextNode(`Project Organized by ${dict["host"]}`))
                heading.id = BIG_ID;
                updateProjectOwner(BIG_ID, dict["host"]);
                BIG_ID++;
                div.appendChild(heading);

                const datetime = document.createElement("div");
                let dateString = dict["date"].toString().replace("T", " ");
                datetime.appendChild(document.createTextNode("Scheduled on " + dateString.substring(0, dateString.length - 14) + " at " + dateString.substring(10, dateString.length - 8)));
                div.appendChild(datetime);
                
                const desch3 = document.createElement("h3");
                desch3.appendChild(document.createTextNode("Description"));
                div.appendChild(desch3);

                const description = document.createElement("div");
                description.appendChild(document.createTextNode(dict["description"]));
                div.appendChild(description);

                div.appendChild(document.createElement("br"));

                const h3 = document.createElement("h3");
                h3.appendChild(document.createTextNode("Participants: "));
                div.appendChild(h3);

                const participants = document.createElement("ol");
                for(const person of dict["participants"]){
                    const li = document.createElement("li");
                    li.appendChild(document.createTextNode(person));
                    li.id = BIG_ID;
                    updateProjectParticipant(BIG_ID, person);
                    BIG_ID++;

                    participants.appendChild(li);
                }
                div.appendChild(participants);

                const joinButton = document.createElement("button");
                joinButton.classList.add("button--basic");
                joinButton.appendChild(document.createTextNode("Join Project"));
                joinButton.onclick = () => {joinProject(userid, dict["_id"]);}
                div.appendChild(joinButton);

                projectDiv.appendChild(div);
            }

            if(json.length > 0){

                for(let i = 0; i < 15; i++) {document.getElementById("projects").appendChild(document.createElement("br"));}
            }
        });
}

export async function createAccount(data, link = apiLink){
    fetch(link + "user", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    })
    .catch((err) => console.log(err))
    .then(response => response.text())
    .then(id => {
        window.location.href = `/index.html?id=${id}`;
    });
}
