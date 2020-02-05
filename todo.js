const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  deleteButtons = document.querySelector(".clearBtn"),
  deleteChecked = deleteButtons.querySelector(".deleteChecked");

  const TODOS_LS = "toDos";

 

  function filterFn(toDo){
    return toDo.id === 1;
  }

  function createMap(){
    var mapOptions = {
      useStyleMap: true,
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10
  };
  
  var map = new naver.maps.Map('map', mapOptions);
  }
 
  function openModal(){
    document.addEventListener('DOMContentLoaded', function() {
      const clearTodoList = document.querySelector('.clearModal');
      const clearTodoListInstances = M.Modal.init(clearTodoList);
      const clearTodoListYes = document.querySelector('#agreeAllClear');
      clearTodoListYes.addEventListener("click", clearList);

      const selectDelete = document.querySelector('.selectDeleteModal');
      const selectDeleteInstances = M.Modal.init(selectDelete);
      const selectDeleteYes = document.querySelector('#agreeCheckDelete');
      selectDeleteYes.addEventListener("click", deleteCheckedBox);
  });
  
}


  let toDos = [];
// 텍스트를 대문자로 변환해서 비교
function overlapData(text){
  const UpperText = text.toUpperCase().trim();
  const loadedToDos = localStorage.getItem(TODOS_LS);
  let overlapDatas = false;
  if(loadedToDos !== null){
      const parsedToDos = JSON.parse(loadedToDos);
      parsedToDos.forEach(function(toDo){
        const UpperToDo = toDo.text.toUpperCase().trim(); 
        if(UpperToDo === UpperText){ 
          overlapDatas = true;
        }
      });
  }
  return overlapDatas;
}

function selectDeleteMessage(){
  const selectChecked = document.querySelector('.select-checked');
  const selectDeleteContent = document.createElement('span');
  selectChecked.appendChild(selectDeleteContent);
}

  function confirmChecked(){
    console.log("몇번됨");
    const check = toDoList.querySelectorAll("input");
    let howManyCheck = 0;
    // 체크된 것 개수 확인
    check.forEach(function(chk){
      if(chk.checked){
        ++howManyCheck;
      }
    });
    const selectChecked = document.querySelector('.select-checked');
    const selectDeleteContent = selectChecked.querySelector('span');
    selectDeleteContent.innerText = `${howManyCheck} 개가 선택되어있습니다`
  }

  function deleteCheckedBox(){
    const checked = toDoList.querySelectorAll("input");
    checked.forEach(function(chk){
      if(chk.checked){
        const parentNodeLabel = chk.parentNode;
        const parentNodeP = parentNodeLabel.parentNode;
        const parentNodeLi = parentNodeP.parentNode;
        parentNodeLi.remove();
        const cleanToDos = toDos.filter(function(toDo){
          return toDo.id !== parseInt(parentNodeLi.id);
        });
      toDos = cleanToDos;
      saveToDos(toDos);
      }
    });
  }

  

  function createClearBtn(){
    const clearBtn = document.querySelector(".deleteAll");
    const deleteSelectBtn = document.querySelector(".deleteChecked");
    clearBtn.innerHTML = "CLEAR";
    deleteSelectBtn.innerHTML = "select Delete";

    deleteButtons.classList.add("showing");
    deleteButtons.classList.remove('form');
    deleteButtons.appendChild(clearBtn);
    deleteButtons.appendChild(deleteSelectBtn);

    selectDeleteMessage();
    deleteChecked.addEventListener("click", confirmChecked);

  }

  function clearList(){
    while(toDoList.hasChildNodes()){
      toDoList.removeChild(toDoList.firstChild);
      localStorage.removeItem('toDos');
      deleteButtons.classList.add('form'); 
      deleteButtons.classList.remove('showing');
    }
  }

  function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  }

  function createMap(){
    
    var map = new naver.maps.Map('map', {
      //src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=u61viz6mtu",
      useStyleMap: true,
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10
  });
  }

  function paintToDo(text){
    const p = document.createElement('p');
    const label = document.createElement('label');

    const li = document.createElement("li");
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    li.appendChild(p);
    p.appendChild(label);
    label.appendChild(checkBox);
    label.appendChild(span);
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
    const currentUser = localStorage.getItem("currentUser");
    if(currentUser === null){} //로그인이 되어있는지 확인
    else if(!overlapData(currentValue)){
      paintToDo(currentValue);
      toDoInput.value = "";
    }
    else{
      alert("중복된 입력입니다");
    }
    
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
    const currentUser = localStorage.getItem("currentUser");
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
      deleteButtons.classList.add('form'); 
      openModal();
  }

init(); 
//createMap();