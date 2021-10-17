var monthNames = ['Enero', 'Ferbrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Novienbre', 'Diciembre'];
var fixedCurrentDate = new Date();
var currentDate = new Date();
var currentDay = currentDate.getDate();
var monthNumber = currentDate.getMonth();
var currentYear = currentDate.getFullYear();

var dates = document.getElementById('dates');
var month = document.getElementById('month');
var year = document.getElementById('year');
var title = document.getElementById('title');
var meta = document.getElementById('meta-days');


title.textContent = monthNames[monthNumber] + '  ' + currentYear.toString();
meta.textContent = getTotalDays(monthNumber).toString() + '/16';


writeMonth(monthNumber);


function writeMonth(month) {
	for (var i = startDay(); i >= 1; i--) {
		dates.innerHTML += `<div class="calendar-date calendar-item-day days ">
		</div>`;
	}

	for (var i = 1; i <= getTotalDays(month); i++) {

		if (month === fixedCurrentDate.getMonth()) {
			if (i === currentDay) {
				dates.innerHTML += `<div class="calendar-date calendar-item-day today days">${i}</div>`;
			}else {
				dates.innerHTML += `<div class="calendar-date calendar-item-day days">${i}</div>`;
			}
		} else {
			dates.innerHTML += `<div class="calendar-date calendar-item days">${i}</div>`;
		}

	}
}

function getTotalDays(month) {
	if (month === -1) month = 11;

	if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {

		return 31;

	}else if (month == 3 || month == 5 || month == 8 || month == 10) {

		return 30;

	}else {

		return isLeap() ? 29:28;
	}
}

function isLeap() {
	return ((currentYear % 100 !== 0) && (currentYear % 4 === 0) || (currentYear % 400 === 0));
}

function startDay() {
	var start = new Date(currentYear, monthNumber, 1);
	
	if (start.getDay()-1 === -1) {
		return 6;
	}
	return start.getDay()-1;
}

function lastMonth() {
	
	if (monthNumber !== 0) {
		monthNumber--;
	}else {
		monthNumber = 11;
		currentYear--;
	}

	setNewDate();
}

function nextMonth() {
	if (monthNumber !== 11) {
		monthNumber++;
	}else {
		monthNumber = 0;
		currentYear++;
	}
	setNewDate();
}

function setNewDate() {
	currentDate.setFullYear(currentYear, monthNumber, currentDay);
	month.textContent = monthNames[monthNumber];
	year.textContent = currentYear.toString();
	dates.textContent = ''


	writeMonth(monthNumber);

}