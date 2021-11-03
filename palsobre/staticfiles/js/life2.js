var monthNames = ['Enero', 'Ferbrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
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

 

writeMonth(monthNumber);


function writeMonth(month) {
	for (var i = startDay(); i >= 1; i--) {
		dates.innerHTML += `<li><div class="days bg-days"></div></li>`;
	}

    var dateInput = document.querySelectorAll('.d-hidday');
    const list = [];
	var e = 0;

    for (var i = 0; i <= dateInput.length - 1; i++) {
        var regMonth = new Date(dateInput[i].value)
        if (regMonth.getMonth() == month) {
            list[e] = regMonth.getDate();
			e++;
        }
        
    }
	console.log(list[1]);
    meta.textContent = getTotalDays(monthNumber).toString() + '/' + list.length;
	var a = 0;
	for (var i = 1; i <= getTotalDays(month); i++) {
		if (i <= currentDay) {
			for (var j = 0; j <= list.length - 1; j++) {
				if (i == list[j]) {
					dates.innerHTML += `<li><div class="days bg-days">${i}<div class="yes"></div></div></li>`;
				}else {
					dates.innerHTML += `<li><div class="days bg-days">${i}<div class="no"></div></div></li>`;
				}
			}

		} else {

			dates.innerHTML += `<li><div class="days bg-days">${i}</div></li>`;
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

function setNewDate() {
	currentDate.setFullYear(currentYear, monthNumber, currentDay);
	month.textContent = monthNames[monthNumber];
	year.textContent = currentYear.toString();
	dates.textContent = ''


	writeMonth(monthNumber);

}