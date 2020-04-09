var loggedUsername = "";
var categoryName = "";
var titleNow=""

var postDiv = `<div id="posts" style="padding-top: 20px;">
<h2 id="title"></h2>
</div>`;

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
  titleNow="";
  $("#forum").append(div);
}
function goCategory() {
  $(".card").on({
    click: function() {
      category = $(".card-category", this).text();
      categoryName = category;
      $.ajax({
        url: "functions.php",
        type: "POST",
        dataType: "text",
        data: { functionName: "goCategory", categoryName: category },
        success: function() {
          $("#forum").empty();
          $("#forum").append("<h1>" + category + "</h1>");
          var div = categoryDiv();
          $("#forum").append(div);
          listTitles();
        }
      });
    }
  });
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

$(document).on("click", "#newTitle", function() {
  if (loggedUsername == "") {
    window.alert("You are not Signed in pls login");
  } else {
    $("#forum").empty();
    var buildTitle = newTitle();
    $("#forum").append(buildTitle);
  }
});

$(document).on("click", "#postTitle", function() {
  var title = $("#title").val();
  var post = $("#post").val();
  $.ajax({
    url: "functions.php",
    type: "POST",
    dataType: "text",
    data: {
      functionName: "newTitle",
      username: loggedUsername,
      title: title,
      post: post,
      categoryName: categoryName
    },
    success: function(response) {
      backHome();
    }
  });
});

function postTitle(title, date = null, username, id = null) {
  var titleDiv =
    `<div class="card w-75 p-1" id="listedTitle">
  <div class="card-body">
    <h4 class="card-text">` +
    title +
    `</h4>
    <p class="card-text text-right"><small class="text-muted">` +
    "#" +
    id +
    "  " +
    username +
    " " +
    date +
    `</small></p>
  </div>
</div>`;
  $("#titles").append(titleDiv);
}

function listTitles() {
  $.ajax({
    url: "functions.php",
    type: "POST",
    dataType: "text",
    data: { functionName: "getTitles", category: categoryName },
    success: function(data) {
      if (data == false) {
        window.alert("No Titles Here Lets Create One");
      } else {
        data = JSON.parse(data);
        $("#titles").empty();
        for (let i = 0; i < data.length; i++) {
          postTitle(data[i].title, data[i].date, data[i].username, data[i].id);
        }
      
      }
    }
  });
}

$(document).on("click", "#listedTitle", function() {
  if (titleNow=="") {
    var titleName = $("h4", this).text();
    titleNow=titleName;
  }else{
    titleName=titleNow;
  }
  $.ajax({
    url: "functions.php",
    type: "POST",
    dataType: "text",
    data: { functionName: "getPosts", title: titleName },
    success: function(res) {
      res = JSON.parse(res);
      console.log(res);
      $("#forum").empty();
      $("#forum").append(postDiv);
      $("#title").append(titleName);
      for (let i = 0; i < res.length; i++) {
        console.log(res[i].post);
        postIt(res[i].post, res[i].date, res[i].id, res[i].username);
      }
      $("#forum").append(`<div class="form-group green-border-focus" style="padding-top: 20px;">
      <textarea class="form-control" id="post" rows="5" placeholder="Write Something Here..."></textarea>
      <button type="button" class="btn btn-primary btn-lg" id="sendPost">POST</button>
      </div>`);
    }
  });
});

function postIt(post, date=null, id, username) {
  var postDiv =
    `<div class="card" id="listedPost">
  <div class="card-body">
    <h4 class="card-text">` +
    post +
    `</h4>
    <p class="card-text text-right"><small class="text-muted">` +
    "#" +
    id +
    "  " +
    username +
    " " +
    date +
    `</small></p>
  </div>
</div>`;
  $("#posts").append(postDiv);
}

$(document).on("click", "#sendPost", function() {
  if (loggedUsername =="") {
    window.alert("Please login or register");
  }else{
    var post = $("#post").val();
    $.ajax({
      url: "functions.php",
      type: "POST",
      data: { functionName:"sendPost",post: post, username: loggedUsername ,title: titleNow},
      success: function() {
        $("#posts").empty();
        $("#listedTitle").trigger("click");
        $("#post").val("");
      }
    });
  }
  
});