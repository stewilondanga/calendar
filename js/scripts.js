var months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var colors = ["#16a085", "#1abc9c", "#c0392b", "#27ae60", "#FF6860", "#f39c12", "#f1c40f", "#e67e22", "#2ecc71", "#e74c3c", "#d35400", "#2c3e50"];

function Calendar(elemId) {
    this.elmDomObj = document.getElementById(elemId);
    this.drawCalendar();
    this.initCalendar();
    delete this.elmDomObj;
}
Calendar.prototype = {
    constructor: Calendar,
    drawCalendar: function () {
        var content = `<div id="calendar_left">
                            <div class="c_day"></div>
                            <div class="c_date"></div>
                            <div class="c_pages"></div>
                        </div>
                        <div id="calendar_right">
                            <div id="calendar_header">
														<i class="icon-chevron-left"></i>
	<h1></h1>
	<i class="icon-chevron-right"></i>
</div>
<div id="calendar_weekdays"></div>
<div id="calendar_content"></div>
</div>`;
this.elmDomObj.innerHTML = content;
this.calLeft = document.getElementById("calendar_left");
this.header = document.getElementById("calendar_header");
this.weekdays = document.getElementById("calendar_weekdays");
this.content = document.getElementById("calendar_content");

},
initCalendar: function () {
var _that = this;
this.today = new Date;
this.currYear = this.today.getFullYear();
this.currMonth = this.today.getMonth();
this.currDay = this.today.getDay();
this.currDate = this.today.getDate();
		 this.currMonthDates = [];
		 this.prevCellsCount = 0;
		 //height width
		 this.hw = 480 / 7;
		 window.addEventListener("keydown", function (e) { return _that._navigateKeys(e); });
		 let icons = document.querySelectorAll("div#calendar_header i[class^='icon-chevron'");
		 icons.forEach(function (e) {
				 e.addEventListener("click", function (e) { return _that._navigate(e); });

	});
	this._generate();

},
_generate: function () {
	this._createDays();
	this._createMonth();
	this._createPrevMonthCells();
	this._createCurrMonthCells();
	this._highlightToday();
	let lDates = document.querySelectorAll("div#calendar_content div:not(.blank)");
	lDates.forEach(function (e) {
			e.addEventListener("click", function (e) { return _that._selectDate(e); });
	});
},
_createDays: function () {
	if (this.weekdays == null) return;
	this.weekdays.innerHTML = null;
	for (var e = 0; e < 7; e++) {
		this.weekdays.innerHTML += `<div style="width: ${this.hw}px; height: ${this.hw}px; line-height: ${this.hw}px;">${days[e].substring(0, 3)}</div>`;
}
},
_createMonth: function () {
this.currMonthDates = [];
for (var r = 1; r < this._getDate(this.currYear, this.currMonth) + 1; r++) {
		this.currMonthDates.push({ day: r, weekday: days[this._getDay(this.currYear, this.currMonth, r)] })
}
},
_getDate: function (year, month) {
return (new Date(year, month, 0)).getDate()
},
 _getDay: function (year, month, n) {
		 return (new Date(year, month, n)).getDay()
 },
 _createPrevMonthCells: function () {
		 if (this.content == null) return;
		 this.content.innerHTML = null;
		 let u = false;
		 this.prevCellsCount = 0;
		 while (!u) {
			 if (days[this.prevCellsCount] == this.currMonthDates[0].weekday) {
							u = true
					} else {
							this.content.innerHTML += `<div class="blank" style="width: ${this.hw}px; height: ${this.hw}px; line-height: ${this.hw}px;"></div>`;
							this.prevCellsCount++
					}
			}
	},
	_createCurrMonthCells: function () {
			if (this.content == null) return;
			for (var c = 0; c < 42 - this.prevCellsCount; c++) {
            if (c >= this.currMonthDates.length) {
                this.content.innerHTML += `<div class="blank" style="width: ${this.hw}px; height: ${this.hw}px; line-height: ${this.hw}px;"></div>`;
            } else {
                var v = this.currMonthDates[c].day;
                var m = this._verifyIfToday(new Date(this.currYear, this.currMonth, v)) ? `<div class="today" style="width: ${this.hw}px; height: ${this.hw}px; line-height: ${this.hw}px;">` : `<div style="width: ${this.hw}px; height: ${this.hw}px; line-height: ${this.hw}px;">`;
                this.content.innerHTML +=` ${m}${v} </div>`;
            }
        }
    },
		_verifyIfToday: function (e) {
			 return this._getFormattedDate(new Date) == this._getFormattedDate(e)
	 },
	 _getFormattedDate: function (e) {
			 return e.getFullYear() + "/" + (e.getMonth()) + "/" + e.getDate()
	 },
	 _highlightToday: function () {
			 var _that = this
			 var y = colors[this.currMonth];
			 this.header.style.height = `${this.hw}px`;
			 this.header.style.backgroundColor = y;
			 let h1s = document.querySelectorAll("div#calendar_header h1");
			 h1s.forEach(function (e) {
					 e.style.backgroundColor = y;
					 e.innerHTML = months[_that.currMonth] + " " + _that.currYear;
			 });
			 let wDays = document.querySelectorAll("div#calendar_weekdays div");
			 let today = document.querySelectorAll("div#calendar_content .today");
			 wDays.forEach(function (e) {
					 e.style.color = y;
			 });
			 today.forEach(function (e) {
					 e.style.backgroundColor = y;
			 });
			 let icons = document.querySelectorAll("div#calendar_header i[class^='icon-chevron'");
			 icons.forEach(function (e) {
					 e.style.lineHeight = `${_that.hw}px`;
			 });
			this._highlightDate();
	 },
	 _navigate: function (e) {
			 e.stopPropagation();
			 if (e.target.getAttribute("class").indexOf("left") != -1) {
					 return this._navigateMonths("previous");
			 } else {
					 return this._navigateMonths("next");
			 }
	 },
		_navigateKeys: function (e) {
		 if (e.keyCode == '37') {
			// left arrow
			 return this._navigateMonths("previous");
	 }
	 else if (e.keyCode == '39') {
			// right arrow
			 return this._navigateMonths("next");
	 }},
	 _navigateMonths: function (e) {
			 this.currMonth = e == "next" ? this.currMonth + 1 : this.currMonth - 1;
			 if (this.currMonth < 0) {
					 this.currMonth = 11;
					 this.currYear--;
			 } else if (this.currMonth > 11) {
					 this.currMonth = 0;
					 this.currYear++;
			 }
			 this._generate();
			 return;
	 },
	 _selectDate: function (e) {
			 e.stopPropagation();
			 var y = colors[_that.currMonth];
			 this.currDate = e.target.innerText;
			 this.currDay = this.currDate;
			 this._highlightDate();
			 let ldays = document.querySelectorAll("div#calendar_content div:not(.blank)");

				ldays.forEach(function (f){
					 f.style.backgroundColor = '#ffffff';
					 f.style.color= '#787878';
					 f.style.opacity= '1';
				});
				 e.target.style.backgroundColor = y;
				 e.target.style.opacity = '0.7';
				 e.target.style.color = '#FFFFFF';
	 },
	 _highlightDate: function(){
			 _that = this;
			 var y = colors[_that.currMonth];
				let ldays = document.querySelectorAll("div#calendar_left .c_day");
			 ldays.forEach(function (e){
					 e.innerHTML = _that.currMonthDates[_that.currDay-1].weekday;
					 e.style.backgroundColor = y;
					 e.style.height = `${_that.hw}px`;
					 e.style.lineHeight = `${_that.hw}px`;
			 });
			 let dates = document.querySelectorAll("div#calendar_left .c_date");
			 dates.forEach(function (e){
					 e.innerHTML = _that.currDate;
			 });
	 }
}

var navigate = (function() {
	$('.dd').toggle();
	$('.dd_btn').click(function() {
		var dataName = $(this).attr('data-name');
		$('.dd').hide();
		$('.' + dataName).toggle();
	});
})();
