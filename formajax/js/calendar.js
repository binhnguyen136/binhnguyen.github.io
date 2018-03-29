
var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
var numberDayOfMonth = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31");
var day = new Array("Sun", "Mon", "Tue", "Web", "Thu", "Fri", "Sat");

var dateNow = new Date();
var dateCheck = new Date().getDate();
var monthCheck = new Date().getMonth();
var yearCheck = new Date().getFullYear();
var positionDayOne = 0;
var results = "";

function render() {
	document.write("<DIV ID='calendar' CLASS='hide'>")
	document.write("<FORM>");
	document.write("<TABLE ID='table' STYLE='text-align: center;'>");
	renderCalendar();
	document.write("</TABLE>");
	document.write("</FORM>");
    document.write("</DIV>");
}

function renderCalendar() {
    renderToolBar();
	renderDayHead();
    renderDayBox();
    renderDate();
    setMonths();
    setYears();
}

function renderToolBar() {
    document.write("<TR ID='rowAction'>");
    document.write("<TD CLASS='btn' onClick='btnPreviousYearClick();'><a TYPE='a' NAME='btnPreviousYear'>&#8647;</a></TD>");
    document.write("<TD CLASS='btn' onClick='btnPreviousMonthClick();'><a TYPE='a' NAME='btnPreviousMonth'>&larr;</a></TD>");
    document.write("<TD CLASS='btn' colspan='2'><SELECT ID='months' onChange='changeMonth();'>");
    for (var i = 0; i < months.length; i++) {
        document.write("<OPTION VALUE='" + i + "'>" + months[i] + "</OPTION>");
    };
    document.write("</SELECT></TD>")
    document.write("<TD CLASS='btn' colspan='1'><SELECT ID='years' onChange='changeYear();'>");
    for (var i = 1900; i <= 2025; i++) {
        document.write("<OPTION VALUE='" + i + "'>" + i + "</OPTION>");
    };
    document.write("</SELECT></TD>")
    document.write("<TD CLASS='btn' onClick='btnNextMonthClick();'><a TYPE='a' NAME='btnNextMonth'>&rarr;</a></TD>");
    document.write("<TD CLASS='btn' onClick='btnNextYearClick();'><a TYPE='a' NAME='btnNextYear' >&#8649;</a></TD>");
    document.write("</TR>");
}

function renderDayHead() {
    document.write("<TR ID='title'>");
    for (var i = 0; i < day.length; i++) {
        document.write("<TD>" + day[i] + "</TD>");
    };
    document.write("</TR>");    
}

function renderDayBox() {
    var count = 1;
    for (var i = 0; i < 6; i++) {
        document.write("<TR onclick='toggleCalendar();'>");
        for (var j = 0; j < 7; j++) {
            document.write("<TD ID='item" + count + "' CLASS='item' onClick='checkDay(" + count + ");'></TD>");		
            count++;		
        };
        document.write("</TR>");
    };
}

function renderDate() {
    var dateNow = new Date().getDate(),
    month_now = new Date().getMonth(),
    yearNow = new Date().getFullYear(),
    day = new Date(yearCheck, monthCheck, 1).getDay();
    positionDayOne = parseInt(day);

    var previous_month = monthCheck - 1,
        next_month = monthCheck + 1;

    numberDayOfMonth[1] = (((yearCheck % 4 == 0) && (yearCheck % 100 != 0)) || (yearCheck % 400 == 0)) ? 29 : 28;

    if (previous_month < 0) previous_month = 11;
    if (next_month == 12) next_month = 0;

    var numberDay = numberDayOfMonth[monthCheck],
        numberDayOfPreviousMonth = numberDayOfMonth[previous_month],
        numberDayOfNextMonth = numberDayOfMonth[next_month];

    var position = 1; // position var reference the day of month (1-30 for ex)
    var positionStart = day;
    var positionStop = (parseInt(numberDay) + parseInt(day));

    for (var i = 0; i < 42 - day; i++) {	
        if (position <= numberDay) {
            // 2 lines below render day of current month
            // position + day because we skiped day amount of day
            document.getElementById("item" + (position + day)).innerHTML = position;
            document.getElementById("item" + (position + day)).classList.add("current-month");

            if (dateNow == position && month_now == monthCheck && yearNow == yearCheck) {
                // render the date today
                document.getElementById("item" + (position + day)).classList.add("current-day");
            }
            position++;
        }
    }

    // render days of the previous month
    for (var i = positionStart; i > 0; i--) {
        document.getElementById("item" + (i)).innerHTML = numberDayOfPreviousMonth--;
        document.getElementById("item" + (i)).classList.add("last-month");
    }

    // render days of the next month
    for (var i = positionStop+1; i <= 42; i++){
        document.getElementById("item" + i).innerHTML = i - positionStop;
        document.getElementById("item" + i).classList.add("next-month");
    }
}

function checkDay(position) {
    var previous_month = monthCheck;
    var month_now = monthCheck + 1;
    var next_month = monthCheck + 2
    var year = yearCheck;
    var day = document.getElementById("item" + position).innerHTML;

    if (previous_month == 0) previous_month = 12;
    if (next_month == 13) next_month = 1;

    if (parseInt(day) > position) {
        if (previous_month == 12) year--;
        var results = day + "/" + previous_month + "/" + year;

    } else if (parseInt(day) < (position - positionDayOne)) {
        if (next_month == 1) year++;
        var results = day + "/" + next_month + "/" + year;

    } else {
        var results = day + "/" + month_now + "/" + year;
    }

    document.getElementById("birthday").value = results;
}

function refresh() {
    for (var i = 1; i <= 42; i++) {
        document.getElementById("item" + i).innerHTML = "";
        document.getElementById("item" + i).classList.remove("current-day");
        document.getElementById("item" + i).classList.remove("current-month");
        document.getElementById("item" + i).classList.remove("last-month");
        document.getElementById("item" + i).classList.remove("next-month");
    }
}

function changeMonth() {
    refresh();
    monthCheck = document.getElementById("months").value;
    renderCalendar();
}

function changeYear() {
    refresh();
    yearCheck = document.getElementById("years").value;
    renderCalendar();
}

function setMonths() {
    document.getElementById("months").value = monthCheck;
}

function setYears() {
    document.getElementById("years").value = yearCheck;
}

function setItem(item, value) {
    document.getElementById(item).innerHTML = value;
}

function btnPreviousMonthClick() {
    refresh();
    monthCheck = monthCheck - 1;
    if (monthCheck < 0) {
        monthCheck = 11;
        yearCheck = yearCheck - 1;
    }
    renderDate();
    setMonths();
    setYears();
}

function btnNextMonthClick() {
    refresh();
    monthCheck = monthCheck + 1;
    if (monthCheck > 11) {
        monthCheck = 0;
        yearCheck = yearCheck + 1;
    }
    renderDate();
    setMonths();
    setYears();
}

function btnPreviousYearClick() {
    refresh();
    yearCheck = yearCheck - 1;
    console.log(monthCheck);
    renderDate();
    setMonths();
    setYears();
}

function btnNextYearClick() {
    refresh();
    yearCheck = yearCheck + 1;
    console.log(monthCheck);
    renderDate();
    setMonths();
    setYears();
}

function toggleCalendar(){
    document.getElementById("calendar").classList.toggle("hide");
}
