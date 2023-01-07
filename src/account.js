function checkForm(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email){
        showWrong("email", "Enter an email");
        return;
    }

    showRight("email");

    if (!password){
        showWrong("password", "Enter a password");
        return;
    }
    
    showRight("password");
            
    if (document.getElementById("confirmation").value != document.getElementById("password").value){
        showWrong("confirmation", "Passwords don't match");
        return;
    }
    
    showRight("confirmation");
    proceed(email, password);
}

const proceed = (email, password) => {
    window.location.href = `account--name.html?email=${email}&pass=${password}`;
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

document.getElementById("submit").addEventListener("click", checkForm);
