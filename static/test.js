var data = {
  Data1: [3, 27, 12, 15, 8, 7, 2, 5, 22, 128, 57, 83, 12, 35, 43, 2, 4, 45, 2, 1, 0, 99, 65, 33],
  Data2: [2, 3, 4, 5, 8],
  Data3: [5, 7, 82, 12, 6, 5]
};

//ーーーー編集1 グローバルとして先に定義ーーーー
var selection;
var profile_data = {};
var profile_table;
//ーーーー編集1終了ーーーー

function fill_profile(){
  //obtain user name from HTML
  var user = document.getElementById('user').value;

  //fetch profile row vector from database
  profile_data = {
    Name: "John Lime",
    Mail: "johnlime@mail.com",
    Password: "password"
  };

  //get keys from profile vector and generate table
  profile_table = "<tr>"
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
    selection = "<form name=\"select\">" + "<select name=\"data\" id=\"selection\">";
  for (var key in data){
    selection += "<option value=\"" + key + "\">" + key + "</option>";
  }
  selection += "</select></form><button type=\"button\" onclick=\"fill_data()\">Go</button>";
  document.getElementById('data_select').innerHTML = selection;
}

//ーーーー編集部2 プロフィール関連ーーーー
//プロフィール変更フォーム
function profile_edit(){
  var form2 = "<form name=\"frm2\">";
  form2 += "<br>Name：<input type=\"text\" name=\"name\">";
  form2 += "<br>Mail：<input type=\"mail\"name=\"mail\">";
  form2 += "<br>Password：<input type=\"text\"name=\"password\">";
  form2 += "<br><button type=\"button\" onclick=\"rename()\">OK</button>";
  document.getElementById('profile_change').innerHTML = form2;
}
//値の変化
function rename(){
  profile_data.Name = document.frm2.name.value;
  profile_data.Mail = document.frm2.mail.value;
  profile_data.Password = document.frm2.password.value;
  profile_table = "<tr>"
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
}
//ーーーー編集2終了ーーーー

function fill_data(){
  //get selected data key
  var key = document.getElementById('selection').value;
  var num = data[key].length

  /*
  Generate graph
  */
  //setting canvas
  var canvas = document.getElementById("graph");
  var ctx = canvas.getContext("2d");
  ctx.font = "11px thin Arial";

  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  //setting margin, empty default positions, and stroke color
  var margin1 = 30;
  var margin2 = 10;
  var x_pos;
  var y_pos;
  ctx.strokeStyle = "black";

  //x and y axis
  ctx.moveTo(margin1, margin2);
  ctx.lineTo(margin1, canvas.height - margin1);
  ctx.lineTo(canvas.width - margin2, canvas.height - margin1);
  ctx.stroke();

  /* x axis */
  //obtain maximum instances of data
  var max_range_x = num;
  var interval_rate_x;

  //calculate interval and new max_range for x axis
  [max_range_x, interval_rate_x] = calculate_interval(max_range_x-1);

  //x axis labels
  for (var i=0; i<=max_range_x; i+=interval_rate_x){
    x_pos = margin1 + margin2 + (canvas.width - margin1 - margin2 * 3) / max_range_x * i;
    ctx.moveTo(x_pos, canvas.height - margin1);
    ctx.lineTo(x_pos, canvas.height - margin1 + margin2);
    ctx.stroke();
    ctx.fillText(i, x_pos, canvas.height - margin1 + margin2 + 20);
  }

  /* y axis */
  //rounded maximum value of data
  var max_range_y = Math.ceil(
    data[key].reduce(
      function (a, b) {
        return Math.max(a, b);
      }
    )
  );
  var interval_rate_y;

  //calculate interval and new max_range for y axis
  [max_range_y, interval_rate_y] = calculate_interval(max_range_y);

  //y axis labels
  for (var i=0; i<=max_range_y; i+=interval_rate_y){
    y_pos = canvas.height - margin1 - margin2 - (canvas.height - margin1 - margin2 * 3) / max_range_y * i
    ctx.moveTo(margin1, y_pos);
    ctx.lineTo(margin1 - margin2, y_pos);
    ctx.stroke();
    ctx.fillText(i, margin1 - margin2 - 20, y_pos);
  }

  //plot data to corresponding positions
  x_pos = margin1 + margin2;
  y_pos = canvas.height - margin1 - margin2 - (canvas.height - margin1 - margin2 * 3) / max_range_y * data[key][0];
  ctx.moveTo(x_pos, y_pos);
  for (var i=1; i<num; i++){
    x_pos = margin1 + margin2 + (canvas.width - margin1 - margin2 * 3) / max_range_x * i;
    y_pos = canvas.height - margin1 - margin2 - (canvas.height - margin1 - margin2 * 3) / max_range_y * data[key][i];
    ctx.lineTo(x_pos, y_pos);
  }
  ctx.stroke();

  /*
  Generate table
  */
  var data_table = "<tr>";
  for (var i=0; i<num; i++){
    data_table += "<td>" + data[key][i] + "</td>";
  }
  data_table += "</tr>"

  //change innerHTML
  document.getElementById('data').innerHTML = data_table;
}

function calculate_interval(_max){
  var _interval = 1;
  while (_max / _interval > 10){
    if (_interval == 1){
      _interval = 5;
    }
    else if (_interval == 5){
      _interval = 10;
    }
    else{
      _interval += 10;
    }
  }
  return [Math.ceil(_max / _interval) * _interval, _interval];
}
