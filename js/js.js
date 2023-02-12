const calendarContainer = document.querySelector('.calendar')
const datesContainer = calendarContainer.querySelector('.dates')
const [prevBtn, nextBtn] = document.querySelectorAll('.btns button')
const info = document.querySelector('.info')

const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
const today = getDateDetails(new Date)
const currentMonth = { year: today.year, month: today.month }

prevBtn.onclick = showPrevMonth
nextBtn.onclick = showNextMonth

let dates = []

fillDates()
renderCalendar()

calendarContainer.onclick = handleCalendarClick

function renderCalendar() {
    const dateItems = dates.map(makeDateItem)
    datesContainer.replaceChildren(...dateItems)
    info.innerText = months[currentMonth.month] + " " + currentMonth.year


}

function handleCalendarClick() {

}

function makeDateItem({ year, month, date, current }) {
    const dateItem = document.createElement('li')

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

    return dates.map((date) => ({ year, month, date }))
}

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







