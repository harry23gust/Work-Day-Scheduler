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