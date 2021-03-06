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
var noGasto = document.getElementById('no-gastos');


title.textContent = monthNames[monthNumber] + '  ' + currentYear.toString();

let fetchData = {
    method: 'POST',
    body: {},
    headers: new Headers()
}

var p = {
    onload: function() {

        fetch(window.location.pathname, fetchData)

            .then(response => response.json())
            .then(data => writeMonth(data))
            .catch(function(error) {
                console.log(error);
            });


        const writeMonth = (data) => {
            var month = monthNumber;
            for (var i = startDay(); i >= 1; i--) {
                dates.innerHTML += `<li><div class="days bg-days"></div></li>`;
            }

            const listDays = [];
            const listAmount = [];
            var e = 0;

            for (var i = 0; i <= data.length - 1; i++) {
                var regMonth = new Date(data[i].date);
                if (regMonth.getMonth() == month) {
                    listDays[e] = regMonth.getDate();
                    listAmount[e] = data[i].amount;
                    e++;
                }
                
            }

            var contadorNoGastos = 0;

            for (var i = 1; i <= getTotalDays(month); i++) {
                if (i <= currentDay) {
                    
                    if (listDays.includes(i)) {
                        for (let index = 0; index < listDays.length; index++) {
                            const element = listDays[index];
                            if (element == i) {
                                dates.innerHTML += `<li><div class="days bg-days"><div class="yes"></div>${i}<div class="money">${listAmount[index]}</div></div></li>`;
                            }
                            
                        }
                    }else {
                        
                        contadorNoGastos = contadorNoGastos + 1;
                        dates.innerHTML += `<li><div class="days bg-days">${i}<div class="no"></div></div></li>`;
                    }
                }else {

                    dates.innerHTML += `<li><div class="days bg-days">${i}</div></li>`;
                }

            }
            meta.textContent = getTotalDays(monthNumber).toString();
            noGasto.textContent = contadorNoGastos.toString();

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

    }   
}
