const calendarContainer = document.querySelector('.calendar')
const datesContainer = calendarContainer.querySelector('.dates')
const [prevBtn, nextBtn] = document.querySelectorAll('.btns button')
const info = document.querySelector('.info')
const dateInfo = document.querySelector('.dateInfo')
const list = document.querySelector('.list')
const taskForm = document.querySelector('.window')
const calendar = document.querySelector('.calendar');
const [addBtn, saveBtn] = document.querySelectorAll('.add-form button')
const input = document.querySelector('.add-form input')
const editMode = document.querySelector('#edit-mode-box')
const statusBar = document.querySelector('.status-bar')
const [doneCount, taskCount] = document.querySelectorAll('.counter span')
const removeBtn = document.querySelector('.remove-btn')
const closeBtn = document.querySelector('.close')
let lastId = 0
let editId

const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
const today = getDateDetails(new Date)
const currentMonth = { year: today.year, month: today.month }

let tasks = [
 
]

prevBtn.onclick = showPrevMonth
nextBtn.onclick = showNextMonth
addBtn.onclick = handleAdd
saveBtn.onclick = handleSave
removeBtn.onclick = handleRemoveDone
closeBtn.onclick = handleClose

let dates = []
let activeDate

fillDates()
renderCalendar()

calendarContainer.onclick = handleCalendarClick
datesContainer.onclick = (e) => {
    if (e.target.className == "date") {
        taskForm.style.display = "block"
        activeDate = e.target.dataset.date
        dateInfo.innerHTML = activeDate
    }
}

list.onclick = (e) => {
    if(e.target.className == "del-btn"){
        let li = e.target.closest('li')
        handleRemoveOne(li)
        updateCount()
    }
    if(e.target.className == "edit-btn"){
        let li = e.target.closest('li')
        handleEdit(li)
    }
    if(e.target.tagName == "INPUT"){
        let li = e.target.closest('li')
        handleCheck(li)
        updateCount()
    }
}



function renderCalendar() {
    const dateItems = dates.map(makeDateItem)
    datesContainer.replaceChildren(...dateItems)
    info.innerText = months[currentMonth.month] + " " + currentMonth.year
}

function handleCalendarClick() {

}

function makeDateItem({ year, month, date, current }) {
    const dateItem = document.createElement('li')
    dateItem.className = 'date'
    const day = new Date(year, month, date).getDay()

    if (day == 0 || day == 6) {
        dateItem.style.color = "red"
    }

    if (year == today.year && month == today.month && date == today.date) {
        dateItem.style.fontWeight = 'bold'
        dateItem.style.border = "1px solid"
    }

    if (!current) {
        dateItem.style.opacity = "0.3"
    }

    dateItem.innerText = date

    dateItem.dataset.date = new Date(Date.UTC(year, month, date)).toISOString().slice(0, 10)

    return dateItem
}

function getDateDetails(date) {
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
    }
}

function fillDates() {
    const { year, month } = currentMonth
    const startWeekDay = new Date(year, month).getDay()
    const endWeekDay = new Date(year, month + 1, 0).getDay()
    const startEmptyCount = startWeekDay || 7
    const endEmptyCount = 6 - endWeekDay || 7
    const prevDates = getMonthDates(year, month - 1).slice(-startEmptyCount)
    const currDates = getMonthDates(year, month)
    const nextDates = getMonthDates(year, month + 1).slice(0, endEmptyCount)

    currDates.forEach(date => date.current = true)

    dates = [...prevDates, ...currDates, ...nextDates]
}

function getMonthDates(year, month) {
    const count = new Date(year, month + 1, 0).getDate()
    const dates = range(1, count)
    const date = new Date(year, month)

    year = date.getFullYear()
    month = date.getMonth()

    return dates.map((date) => ({ year, month, date }))
}
//-1
//year, month

function range(from, to) {
    return [...Array(to - from + 1).keys()].map(num => num + from);
}



function showPrevMonth() {
    const { year, month } = getDateDetails(new Date(currentMonth.year, currentMonth.month - 1))

    currentMonth.year = year
    currentMonth.month = month

    fillDates()
    renderCalendar()
}

function showNextMonth() {
    const { year, month } = getDateDetails(new Date(currentMonth.year, currentMonth.month + 1))

    currentMonth.year = year
    currentMonth.month = month

    fillDates()
    renderCalendar()
}

function handleEdit(li) {
    editMode.checked = true
    input.value = li.querySelector('span').innerText
    editId = li.dataset.id
}

function handleSave() {
    editMode.checked = false
    let task = tasks.find(task => task.id == editId)
    task.text = input.value
    renderTasks()
}

function createTask(text){
    return {id: generateId(), text, done: false, date: activeDate}
}

function generateId(){
    return ++lastId
}

function handleAdd(data){
    let text = input.value
    let task = createTask(text)
    tasks.push(task)
    input.value = ""
    statusBar.style.display = "flex"
    updateCount()
    renderTasks()
}

function renderTasks(){
    return list.replaceChildren(...tasks.map(renderTask))
}

function renderTask(task){
    let li = document.createElement('li')
    li.className = 'item'
    li.dataset.id = task.id
    li.innerHTML = ` <input type="checkbox" ${task.done ? "checked" : ""}>
    <span>${task.text}</span>
    <button class="edit-btn">🖊</button>
    <button class="del-btn">❌</button>`

    return li
}

function handleRemoveOne(li) {
    const id = li.dataset.id
    const index = tasks.findIndex(task => task.id == id)
    tasks.splice(index,1)
    renderTasks()
}

function updateCount() {
    
    taskCount.innerText = list.children.length + 1
    doneCount.innerText = list.querySelectorAll(":checked").length
}

function handleRemoveDone() {
    const doneTasks = tasks.filter((task => task.done))
    console.log(tasks)
    doneTasks.forEach(task => {
        const index = tasks.indexOf(task) 
        tasks.splice(index, 1)
    })
    updateCount()
    renderTasks()
}

function handleCheck(li) {
    const checkId = li.dataset.id
    const task = tasks.find(task => task.id == checkId)
    //const checked = li.querySelector(":checked") ? true : false
    const checked = Boolean(li.querySelector(":checked"))
    task.done = checked

}

function handleClose(){
    taskForm.style.display = "none"
}