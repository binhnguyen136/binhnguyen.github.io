function refresh(){
  var inputs = document.getElementsByClassName("input-text");
  for (var i=0; i<inputs.length; i++){
    inputs[i].value = "";
  }
}
function ajaxSubmit(){
  if (validate()){
    var http = new XMLHttpRequest();
    var url = "post_data.php";
    var data = new FormData();
    var inputs = document.getElementsByClassName("input-text");
    for (var i=0; i<inputs.length; i++){
      data.append(inputs[i].name, inputs[i].value);
      console.log(inputs[i].name + " " + inputs[i].value);
    }
    http.open('POST', url, true);
    http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
          alert("success");
      }
    }
    http.send(data);
  }
}

function validate(){
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var email = document.getElementById("email").value;
  var birthday = document.getElementById("birthday").value;

  if(checkUsername(username) && 
     checkPassword(password) && 
     checkEmail(email) &&
     checkBirthday(birthday)) {
      return true;
  }
  return false;
}

function checkUsername (username){
  if (username === "" || username.length<6){
    document.getElementById("user_error").innerHTML = "fill 6 charaters min username";
    return false;
  }
  document.getElementById("user_error").innerHTML = "";
  return true;
}

function checkEmail (email){
  if (email === "" || email.length<6){
    document.getElementById("email_error").innerHTML = "fill 6 charaters min email";
    return false;
  }
  if (!/^\w+@\w+[.]\w{3}$/.test(email)){
    document.getElementById("email_error").innerHTML = "invalid email, enter again";
    return false;
  }
  document.getElementById("email_error").innerHTML = "";
  return true;  
}

function checkPassword (password){
  if (password === "" || password.length<6){
    document.getElementById("password_error").innerHTML = "fill 6 charaters min password";
    return false;
  }
  document.getElementById("password_error").innerHTML = "";
  return true;
}

function checkBirthday (birthday){
  if (birthday === "" || !/^[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{4}$/.test(birthday)){
    document.getElementById("birthday_error").innerHTML = "choose your birthday";
    return false;
  }
  document.getElementById("birthday_error").innerHTML = "";
  return true;
}