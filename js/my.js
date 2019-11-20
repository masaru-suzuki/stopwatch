'use strict'
{

  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');
  const timer = document.getElementById('timer');
  let startTime;
  let timeoutId;
  let elapsedTIme = 0;

  function countUp (){
    const d = new Date(Date.now()-startTime+elapsedTIme);
    const m = String(d.getMinutes()).padStart(2,'0');
    const s = String(d.getSeconds()).padStart(2,'0')
    const ms = String(d.getMilliseconds()).padStart(3,'0');

    timer.textContent = `${m}:${s}.${ms}`;
    
    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }
  function setButtonInitial(){
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');
  }
  function setButtonRunning(){
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
  }
  function setButtonStopped(){
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
  }


  setButtonInitial();
//statボタンを押すとカウントあっぷ
  start.addEventListener('click',()=>{
    if (start.classList.contains('inactive') === true){
      return;
    }
  //inactive
  setButtonRunning();
  //countUp
  startTime = Date.now();
  countUp();
  });
//stopボタンを押すと、カウントがストップ
stop.addEventListener('click',()=>{
  //inactive
  if (stop.classList.contains('inactive') === true){
    return;
  }
  setButtonStopped();
  clearTimeout(timeoutId);
  elapsedTIme += Date.now() - startTime;
});
//resetボタンを押すと、カウントがリセット
reset.addEventListener('click',()=>{
  //inactive
  if (reset.classList.contains('inactive') === true){
    return;
  }
  setButtonInitial();
  //timerの表示を0にする
  timer.textContent = '00:00.000'
  elapsedTIme = 0;
});


}

