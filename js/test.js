
const calendarContainer = document.querySelector('.calendar')
const datesContainer = calendarContainer.querySelector('.dates')
const {year, month, date} = getDateDetails((new Date))
console.log(year)
let dates = []

fillDates(year, month)
renderCalendar()

calendarContainer.onclick = handleCalendarClick

function renderCalendar(){
    const dateItems = dates.map(makeDateItem)
    datesContainer.replaceChildren(...dateItems)
}

function handleCalendarClick(){
    
}

function makeDateItem(date){
    const dateItem = document.createElement('li')
    dateItem.innerText = date
    return dateItem
}

function getDateDetails(date){
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate()
    }
}



function fillDates(year, month){
    const startWeekDay = new Date(year, month).getDate()
    const endWeekDay = new Date(year, month + 1, 0).getDate()
    const startEmptyCount = startWeekDay || 7
    const endEmptyCount = 6 - endWeekDay || 7
    const prevDates = getMonthDates(year, month - 1).slice(-startEmptyCount)
    const currDates = getMonthDates(year, month)
    const nextDates = getMonthDates(year, month + 1).slice(0, endEmptyCount)
    dates = [...prevDates, ...currDates, ...nextDates]
}

function getMonthDates(year, month){
    const count = new Date(year, month+1).getDate()
    const dates = range(1, count)
    return dates
}

function range(from, to){
    return [...Array(5).keys().map(num => num + from)]
}