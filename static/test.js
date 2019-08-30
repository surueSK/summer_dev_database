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

  //generate table
  var data_table = "<tr>";
  for (var i=0; i<data[key].length; i++){
    data_table += "<td>" + data[key][i] + "</td>";
  }
  data_table += "</tr>"

  //change innerHTML
  document.getElementById('data').innerHTML = data_table;
}
