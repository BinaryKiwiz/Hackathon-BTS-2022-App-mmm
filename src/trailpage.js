import { getTrailInfo, comment } from "./requests.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const id = urlParams.get("id");
const trailid = urlParams.get("trailid");

getTrailInfo(trailid);

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

document.getElementById("add-comment").addEventListener("click", sendComment);