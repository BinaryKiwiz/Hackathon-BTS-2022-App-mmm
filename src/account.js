var email = document.querySelector("#email");
var password = document.querySelector("#password");
var confirmation = document.querySelector("#confirmation");
var errorMessage = document.querySelector(".error__message");



submit.addEventListener("click", checkForm);

function checkForm(e){
    if(!email){
        email = "";
    }
    e.preventDefault();//keeps user on page
    console.log("log");
    console.log(email);
    if (email === ""){
        showWrong("email", "Enter an email");
    }
    else{
        showRight("email");
    }
    if (password === ""){
        showWrong("password", "Enter a password");
    }
    else{
        showRight("password");
            
    if (confirmation != password){
        showWrong("confirmation", "Passwords don't match");
    }
    else{
        showRight("confirmation");
    }
    }
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

function error(){
    errorMessage.innerHTML = "Please fill out form";
}


function checkPasswords() {
    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirmation").value;

    if (password == confirm) {
        errorMessage.innerHTML = "Passwords match!";
    } else {
        errorMessage.innerHTML = "Passwords do not match. Please try again.";
    }
}

