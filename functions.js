var loggedUsername = "";

$(document).on("click", "#loginBtn", function() {
  $("#forum").empty();
  let div = loginDiv();
  $("#forum").append(div);
});

$(document).on("click", "#registerBtn", function() {
  $("#forum").empty();
  let div = registerDiv();
  $("#forum").append(div);
});

function forgot() {
  $("#forum").empty();
  let div = forgotDiv();
  $("#forum").append(div);
}
function backHome() {
  $("#forum").empty();
  let div = homeDiv();
  $("#forum").append(div);
}
function goCategory() {
  $(".card").on({
    click: function() {
      category = $(".card-category",this).text();
      $.ajax({
        url: "functions.php",
        type: "POST",
        dataType: "text",
        data: { functionName: "goCategory", categoryName :category},
        success: function(response) {
          console.log(response);
        }
      });
    }   
    
 })

}    


$(document).on("click", "#login", function() {
  var loginUserName = $("#username").val();
  var loginUserPw = $("#password").val();
  $.ajax({
    url: "functions.php",
    type: "POST",
    dataType: "text",
    data: {
      functionName: "login",
      username: loginUserName,
      password: loginUserPw
    },
    success: function(res) {
      res = JSON.parse(res);
      if (res.result == "success") {
        window.alert("Login Success Welcome " + res.username);
        loggedUsername = res.username;
        $("#addHere").append(
          `<span class="navbar-text text-light" style="padding-right:10px;"> Welcome ` +
            loggedUsername +
            `</span>`
        );
        $("#loginBtn").remove();
        $("#registerBtn").remove();
        $("#addHere").append(
          '<button class="btn btn-sm btn-outline-secondary" type="button" id="logoutBtn">Logout</button>'
        );
        backHome();
      } else {
        window.alert("Login failed Please Check your username and password");
      }
    }
  });
});

$(document).on("click", "#signup", function() {
  var images = $("#image")[0].files[0];
  var usernameVal = $("#username").val();
  var passwordVal = $("#password").val();
  var emailVal = $("#email").val();
  var referrerVal = $("#referrer").val();

  var fd = new FormData();
  fd.append("functionName", "register");
  fd.append("username", usernameVal);
  fd.append("password", passwordVal);
  fd.append("email", emailVal);
  fd.append("referrer", referrerVal);
  fd.append("image", images);
  $.ajax({
    url: "functions.php",
    type: "POST",
    dataType: "text",
    data: fd,
    processData: false,
    contentType: false,
    success: function(data) {
      window.alert(data);
      backHome();
    }
  });
});

$(document).on("click", "#logoutBtn", function() {
  loggedUsername = "";
  $("#addHere").empty();
  $("#addHere").append(
    '<button class="btn btn-sm btn-outline-secondary" type="button" id="loginBtn">Login</button>' +
      '<button class="btn btn-sm btn-outline-secondary" type="button" id="registerBtn">Register</button>'
  );
  $("#forum").empty();
  let div = loginDiv();
  $("#forum").append(div);
});

$(document).on("click", "#forgotBtn", function() {
  var forgotEmail = $("#forgotEmail").val();
  $.ajax({
    url: "functions.php",
    type: "POST",
    dataType: "text",
    data: { functionName: "forgot", email: forgotEmail },
    success: function(response) {
      window.alert(response);
    }
  });
});
