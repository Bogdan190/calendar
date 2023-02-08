const calendar = document.querySelector('#calendar');
const info = calendar.querySelector('.info');
const datesContainer = document.querySelector('.dates')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')






const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
const countDaysMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const date = new Date();
const year = date.getFullYear();
let monthIndex = date.getMonth();

const month = months[monthIndex];
const lastDayOfMonth = getLastDay(year, month);
const firstWeekDay = getFirstWeekDay(year, month);
const lastWeekDay = getLastWeekDay(year, month);
const dates = range(lastDayOfMonth);

normalize(dates, firstWeekDay, 6 - lastWeekDay);


const twoDimArr = dates.reduce((twoDimArr, item, i) => {
    if (i % 7 == 0) twoDimArr.push([]);
    twoDimArr.at(-1).push(item);
    return twoDimArr;
}, [])

info.innerHTML = month + ' ' + year;

datesContainer.innerHTML = ''



nextBtn.onclick = showNextMonth






renderCalendar()

function showNextMonth() {

    monthIndex++
}
function renderMonth() {


    //dates.push(date)
}





function range(count) {
    const arr = []
    for (let i = 1; i < count + 1; i++) {
        arr.push(i)
    }
    return arr
}

function getLastDay(year, month) {
    // for (let i = 0; i < months.length; i++) {
    //     if (months[i] == month) {
    //         return countDaysMonths[i]
    //     }
    // }
    const i = months.indexOf(month);
    return countDaysMonths[i];
}

function getFirstWeekDay(year, month) {
    const monthIndex = months.findIndex(m => m == month);
    const dateDay = new Date(year, monthIndex, 1);

    return dateDay.getDay();
}

function getLastWeekDay(year, month) {
    let monthIndex = months.findIndex(m => m == month)
    let dateDay = new Date(year, monthIndex, lastDayOfMonth);
    return dateDay.getDay();
}

function normalize(arr, left, right) {
    for (let i = 0; i < right; i++) {
        arr.push('')
    }
    for (let i = 0; i < left; i++) {
        arr.unshift('')
    }
}



function renderCalendar() {
    for (let j = 0; j < twoDimArr.length; j++) {
        for (let k = 0; k < twoDimArr[j].length; k++) {
            const div = document.createElement('div')
            div.className = 'date'
            div.innerHTML = twoDimArr[j][k]
            datesContainer.append(div)
        }
    }


}


datesContainer.onclick = (e) => {
    if (e.target.className == "date") {
        let item = e.target.closest('.date')
        handleCreate(item)
    }
}

function handleCreate(item) {
    let text = item.innerHTML

    let task = windowText(text)
    calendar.append(task)

}

function windowText(text) {
    let div = document.createElement('div')
    div.className = "window"
    div.innerHTML = `<div class="dateInfo"> ${text} Январь 2018</div>
        <input type="text" placeholder="введите заметку">`

    return div
}

function createItem() {

}













