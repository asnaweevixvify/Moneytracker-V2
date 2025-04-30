const btnOne = document.getElementById('bgonecall');
const btnTwo = document.getElementById('bgtwocall');
const btnThree = document.getElementById('bgthreecall');
const btnFour = document.getElementById('bgfourcall');
const bgOne = document.getElementById('bg1');
const bgTwo = document.getElementById('bg2');
const bgThree = document.getElementById('bg3');
const bgFour = document.getElementById('bg4');
const topicText = document.getElementById('topictext');
const addNewBtn = document.getElementById('addnewbtn');
const btnAdd = document.getElementById('btnadd');
let selected = document.getElementById('select');
let dateType = document.getElementById('datetype');
let nameType = document.getElementById('nametype');
let moneyType = document.getElementById('moneytext');
let catType = document.getElementById('cattype');
let earnList = document.getElementById('earnlist');
let payList = document.getElementById('paylist');
let earnMoneyTotalEl = document.getElementById('earntotal');
let payMoneyTotalEl = document.getElementById('paytotal');

let earnMoneyTotal = 0;
let payMoneyTotal = 0;
let currentMoneyEarn = 0;
let currentMoneyPay = 0;
let earnArr = [];
let payArr = [];
let countPay = 0;
let countEarn = 0;
let listAddEarn;
let listAddPay;
let myChart;
const ctx = document.getElementById('myChart');

function updateChart(){
  if (myChart) {
    myChart.destroy(); 
  }

  myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['รายรับ', 'รายจ่าย'],
      datasets: [{
        label: 'จำนวนเงิน (บาท)',
        data: [earnMoneyTotal,payMoneyTotal],
        backgroundColor: [
          'green',   
          'red'      
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

btnOne.addEventListener('click', callBgOne);
btnTwo.addEventListener('click', callBgTwo);
btnThree.addEventListener('click', callBgThree);
btnFour.addEventListener('click', callBgFour);
addNewBtn.addEventListener('click', callBgFour);
btnAdd.addEventListener('click', addToHistory);

function callBgOne() {
  bgOne.style.display = 'flex';
  bgTwo.style.display = 'none';
  bgThree.style.display = 'none';
  bgFour.style.display = 'none';
  topicText.innerText = 'บันทึกรายรับรายจ่าย';
}

function callBgTwo() {
  bgOne.style.display = 'none';
  bgTwo.style.display = 'flex';
  bgThree.style.display = 'none';
  bgFour.style.display = 'none';
  topicText.innerText = 'รายการรายรับ';
}

function callBgThree() {
  bgOne.style.display = 'none';
  bgTwo.style.display = 'none';
  bgThree.style.display = 'flex';
  bgFour.style.display = 'none';
  topicText.innerText = 'รายการรายจ่าย';
}

function callBgFour() {
  bgOne.style.display = 'none';
  bgTwo.style.display = 'none';
  bgThree.style.display = 'none';
  bgFour.style.display = 'flex';
  topicText.innerText = 'เพิ่มรายการ';
}

function addToHistory() {
  Swal.fire({
    title: `<h3>เพิ่มรายการสำเร็จ<h3>`,
    icon: "success",
    draggable: true
  });
  if(selected.value === 'none' || dateType.value === '' || nameType.value === '' || moneyType.value === '' || catType.value==='none'){
    Swal.fire({
      icon: "error",
      title: `<h3>โปรดกรอกข้อมูลให้ครบ<h3>`,
    });
  }
  else if (selected.value === 'earn') {
    earnArr.push({
      date: dateType.value,
      name: nameType.value,
      money: moneyType.value,
      cat: catType.value
    });
    showListEarn();
    calEarn();
    resetDisplay();
  } else {
    payArr.push({
      date: dateType.value,
      name: nameType.value,
      money: moneyType.value,
      cat: catType.value
    });
    showListPay();
    calPay();
    resetDisplay();
  }
}

function showListEarn() {
  listAddEarn = document.createElement('ul');
  listAddEarn.classList.add('itemlist');
  listAddEarn.id = 'earnlist';
  listAddEarn.innerHTML = `
    <li class="list">${earnArr[countEarn].date}</li>
    <li class="list">${earnArr[countEarn].name}</li>
    <li class="list">${earnArr[countEarn].money}</li>
    <li class="list">${earnArr[countEarn].cat}</li>
    <li class="list"><i class="fa-solid fa-trash " style="color: #ff0000;"></i></li>
  `;
  bgTwo.appendChild(listAddEarn);
  countEarn++;
  callBgTwo();
}

function showListPay() {
  listAddPay = document.createElement('ul');
  listAddPay.classList.add('itemlist');
  listAddPay.id = 'paylist';
  listAddPay.innerHTML = `
    <li class="list">${payArr[countPay].date}</li>
    <li class="list">${payArr[countPay].name}</li>
    <li class="list">${payArr[countPay].money}</li>
    <li class="list">${payArr[countPay].cat}</li>
    <li class="list"><i class="fa-solid fa-trash" style="color: #ff0000;"></i></li>
  `;
  bgThree.appendChild(listAddPay);
  countPay++;
  callBgThree();
}

function resetDisplay() {
  selected.value = 'none';
  dateType.value = '';
  nameType.value = '';
  moneyType.value = '';
  catType.value = 'none';
}

function calEarn() {
  if (earnMoneyTotalEl.innerText === '0฿') {
    earnMoneyTotal = parseInt(moneyType.value);
  } else {
    earnMoneyTotal += parseInt(moneyType.value);
  }
  earnMoneyTotalEl.innerHTML = `${Intl.NumberFormat().format(earnMoneyTotal)}฿`;
  updateChart()
}

function calPay() {
  if (payMoneyTotalEl.innerText === '0฿') {
    payMoneyTotal = parseInt(moneyType.value);
  } else {
    payMoneyTotal += parseInt(moneyType.value);
  }
  payMoneyTotalEl.innerHTML = `${Intl.NumberFormat().format(payMoneyTotal)}฿`;
  updateChart()
}
