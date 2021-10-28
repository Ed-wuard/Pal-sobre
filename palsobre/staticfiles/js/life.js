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


function writeMonth(month, listJson) {
	const dateDays = [];
	var e = 0;

	for (var i = startDay(); i >= 1; i--) {

		dateDays[e] = `<div class="calendar-date calendar-item-day days bg-days "></div>`;

		e++;
	}

	var f = dateDays.length;
	var dateInput = document.querySelectorAll('.d-hidday');

	for (var i = 1; i <= getTotalDays(month); i++) {
		
		for (var a = 0; a <= dateInput.length - 1; a++) { // con esto recorro la fechas de mis registro
			var dateInputOne = new Date(dateInput[a].value); // creo un obj tipo Date para sacar el dia
			var dayInputOne= dateInputOne.getDate();// este sera el dia de la fecha de mi registro
			// i es el dia que se va a escribir en el calendario 
			if (i === Math.abs(dayInputOne)) { // comparo el dia del registro con el que se va a escribir en el calendario				
				dateDays[f] = `<div class="calendar-date calendar-item-day days bg-days">${i}<div class="yes"></div></div>`;
				console.log('Este '+i+' es Igual a Este -> '+dayInputOne+ ' F '+f+ ' DIV ->'+ dateDays[f]);
			}else {
				dateDays[f] = `<div class="calendar-date calendar-item-day days bg-days">${i}<div class="no"></div></div>`;
			}
		}
		f++;
	}

	
	dates.innerHTML += `<tr class="calendar-dates">
							<td>${dateDays[0]}</td>
							<td>${dateDays[1]}</td>
							<td>${dateDays[2]}</td>
							<td>${dateDays[3]}</td>
							<td>${dateDays[4]}</td>
							<td>${dateDays[5]}</td>
							<td>${dateDays[6]}</td>
			        	</tr>
						<tr class="calendar-dates">
							<td>${dateDays[7]}</td>
							<td>${dateDays[8]}</td>
							<td>${dateDays[9]}</td>
							<td>${dateDays[10]}</td>
							<td>${dateDays[11]}</td>
							<td>${dateDays[12]}</td>
							<td>${dateDays[13]}</td>
			        	</tr>
						<tr class="calendar-dates">
							<td>${dateDays[14]}</td>
							<td>${dateDays[15]}</td>
							<td>${dateDays[16]}</td>
							<td>${dateDays[17]}</td>
							<td>${dateDays[18]}</td>
							<td>${dateDays[19]}</td>
							<td>${dateDays[20]}</td>
			        	</tr>
						<tr class="calendar-dates">
							<td>${dateDays[21]}</td>
							<td>${dateDays[22]}</td>
							<td>${dateDays[23]}</td>
							<td>${dateDays[24]}</td>
							<td>${dateDays[25]}</td>
							<td>${dateDays[26]}</td>
							<td>${dateDays[27]}</td>
			        	</tr>
						<tr class="calendar-dates">
							<td>${dateDays[28]}</td>
							<td>${dateDays[29]}</td>
							<td>${dateDays[30]}</td>
							<td>${dateDays[31]}</td>
							<td>${dateDays[32]}</td>
							<td>${dateDays[33]}</td>
							<td>${dateDays[34]}</td>
			        	</tr>`;

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