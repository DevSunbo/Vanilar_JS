const clockContainer = document.querySelector(".js-clock"),
      clockTitle = clockContainer.querySelector("h2"),
      dateTitle = clockContainer.querySelector("h1");
function getTime(){
  const date = new Date();
  const years = date.getFullYear();
  const months = date.getMonth();
  const dates = date.getDate();
  const days = date.getDay();
  const currentDay = getDays(days);
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  dateTitle.innerText = `${years} / ${months+1} / ${dates}`;
  clockTitle.innerText = `${
    hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds} (${currentDay})`
}

function getDays(days){
  let DAY;
  if(days === 0){DAY = `Sun`}
  else if(days === 1) {DAY = `Mon`}
  else if(days === 2) {DAY = `Teu`}
  else if(days === 3) {DAY = `Wed`}
  else if(days === 4) {DAY = 'Thu'}
  else if(days === 5) {DAY = `Fri`}
  else if(days === 6) {DAY = `Sat`}
  return DAY;
}

function init(){
  getTime();
  setInterval(getTime, 1000);
}

init();