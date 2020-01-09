const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  deleteAllBtn = document.querySelector(".clearBtn"),
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

  function createClearBtn(){
    const clearBtn = document.querySelector(".deleteAll");
    const clearSelBtn = document.querySelector(".deleteChecked");
      clearBtn.innerHTML = "CLEAR";
      clearSelBtn.innerHTML = "Select CLEAR"
      deleteAllBtn.classList.add("showing");
      deleteAllBtn.classList.remove('form');
      deleteAllBtn.appendChild(clearBtn);
      clearBtn.addEventListener("click", clearList);
      clearSelBtn.addEventListener("click", clearSelectList);
  }

  function clearList(){
    while(toDoList.hasChildNodes()){
      toDoList.removeChild(toDoList.firstChild);
    }
    localStorage.removeItem('toDos');
    deleteAllBtn.classList.add('form'); 
    deleteAllBtn.classList.remove('showing');
  }

  function clearSelectList(){
   /* const checkedBox = document.querySelectorAll("li");
    checkedBox.forEach(function(checked){
      if(checked ===true){
        checked. /////////////////////////////////////////////////////////////////////////// 여기부터 시작 check 한 것 삭제
      }
    });*/
  }

  function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  }

  /* init 완성되면 삭제
  function overlapData(text){
    if(text.length <43){
    }
    else{
      throw new Error("Error @ over")
    }
      
  }
*/
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
    createClearBtn();
  }

  function handleSubmit(event){
    console.log(spells);
    event.preventDefault();
    const currentValue = toDoInput.value;
    overlapData(currentValue);
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
      //FIXME 최초 로그인 후 todo 작성시 한 번 빈 submit과 refresh 후 작동
      loadToDos();
      let spells = 0;
      toDoInput.addEventListener("keyup", function(event){
        // 입력초과하면 error 출력할지, maxlength로 막고 출력할지
        //backspace 입력시 spells -1 하기
        console.log(toDoInput.value);
        if(event.keyCode === 8){
          if(spells !== 0){
            spells--;
          }
        }
        // space || shift || 한/영 
        else if(event.keyCode === 32 || event.keyCode ===16 || event.keyCode === 21){
          spells++;
        }
        // 영어 keycode 숫자 오른쪽 keycode 숫자 위 keycode
        else if((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode >= 48 && event.keyCode <= 57)){
          //(event.keyCode < 12592 || event.keyCode > 12687)){ //){
          //console.log("error")
          spells++;
        }
        else{
          
        }
        console.log(spells);
        if(spells > 10){
          alert(`입력은 10자 까지 가능합니다`);
        }
      });
      toDoForm.addEventListener("submit", handleSubmit);
      deleteAllBtn.classList.add('form'); 
    }
    else{
    }
  }

  init();