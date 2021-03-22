var workDayPlanner = [];


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


function currentDate() {
    var cDate = moment().format("dddd, MMMM Do");
    $("#currentDay").text(cDate);
  }
  
  function storePlannerData() {
    localStorage.setItem("dayPlanner", JSON.stringify(workDayPlanner));
  }
  
  function plannerDataDisplay() {
    workDayPlanner.forEach(function (hour) {
      $("#" + hour.id).val(hour.dataPlanner);
    });
  }
  
  
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
  
    
    if (hour.time == moment().format("HH")) {
      hData.addClass("present");
    } else if (hour.time < moment().format("HH")) {
      hData.addClass("past");
    } else if (hour.time > moment().format("HH")) {
      hData.addClass("future");
    }
    hInput.append(hData);

    
  var saveIcon = $("<i class='far fa-save fa-lg'></i>");
  var saveEnd = $("<button>").addClass("col-md-1 saveBtn");

  
  saveEnd.append(saveIcon);
  tRow.append(tField, hInput, saveEnd);
});


$(".saveBtn").on("click", function (event) {
  event.preventDefault();
  
  var saveIndex = $(this).siblings(".description").children().attr("id");
  workDayPlanner[saveIndex].dataPlanner = $(this)
    .siblings(".description")
    .children()
    .val();

  storePlannerData();
  plannerDataDisplay();
});


currentDate();

dataLoader();