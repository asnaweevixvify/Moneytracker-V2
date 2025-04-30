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
let filterSelectEarn = document.getElementById('monthEarn')
let filterSelectPay = document.getElementById('monthPay')

let earnMoneyTotal = 0;
let payMoneyTotal = 0;
let earnArr = [];
let payArr = [];

let listAddEarn;
let listAddPay;
let myChart;
const ctx = document.getElementById('myChart');

window.onload=function(){
  earnArr = JSON.parse(localStorage.getItem('earnArrSave')) || []
  payArr  = JSON.parse(localStorage.getItem('payArrSave')) || []
  earnMoneyTotal = parseInt(localStorage.getItem('earnTotalSave'))|| 0;
  payMoneyTotal = parseInt(localStorage.getItem('payTotalSave'))|| 0;
  countEarn =  earnArr.length;
  countPay = payArr.length;

  if (earnArr.length > 0) {
    for (let i = 0; i < earnArr.length; i++) {
      showListEarn(i);
    }
  }

  if (payArr.length > 0) {
    for (let i = 0; i < payArr.length; i++) {
      showListPay(i);
    }
  }
  updateChart()
  earnMoneyTotalEl.innerHTML = `${Intl.NumberFormat().format(earnMoneyTotal)}฿`;
  payMoneyTotalEl.innerHTML = `${Intl.NumberFormat().format(payMoneyTotal)}฿`;
  callBgOne()
}

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
    showListEarn(earnArr.length - 1);
    calEarn();
    resetDisplay();
  } else {
    payArr.push({
      date: dateType.value,
      name: nameType.value,
      money: moneyType.value,
      cat: catType.value
    });
    showListPay(payArr.length - 1);
    calPay();
    resetDisplay();
    saveMode()
  }
}

function showListEarn(index) {
  const item = earnArr[index];
  listAddEarn = document.createElement('ul');
  listAddEarn.classList.add('itemlist');
  listAddEarn.id = 'earnlist';
  listAddEarn.innerHTML = `
    <li class="list">${item.date}</li>
    <li class="list">${item.name}</li>
    <li class="list">${item.money}</li>
    <li class="list">${item.cat}</li>
    <li class="list"><i class="fa-solid fa-trash " style="color: #ff0000;" id="delbtnEarn"></i></li>
  `;
  bgTwo.appendChild(listAddEarn);
  callBgTwo();
  saveMode()
}

function showListPay(index) {
  const item = payArr[index];
  listAddPay = document.createElement('ul');
  listAddPay.classList.add('itemlist');
  listAddPay.id = 'paylist';
  listAddPay.innerHTML = `
    <li class="list">${ item.date}</li>
    <li class="list">${ item.name}</li>
    <li class="list">${ item.money}</li>
    <li class="list">${ item.cat}</li>
    <li class="list"><i class="fa-solid fa-trash" style="color: #ff0000;" id="delbtnPay"></i></li>
  `;
  bgThree.appendChild(listAddPay);
  callBgThree();
  saveMode()
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
  saveMode()
}

function calPay() {
  if (payMoneyTotalEl.innerText === '0฿') {
    payMoneyTotal = parseInt(moneyType.value);
  } else {
    payMoneyTotal += parseInt(moneyType.value);
  }
  payMoneyTotalEl.innerHTML = `${Intl.NumberFormat().format(payMoneyTotal)}฿`;
  updateChart()
  saveMode()
}

bgTwo.addEventListener('click', function (e) {
  if (e.target && e.target.id === 'delbtnEarn') {
    delListEarn(e);
  }
});

bgThree.addEventListener('click', function (e) {
  if (e.target && e.target.id === 'delbtnPay') {
    delListPay(e);
  }
});

function delListEarn(e) {
  const targetItem = e.target.closest('ul');
  if (targetItem) {
    Swal.fire({
      title: `<h3>คุณต้องการจะลบรายการนี้หรือไม่<h3>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText:`ลบ`
    }).then((result) => {
      if (result.isConfirmed) {
        let targetAll = targetItem.querySelectorAll('li');
        let delMoney = parseInt(targetAll[2].innerText)
        earnMoneyTotal -= delMoney
        earnMoneyTotalEl.innerHTML = `${Intl.NumberFormat().format(earnMoneyTotal)}฿`;
        updateChart()
        targetItem.remove();
        const delList = earnArr.findIndex(u=>
          u.date===targetAll[0].innerText && u.name===targetAll[1].innerText && u.money === targetAll[2].innerText 
        )
        earnArr.splice(delList,1)
        countEarn--
        saveMode()
        Swal.fire({
          title: `<h3>ลบรายการสำเร็จ<h3>`,
          icon: "success"
        });
      }
    });
  }
}

function delListPay(e) {
  const targetItem = e.target.closest('ul');
  if (targetItem) {
    Swal.fire({
      title: `<h3>คุณต้องการจะลบรายการนี้หรือไม่<h3>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText:`ลบ`
    }).then((result) => {
      if (result.isConfirmed) {
        let targetAll = targetItem.querySelectorAll('li');
        let delMoney = parseInt(targetAll[2].innerText)
        payMoneyTotal -= delMoney
        payMoneyTotalEl.innerHTML = `${Intl.NumberFormat().format(payMoneyTotal)}฿`;
        updateChart()
        targetItem.remove();
        const delList = payArr.findIndex(u=>
          u.date===targetAll[0].innerText && u.name===targetAll[1].innerText && u.money === targetAll[2].innerText 
        )
        payArr.splice(delList,1)
        countPay--
        saveMode()
        Swal.fire({
          title: `<h3>ลบรายการสำเร็จ<h3>`,
          icon: "success"
        });
      }
    });
  }
}

function saveMode(){
  localStorage.setItem('earnArrSave',JSON.stringify(earnArr))
  localStorage.setItem('payArrSave',JSON.stringify(payArr))
  localStorage.setItem('earnTotalSave',earnMoneyTotal)
  localStorage.setItem('payTotalSave',payMoneyTotal)
}

filterSelectEarn.addEventListener('change',filterEarnMode)
filterSelectPay.addEventListener('change',filterPayMode)

function filterEarnMode(){
  const listEarnAll = bgTwo.querySelectorAll('ul#earnlist')
  let monthSelect = Number(filterSelectEarn.value)
  listEarnAll.forEach((e)=>{
    let dateInner = e.firstElementChild.innerText
    let dateNew  = new Date(dateInner)
    let monthInner = dateNew.getMonth()
    if (monthInner === monthSelect) {
      e.style.display = 'flex'; 
    }
    else {
      e.style.display = 'none';
    }
  })
}

function filterPayMode(){
  const listPayAll = bgThree.querySelectorAll('ul#paylist')
  let monthSelect = Number(filterSelectPay.value)
  listPayAll.forEach((e)=>{
    let dateInner = e.firstElementChild.innerText
    let dateNew  = new Date(dateInner)
    let monthInner = dateNew.getMonth()
    if (monthInner === monthSelect) {
      e.style.display = 'flex'; 
    }
    else {
      e.style.display = 'none';
    }
  })
}