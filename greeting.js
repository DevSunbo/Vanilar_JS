const form = document.querySelector(".js-form"),
      input = document.querySelector("input"),
      greeting = document.querySelector(".js-greetings");
      toDoListInGreeting = document.querySelector(".js-toDoList"),
      nameLog = document.querySelector(".writeName");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function clearLS(){
    nameLog.value="";
    form.classList.add(SHOWING_CN);
    greeting.classList.remove(SHOWING_CN);
    toDoListInGreeting.remove();
    localStorage.clear();

}

function handleSubmit(event){
    event.preventDefault(); // 기본동작 enter를 막음
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`
    const logout = document.createElement("button");
    logout.classList.add("btnStyle");
    logout.innerHTML = "LOGOUT";
    logout.addEventListener("click", clearLS);
    greeting.appendChild(logout);
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    }
    else {
        paintGreeting(currentUser);
    }
}
function init(){
    loadName();
}

init();