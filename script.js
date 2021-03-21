var workDayPlanner = [];

//Loop and create array
for (time = 9; time <= 17; time++) {
  var id = time - 9;
  var dataPlanner = "";
  var dHour = 0;
  var ampm = "";

  if (time === 12) {
    dHour = 12;
    ampm = "pm";
  } else if (time > 12) {
    dHour = time - 12;
    ampm = "pm";
  } else if (time < 12) {
    dHour = time;
    ampm = "am";
  }
  dHour = dHour.toString();

  dataPlanner = {
    id: id,
    dHour: dHour,
    time: time,
    ampm: ampm,
    dataPlanner: dataPlanner,
  };
  workDayPlanner.push(dataPlanner);
}

//current Day Header
function currentDate() {
    var cDate = moment().format("dddd, MMMM Do");
    $("#currentDay").text(cDate);
  }
  //localStorage store data
  function storePlannerData() {
    localStorage.setItem("dayPlanner", JSON.stringify(workDayPlanner));
  }
  // localStorage Data display
  function plannerDataDisplay() {
    workDayPlanner.forEach(function (hour) {
      $("#" + hour.id).val(hour.dataPlanner);
    });
  }
  
  //Load Data
  function dataLoader() {
    var dataLoad = JSON.parse(localStorage.getItem("dayPlanner"));
    if (dataLoad) {
      workDayPlanner = dataLoad;
    }
    storePlannerData();
    plannerDataDisplay();
  }

  workDayPlanner.forEach(function (hour) {
    var tRow = $("<form>");
    tRow.addClass("row");
    $(".container").append(tRow);
  
    var tField = $("<div>");
    tField.addClass("col-md-2 hour");
    tField.text(hour.dHour + hour.ampm);
  
    var hInput = $("<div>");
    hInput.addClass("col-md-9 description p-0");
  
    var hData = $("<textarea>");
    hData.attr("id", hour.id);
  
    //compare times - color codes
    if (hour.time == moment().format("HH")) {
      hData.addClass("present");
    } else if (hour.time < moment().format("HH")) {
      hData.addClass("past");
    } else if (hour.time > moment().format("HH")) {
      hData.addClass("future");
    }
    hInput.append(hData);