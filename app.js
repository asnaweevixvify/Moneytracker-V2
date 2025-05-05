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
const navToggle = document.getElementById('navToggle')
let selected = document.getElementById('select');
let dateType = document.getElementById('datetype');
let nameType = document.getElementById('nametype');
let moneyType = document.getElementById('moneytext');
let catType = document.getElementById('cattype');
let earnList = document.getElementById('earnlist');
let payList = document.getElementById('paylist');
let earnMoneyTotalEl = document.getElementById('earntotal');
let payMoneyTotalEl = document.getElementById('paytotal');
let earnMoneyTotalSplit = document.getElementById('earntotalsplit');
let payMoneyTotalSplit = document.getElementById('paytotalsplit');
let filterSelectEarn = document.getElementById('monthEarn')
let filterSelectPay = document.getElementById('monthPay')
const header = document.querySelector('.header');

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
  let earnMoneySplit = earnMoneyTotal 
  let payMoneySplit = payMoneyTotal
  earnMoneyTotalEl.innerHTML = `${Intl.NumberFormat().format(earnMoneyTotal)}฿`;
  earnMoneyTotalSplit.innerHTML=`${Intl.NumberFormat().format(earnMoneySplit)}฿`;
  payMoneyTotalEl.innerHTML = `${Intl.NumberFormat().format(payMoneyTotal)}฿`;
  payMoneyTotalSplit.innerHTML = `${Intl.NumberFormat().format(payMoneySplit)}฿`;

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
  header.classList.remove('open')
  const listPayAll = bgThree.querySelectorAll('ul#paylist')
  const listEarnAll = bgTwo.querySelectorAll('ul#earnlist')
  payMoneyTotalSplit.innerHTML = `${Intl.NumberFormat().format(payMoneyTotal)}฿`;
  earnMoneyTotalSplit.innerHTML = `${Intl.NumberFormat().format(earnMoneyTotal)}฿`;

  listPayAll.forEach(e=>{
    e.style.display='flex'
  })
  listEarnAll.forEach(e=>{
    e.style.display='flex'
  })
  filterSelectEarn.value='none'
  filterSelectPay.value='none'

}

function callBgTwo() {
  bgOne.style.display = 'none';
  bgTwo.style.display = 'flex';
  bgThree.style.display = 'none';
  bgFour.style.display = 'none';
  topicText.innerText = 'รายการรายรับ';
  header.classList.remove('open')
  const listPayAll = bgThree.querySelectorAll('ul#paylist')
  const listEarnAll = bgTwo.querySelectorAll('ul#earnlist')
  payMoneyTotalSplit.innerHTML = `${Intl.NumberFormat().format(payMoneyTotal)}฿`;
  earnMoneyTotalSplit.innerHTML = `${Intl.NumberFormat().format(earnMoneyTotal)}฿`;
  listPayAll.forEach(e=>{
    e.style.display='flex'
  })
  listEarnAll.forEach(e=>{
    e.style.display='flex'
  })
  filterSelectEarn.value='none'
  filterSelectPay.value='none'

}

function callBgThree() {
  bgOne.style.display = 'none';
  bgTwo.style.display = 'none';
  bgThree.style.display = 'flex';
  bgFour.style.display = 'none';
  topicText.innerText = 'รายการรายจ่าย';
  header.classList.remove('open')
  const listPayAll = bgThree.querySelectorAll('ul#paylist')
  const listEarnAll = bgTwo.querySelectorAll('ul#earnlist')

  payMoneyTotalSplit.innerHTML = `${Intl.NumberFormat().format(payMoneyTotal)}฿`;
  earnMoneyTotalSplit.innerHTML = `${Intl.NumberFormat().format(earnMoneyTotal)}฿`;

  listPayAll.forEach(e=>{
    e.style.display='flex'
  })
  listEarnAll.forEach(e=>{
    e.style.display='flex'
  })
  filterSelectEarn.value='none'
  filterSelectPay.value='none'

}

function callBgFour() {
  bgOne.style.display = 'none';
  bgTwo.style.display = 'none';
  bgThree.style.display = 'none';
  bgFour.style.display = 'flex';
  topicText.innerText = 'เพิ่มรายการ';
  header.classList.remove('open')
  const listPayAll = bgThree.querySelectorAll('ul#paylist')
  const listEarnAll = bgTwo.querySelectorAll('ul#earnlist')

  payMoneyTotalSplit.innerHTML = `${Intl.NumberFormat().format(payMoneyTotal)}฿`;
  earnMoneyTotalSplit.innerHTML = `${Intl.NumberFormat().format(earnMoneyTotal)}฿`;

  listPayAll.forEach(e=>{
    e.style.display='flex'
  })
  listEarnAll.forEach(e=>{
    e.style.display='flex'
  })
  filterSelectEarn.value='none'
  filterSelectPay.value='none'

}

