'use strict';
{
  //btnの定義
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  //startTimeをあとで再代入するからletで定義
  let startTime;

  //timeoutIdをあとで再代入するからletで定義
  let timeoutId;

  //timerが走っていた時間 elapseTimeをあとで再代入するからletで定義
  let elapsedTime = 0;

  //countUpをstartbtnの関数の中で使いたいから、ここで定義
  function countUp (){

    //timerのcountを定義
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');

    //timerの文字列を表示
    timer.textContent = `${m}:${s}.${ms}`;

    //10msごとにまた、カウントアップをするようにする
    //crearTimeoutでsetTimeoutを使いたいからIdを設定する
   timeoutId = setTimeout(() => {

      //ここにcountUpを入れるのが慣れない
      countUp();
    }, 10);
  }

/*  ＜問題点＞
1.スタートを複数回押した後だと、一回ストップを押しても止まらない
2.ストップを複数回押した後だと、正しい秒数から再開されない
これらは主に、各ボタンを押すごとにstartTimeやelapsedTimeが多重起動してしまうことが原因です。
それらの解決方法は、必要のないボタンは押させないが良いでしょう。フォールトアボイダンスというやつですね。
最初(Initial) => start以外押せないようにする
計測中(Running) => stop以外押せないようにする
ストップ中(stopped) => starとreset以外押せないようにする*/
/*
buttonについてのfunctionを作っていく
function setButtonStateInitial(){
  start.disabled = false;
  stop.disabled = true;
  reset.disabled = true;
}
function setButtonStateRunning(){
  start.disabled = true;
  stop.disabled = false;
  reset.disabled = true;
}
function setButtonStateStopped(){
  start.disabled = false;
  stop.disabled = true;
  reset.disabled = false;
}
*/
//btnをdivで表現したため、再設定
function setButtonStateInitial(){
  start.classList.remove('inactive');
  stop.classList.add('inactive');
  reset.classList.add('inactive');
}
function setButtonStateRunning(){
  start.classList.add('inactive');
  stop.classList.remove('inactive');
  reset.classList.add('inactive');
}
function setButtonStateStopped(){
  start.classList.remove('inactive');
  stop.classList.add('inactive');
  reset.classList.remove('inactive');
}
//初期設定として、startボタンだけ押せるようにする
setButtonStateInitial();

  //startボタンを押したらカウントアップする
  start.addEventListener('click',() => {
    //inactiveクラスがついたボタンの処理をできなくする
    if (start.classList.contains('inactive') === true){
      return;
    }

    //計測中はstopボタン以外押せないようにする
    setButtonStateRunning();

    startTime = Date.now();
    countUp();
  });

  //stopボタンを押したらカウントがストップする
  stop.addEventListener('click',() => {
    //inactiveクラスがついたボタンの処理をできなくする
    if (stop.classList.contains('inactive') === true){
      return;
    }

    //stop中はstartとreset以外押せないようにする
    setButtonStateStopped();

    clearTimeout(timeoutId);
    //stopを押した時にtimerが走っていた時間を保持する
    // elapsedTime = Date.now() - startTime;
    //これでは、elapsedTimeが直近の経過時間しか保持していないため、ストップ・スタートを繰り返すと時間が巻き戻ってしまうという問題がある。
    elapsedTime += Date.now() - startTime;
    //Date,now()はstopをclickした時間
    //startTimeは値が再代入されてstarをclickした時間になっている


  });

  //resetボタンがうまく作動しないと思ったら、use strictようのblock{}の外にあった
  //間違えてこの位置に } を挿入していた

  //resetボタンを押したらカウントをリセットする
  reset.addEventListener('click',() => {
    //inactiveクラスがついたボタンの処理をできなくする
    if (reset.classList.contains('inactive') === true){
      return;
    }

    //resetをしたときは最初の状態に戻せばいいので、
    setButtonStateInitial();

    timer.textContent = '00:00.000';
    // Stop してから Reset を押して、また Start すると前回 Stop した状態から始まってしまうので、elapsedTimeを０にする
    elapsedTime = 0;
  });

}