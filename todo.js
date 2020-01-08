const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  checkLogin = document.querySelector(".js-greetings");

  const TODOS_LS = "toDos";

  function filterFn(toDo){
    return toDo.id === 1;
  }

  let toDos = [];

  function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos(toDos);
  }

  function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  }

  function paintToDo(text){
    const li = document.createElement("li")
    const delBtn = document.createElement("button");
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    li.appendChild(checkBox);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
      text: text,
      id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
  }

  function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
  }


  function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
          paintToDo(toDo.text);
        });
    }
     
  }

  function init(){
    if(checkLogin.classList.contains("showing")){
      loadToDos();
      toDoForm.addEventListener("submit", handleSubmit);
    }
    else{
      alert(`로그인을 하세요`)
    }
  }

  init();