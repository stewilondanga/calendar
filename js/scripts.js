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
