const board = document.querySelector('.stopwatch__board');
const recordList = document.querySelector('.stopwatch__record-list');
const btnLab = document.querySelector('.stopwatch__btn-lab');
const btnStart = document.querySelector('.stopwatch__btn-start');

let milisec = 0; // 밀리초
let seconds = 0; // 초
let minutes = 0; // 분
let count = 0; // 시간 세는 변수
let timer; // setInterval 값을 넣어 나중에 clearInterval 하기위한 변수

function countTime() {
  if (btnStart.value == '시작') {
    btnStart.value = '중단';
    btnStart.className = 'stopwatch__btn-stop';
    btnLab.value = '랩';
    btnLab.className = 'stopwatch__btn-lab';

    // setInterval 함수를 통해서 10milisecond마다 함수 실행
    timer = setInterval(function () {
      count += 1;
      minutes = Math.floor(count / 6000); // count를 분으로 변환
      let restValue1 = count % 6000;
      seconds = Math.floor(restValue1 / 100); // restValue1을 100으로 나누어 초로 변환
      let restValue2 = restValue1 % 100; // restValue1을 100으로 나누고 남은 restValue2를 구한다.
      milisec = restValue2;
      ClockPaint(); // 화면에 출력하기 위한 함수
    }, 10);
  } else if (btnStart.value == '중단' && count != 0) {
    clearInterval(timer);
    btnStart.value = '시작';
    btnStart.className = 'stopwatch__btn-start';
    btnLab.value = '재설정';
    btnLab.className = 'stopwatch__btn-reset';
  }
}

function ClockPaint() {
  board.innerText = `${minutes < 10 ? '0' + minutes : minutes}:${
    seconds < 10 ? '0' + seconds : seconds
  }:${milisec < 10 ? '0' + milisec : milisec}`;
}

function HandleRecord(event) {
  if (count == 0) {
    event.preventDefault();
  } else if (count !== 0 && btnLab.value == '랩') {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerText = `${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }: ${milisec < 10 ? '0' + milisec : milisec}`;
    li.appendChild(span);
    recordList.prepend(li);
  } else {
    HandleReset();
  }
}

function HandleReset() {
  count = 0;
  minutes = 0;
  seconds = 0;
  milisec = 0;
  if (document.querySelector('.stopwatch__record-list li')) {
    const li = document.querySelectorAll('li');

    for (let i = 0; i < li.length; i++) {
      recordList.removeChild(li[i]);
    }
  }
  ClockPaint();
}

function init() {
  // 시작 버튼 클릭시 countTime 함수 실행
  btnStart.addEventListener('click', countTime);
  btnLab.addEventListener('click', HandleRecord);
}

init(); // 처음에 클릭이벤트를 실행하기 위해서 만들어준 함수
