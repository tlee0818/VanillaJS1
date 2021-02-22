const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings")

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currVal = input.value;
    paintGreeting(currVal);
    saveName(currVal);
}
function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function loadName(){
    const currUser = localStorage.getItem(USER_LS);

    if(currUser === null){
        askForName();
    }else{
        paintGreeting(currUser);
    }
}

function init(){
    loadName();
}

init();