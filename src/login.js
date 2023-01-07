import { login } from "./requests.js";

const submitLogin = () => {
    const userName = document.getElementById("user").value;
    const password = document.getElementById("pass").value;

    if(!userName){
        return;
    }

    if(!password){
        return;
    }

    login(document.getElementById("confirmation__message"), userName, password);
}

document.getElementById("submit").addEventListener("click", submitLogin);