function addToHistory() {
  Swal.fire({
    title: `<h3>เพิ่มรายการสำเร็จ<h3>`,
    icon: "success",
    draggable: true
  });
  if(!isNaN(Number(nameType.value)) || isNaN(Number(moneyType.value)) || selected.value === 'none' || dateType.value === '' || nameType.value === '' || moneyType.value === '' || catType.value==='none'){
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
    const dataToSend = {
      date: dateType.value,
      type: 'รายรับ',
      name: nameType.value,
      money: moneyType.value,
      category: catType.value
    };
    showListEarn(earnArr.length - 1);
    calEarn();
    resetDisplay();
    saveMode()
    sendToGoogleSheet(dataToSend);
  } else {
    payArr.push({
      date: dateType.value,
      name: nameType.value,
      money: moneyType.value,
      cat: catType.value
    });
    const dataToSend = {
      date: dateType.value,
      type: 'รายจ่าย',
      name: nameType.value,
      money: moneyType.value,
      category: catType.value
    };
    showListPay(payArr.length - 1);
    calPay();
    resetDisplay();
    saveMode()
    sendToGoogleSheet(dataToSend);
    
  }
}
function sendToGoogleSheet(data) {
  fetch('https://script.google.com/macros/s/AKfycbwZ9PXWXnOXdQuI1_Cx8CIbzmjKHd7xB4YhIEwr_WIKs2Tnxcq8T8mVNSDmuHhQt5mP/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
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
  let earnMoneySplit = earnMoneyTotal 
  earnMoneyTotalEl.innerHTML = `${Intl.NumberFormat().format(earnMoneyTotal)}฿`;
  earnMoneyTotalSplit.innerHTML=`${Intl.NumberFormat().format(earnMoneySplit)}฿`;
  updateChart()
  saveMode()
}

function calPay() {
  if (payMoneyTotalEl.innerText === '0฿') {
    payMoneyTotal = parseInt(moneyType.value);
  } else {
    payMoneyTotal += parseInt(moneyType.value);
  }
  let payMoneySplit = payMoneyTotal
  payMoneyTotalEl.innerHTML = `${Intl.NumberFormat().format(payMoneyTotal)}฿`;
  payMoneyTotalSplit.innerHTML = `${Intl.NumberFormat().format(payMoneySplit)}฿`;

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
        earnMoneyTotalSplit.innerHTML = `${Intl.NumberFormat().format(earnMoneyTotal)}฿`;
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
        payMoneyTotalSplit.innerHTML = `${Intl.NumberFormat().format(payMoneyTotal)}฿`;
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
    e.classList.remove('selected')
    let dateInner = e.firstElementChild.innerText
    let dateNew  = new Date(dateInner)
    let monthInner = dateNew.getMonth()
    if (monthInner === monthSelect) {
      e.style.display = 'flex'; 
      e.classList.add('selected')
    }
    else {
      e.style.display = 'none';
    }
  })
  const listEarnMonth = bgTwo.querySelectorAll('ul.selected')
  let earnMoneySplitStart =0
    listEarnMonth.forEach(e=>{
      let allEarnMonth = e.childNodes[5].innerText
      let earnMoneySplit = parseInt(allEarnMonth)
      if(earnMoneySplitStart === 0){
        earnMoneySplitStart = earnMoneySplit
      }
      else{
        earnMoneySplitStart += earnMoneySplit
      }
    })
    earnMoneyTotalSplit.innerHTML = `${Intl.NumberFormat().format(earnMoneySplitStart)}฿`;
}

function filterPayMode(){
  const listPayAll = bgThree.querySelectorAll('ul#paylist')
  let monthSelect = Number(filterSelectPay.value)
  listPayAll.forEach((e)=>{
    e.classList.remove('selected')
    let dateInner = e.firstElementChild.innerText
    let dateNew  = new Date(dateInner)
    let monthInner = dateNew.getMonth()
    if (monthInner === monthSelect) {
      e.style.display = 'flex'; 
      e.classList.add('selected')
    }
    else {
      e.style.display = 'none';
    }
  })
  const listPayMonth = bgThree.querySelectorAll('ul.selected')
  let payMoneySplitStart =0
    listPayMonth.forEach(e=>{
      let allPayMonth = e.childNodes[5].innerText
      let payMoneySplit = parseInt(allPayMonth)
      if(payMoneySplitStart === 0){
        payMoneySplitStart = payMoneySplit
      }
      else{
        payMoneySplitStart += payMoneySplit
      }
    })
    payMoneyTotalSplit.innerHTML = `${Intl.NumberFormat().format(payMoneySplitStart)}฿`;
}

navToggle.addEventListener('click',function(){
  header.classList.toggle('open')
})