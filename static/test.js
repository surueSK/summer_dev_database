var data = {
  Data1: [3, 27, 12, 15, 8],
  Data2: [23, 33, 4, 5, 8],
  Data3: [5, 7, 82, 12, 6]
};

// function selectCheck()
// {
//   var data = document.select.data.value;
//   alert(data);
// }

function fill_profile(){
  //obtain user name from HTML
  var user = document.getElementById('user').value;

  //fetch profile row vector from database
  var profile_data = {
    Name: "John Lime",
    Mail: "johnlime@mail.com",
    Password: "password"
  };

  //get keys from profile vector and generate table
  var profile_table = "<tr>"
  for (var key in profile_data){
    profile_table += "<td>" + key + "</td>";
  }
  profile_table += "</tr>"

  //get data from profile vector and generate table
  profile_table += "<tr>"
  for (var key in profile_data){
    profile_table += "<td>" + profile_data[key] + "</td>";
  }
  profile_table += "</tr>"

  //generate table
  document.getElementById('profile').innerHTML = profile_table;

  //get all possible keys for selected user
  data;

  //generate form/select and button
  var selection = "<form name=\"select\">" + "<select name=\"data\" id=\"selection\">";
  for (var key in data){
    selection += "<option value=\"" + key + "\">" + key + "</option>";
  }
  selection += "</select></form><button type=\"button\" onclick=\"fill_data()\">Go</button>";
  document.getElementById('data_select').innerHTML = selection;
}

function fill_data(){
  //get selected data key
  var key = document.getElementById('selection').value;
  var num = data[key].length

  //generate graph
  //setting canvas
  var canvas = document.getElementById("graph");
  var ctx = canvas.getContext("2d");
  //setting margin and empty default positions
  var margin1 = 30;
  var margin2 = 10;
  var x_pos;
  var y_pos;
  //x and y axis
  ctx.moveTo(margin1, margin2);
  ctx.lineTo(margin1, canvas.height - margin1);
  ctx.lineTo(canvas.width - margin2, canvas.height - margin1);
  //x axis labels
  for (var i=0; i<num; i++){
    x_pos = margin1 + margin2 + (canvas.width - margin1 - margin2 * 3) / (num-1) * i
    ctx.moveTo(x_pos, canvas.height - margin1);
    ctx.lineTo(x_pos, canvas.height - margin1 + margin2);
  }
  //rounded maximum value of data
  var max_range = Math.ceil(
    data[key].reduce(
      function (a, b) {
        return Math.max(a, b);
      }
    )
  );
  //y axis labels
  for (var i=0; i<=max_range; i++){
    y_pos = canvas.height - margin1 - margin2 - (canvas.height - margin1 - margin2 * 3) / max_range * i
    ctx.moveTo(margin1, y_pos);
    ctx.lineTo(margin1 - margin2, y_pos);
  }
  //plot data to corresponding positions
  x_pos = margin1 + margin2;
  y_pos = canvas.height - margin1 - margin2 - (canvas.height - margin1 - margin2 * 3) / max_range * data[key][0];
  ctx.moveTo(x_pos, y_pos);
  for (var i=1; i<num; i++){
    x_pos = margin1 + margin2 + (canvas.width - margin1 - margin2 * 3) / (num-1) * i;
    y_pos = canvas.height - margin1 - margin2 - (canvas.height - margin1 - margin2 * 3) / max_range * data[key][i];
    ctx.lineTo(x_pos, y_pos);
  }
  ctx.stroke();

  //generate table
  var data_table = "<tr>";
  for (var i=0; i<num; i++){
    data_table += "<td>" + data[key][i] + "</td>";
  }
  data_table += "</tr>"

  //change innerHTML
  document.getElementById('data').innerHTML = data_table;
}
