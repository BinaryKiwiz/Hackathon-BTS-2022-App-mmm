import { getTrailInfo, comment, getTrailProjects, createProject } from "./requests.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const id = urlParams.get("id");
const trailid = urlParams.get("trailid");

getTrailInfo(trailid);
getTrailProjects(id, trailid);

const sendComment = () => {
    let elm = document.createElement("div");
    elm.classList.add("comment");
    let span = document.createElement("span");
    span.classList.add("userIcon");
    span.appendChild(document.createTextNode("You"));
    elm.append(span);
    elm.appendChild(document.createElement("br"));
    elm.appendChild(document.createTextNode(document.getElementById("comment-box").value));
    document.getElementById("comment-box").value = "";

    document.getElementById("comments").appendChild(elm);

    comment(trailid, id);
}

const sendProject = () => {
    const body = {
        "trail" : trailid,
        "host" : id,
        "date" : new Date(),
        "old" : false,
        "participants" : [id]
    }

    createProject(trailid, id, body)
}

document.getElementById("add-comment").addEventListener("click", sendComment);
document.getElementById("create-project").addEventListener("click", sendProject);