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


  function confirmChecked(){
    const checked = toDoList.querySelectorAll("input");
    let oneCheck = true; //foreach의 break 대신 사용
    checked.forEach(function(chk){
      if(chk.checked && oneCheck){
        const boolConfirm = confirm("선택한 내용을 삭제하시겠습니까?");
        oneCheck = false;
        return boolConfirm;  
      }
    });
  }

  function deleteCheckedBox(){
    if(confirmChecked()){
      const checked = toDoList.querySelectorAll("input");
      checked.forEach(function(chk){
        if(chk.checked){
          const parentNodeChk = chk.parentNode;
          parentNodeChk.remove();
        const cleanToDos = toDos.filter(function(toDo){
              return toDo.id !== parseInt(parentNodeChk.id);
        });
        toDos = cleanToDos;
        saveToDos(toDos);
        }
      });
    }
  }

  

  function createClearBtn(){
    const clearBtn = document.querySelector(".deleteAll");
    const deleteSelectBtn = document.querySelector(".deleteChecked");
      clearBtn.innerHTML = "CLEAR";
    deleteSelectBtn.innerHTML = "Selecte Delete";
      deleteAllBtn.classList.add("showing");
      deleteAllBtn.classList.remove('form');
      deleteAllBtn.appendChild(clearBtn);
    deleteAllBtn.appendChild(deleteSelectBtn);
      clearBtn.addEventListener("click", clearList);
    deleteSelectBtn.addEventListener("click", deleteCheckedBox);
  }

  function clearList(){
    while(toDoList.hasChildNodes()){
      toDoList.removeChild(toDoList.firstChild);
    }
    localStorage.removeItem('toDos');
    deleteAllBtn.classList.add('form'); 
    deleteAllBtn.classList.remove('showing');

  }

  function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  }


  function paintToDo(text){
    const li = document.createElement("li")
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    li.appendChild(checkBox);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
      text: text,
      id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
    //XXX load 시에 계속 반복되는데 허용 범위 인지?  
    createClearBtn();
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
      //FIXME 최초 로그인 후 todo 작성시 한 번 빈 submit과 refresh 후 작동
      loadToDos();
      let spells = toDoInput.value;
      // key를 입력할 때마다 확인 
      toDoInput.addEventListener("keyup", function(event){
        spells = toDoInput.value;
        if(spells.length >= 30){
          alert("30자 까지 입력 가능합니다");
          throw new Error ("Error @ 30자 이상 입력은 불가능합니다");
        }
      });
      toDoForm.addEventListener("submit", handleSubmit);
      deleteAllBtn.classList.add('form'); 
    }
    else{
    }
  }

  init(); 