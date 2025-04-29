const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['รายรับ', 'รายจ่าย'],
      datasets: [{
        label: 'จำนวนเงิน (บาท)',
        data: [],
        backgroundColor: [
            'green',   // รายรับ = สีเขียว
            'red'      // รายจ่าย = สีแดง
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

const btnOne = document.getElementById('bgonecall')
const btnTwo = document.getElementById('bgtwocall')
const btnThree = document.getElementById('bgthreecall')
const btnFour = document.getElementById('bgfourcall')
const bgOne = document.getElementById('bg1')
const bgTwo = document.getElementById('bg2')
const bgThree = document.getElementById('bg3')
const bgFour = document.getElementById('bg4')
const topicText = document.getElementById('topictext')
const addNewBtn = document.getElementById('addnewbtn')
const btnAdd = document.getElementById('btnadd')
let selected = document.getElementById('select')
let dateType = document.getElementById('datetype')
let nameType = document.getElementById('nametype')
let moneyType = document.getElementById('moneytext')
let catType = document.getElementById('cattype')
let earnList = document.getElementById('earnlist')
let payList = document.getElementById('paylist')
let earnMoneyTotalEl = document.getElementById('earntotal')
let payMoneyTotalEl = document.getElementById('paytotal')
let earnMoneyTotal=0
let payMoneyTotal=0
let earnArr = []
let payArr = []
let countPay = 0
let countEarn = 0;


btnOne.addEventListener('click',callBgOne)
btnTwo.addEventListener('click',callBgTwo)
btnThree.addEventListener('click',callBgThree)
btnFour.addEventListener('click',callBgFour)
addNewBtn.addEventListener('click',callBgFour)

function callBgOne(){
    bgOne.style.display='flex'
    bgTwo.style.display='none'
    bgThree.style.display='none'
    bgFour.style.display='none'
    topicText.innerText='บันทึกรายรับรายจ่าย'
}

function callBgTwo(){
    bgOne.style.display='none'
    bgTwo.style.display='flex'
    bgThree.style.display='none'
    bgFour.style.display='none'
    topicText.innerText='รายการรายรับ'
}

function callBgThree(){
    bgOne.style.display='none'
    bgTwo.style.display='none'
    bgThree.style.display='flex'
    bgFour.style.display='none'
    topicText.innerText='รายการรายจ่าย'
}

function callBgFour(){
    bgOne.style.display='none'
    bgTwo.style.display='none'
    bgThree.style.display='none'
    bgFour.style.display='flex'
    topicText.innerText='เพิ่มรายการ'
}

btnAdd.addEventListener('click',addToHistory)

function addToHistory(){
  Swal.fire({
    title:  `<h3>เพิ่มรายการสำเร็จ<h3>`,
    icon: "success",
    draggable: true
  });
  if(selected.value === 'earn'){
    earnArr.push({
      date:dateType.value,
      name:nameType.value,
      money:moneyType.value,
      cat:catType.value})
      let listAddEarn = document.createElement('ul')
      listAddEarn.classList.add('itemlist')
      listAddEarn.id='earnlist'
      listAddEarn.innerHTML=`
            <li class="list">${earnArr[countEarn].date}</li>
            <li class="list">${earnArr[countEarn].name}</li>
            <li class="list">${earnArr[countEarn].money}</li>
            <li class="list">${earnArr[countEarn].cat}</li>
      `
      if(earnMoneyTotalEl.innerText==='0฿'){
        earnMoneyTotal = moneyType.value
      }
      else{
        
      }
      earnMoneyTotalEl.innerHTML=`${earnMoneyTotal}฿`
      bgTwo.appendChild(listAddEarn)
      countEarn++
      callBgTwo()
  }
  else{
    payArr.push({
      date:dateType.value,
      name:nameType.value,
      money:moneyType.value,
      cat:catType.value})
      let listAddPay = document.createElement('ul')
      listAddPay.classList.add('itemlist')
      listAddPay.id='paylist'
      listAddPay.innerHTML=`
            <li class="list">${payArr[countPay].date}</li>
            <li class="list">${payArr[countPay].name}</li>
            <li class="list">${payArr[countPay].money}</li>
            <li class="list">${payArr[countPay].cat}</li>
      `
      if(payMoneyTotalEl.innerText==='0฿'){
        payMoneyTotal = moneyType.value
      }
      else{
        
      }
      payMoneyTotalEl.innerHTML=`${payMoneyTotal}฿`
      bgThree.appendChild(listAddPay)
      countPay++
      callBgThree()
      
  }
  selected.value = 'none'
  dateType.value = ''
  nameType.value = ''
  moneyType.value = ''
  catType.value = 'none'
}

