import { createAccount, postReq } from "./requests.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const email = urlParams.getAll('email');
const pass = urlParams.getAll('pass');

const createUser = () => {
    const userName = document.getElementById("user").value;
    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;

    if(!userName){
        showWrong("user", "Enter a User Name");
        return;
    }
    showRight("user");

    if(!firstName){
        showWrong("firstname", "Enter your First Name");
        return;
    }
    showRight("firstname");

    if(!lastName){
        showWrong("lastname", "Enter your Last Name");
        return;
    }
    showRight("lastname");

    const body = {
        "username" : userName,
        "password" : pass,
        "email" : email,
        "firstName" : firstName,
        "lastName" : lastName
    }

    document.getElementById("user").innerHTML = "";
    document.getElementById("firstname").innerHTML = "";
    document.getElementById("lastname").innerHTML = "";
    
    createAccount(body);
}

function showWrong(place, innerText){
    console.log("wrong");
    let change = document.getElementById(place+"__message");
    change.innerHTML = innerText;

}
function showRight(place){
    console.log("right");
    let change = document.getElementById(place+"__message");
    change.innerHTML = "";
}

document.getElementById("submit").addEventListener("click", createUser);