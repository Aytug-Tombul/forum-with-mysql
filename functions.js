$(document).on("click", "#loginBtn", function() {
    $("#forum").empty();
    let div= loginDiv();    
    $("#forum").append(div);
  });


$(document).on("click", "#registerBtn", function() {
    $("#forum").empty();
    let div= registerDiv();    
    $("#forum").append(div);
  });

function forgot() {
  $("#forum").empty();
    let div= forgotDiv();    
    $("#forum").append(div);
}
function backHome() {
  $("#forum").empty();
    let div= homeDiv();    
    $("#forum").append(div);
}
function goHealth() {
  $("#forum").empty();
    let div3= healthDiv();    
    $("#forum").append(div3);
}

$(document).on("click", "#login", function() {
  var loginUserName = $("#username").val();
  var loginUserPw = $("#password").val();
  $.ajax({
    url: "functions.php",
    type: "POST",
    dataType: "text",
    data: { functionName:"login" , username: loginUserName, password: loginUserPw },
    success: function(res) {
      res = JSON.parse(res);
      if (res.result == "success") {
        window.alert("Login Success Welcome " + res.username);
        loggedUsername = res.username;
        $("#loginStatus").remove();
        $("body").append(blogDiv);
        listPosts();
        var panel = res.panelBtn;
        if (res.panelBtn != null) {
          $("#addHere").append(String(panel));
        }
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
  fd.append("username", usernameVal);
  fd.append("password", passwordVal);
  fd.append("email", emailVal);
  fd.append("referrer", referrerVal);
  fd.append("image", images);
  $.ajax({
    url: "register.php",
    type: "POST",
    dataType: "text",
    data: fd,
    processData: false,
    contentType: false,
    success: function(data) {
      window.alert(data);
      $("#RegisterStatus").remove();
      $("body").append(loginDiv);
    }
  });
});
