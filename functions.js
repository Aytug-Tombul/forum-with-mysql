var loggedUsername = "";
var categoryName = "";
var titleNow = "";
backHome();
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
  var deckNumber=0;
  $.ajax({
    url: "functions.php",
    type: "POST",
    dataType: "text",
    data: { functionName: "home" },
    success: function(res) {
      res = JSON.parse(res);
      $("#forum").empty();
      for (let i = 0; i < res.length; i++) {
        cateDiv =
          `<div class="card text-center" style="width: 18rem; padding-right:0px;">
        <div class="card-header bg-dark text-light">
          <h5 class="card-category">` +
          res[i].name +
          `</h5>
        </div>
        <div class="card-body">
          <h5 class="card-title">` +
          res[i].description +
          `</h5>
          <a href="#" class="btn btn-dark" onclick="goCategory()"
            >Go Category</a
          >`;
          if (i%2==0) {
            deckNumber=i;
            $("#forum").append(`<div class="card-deck" id="deckNum`+deckNumber+`">
            </div>`)
            $("#deckNum"+deckNumber).append(cateDiv);
          }else{
            $("#deckNum"+deckNumber).append(cateDiv);
          }
          
      }
      
      titleNow = "";
    }
  });
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
        if (res.panelBtn == "4443") {
          $("#addHere").append(` <button
          class="btn btn-sm btn-outline-secondary"
          type="button"
          id="panelBtn"
        >
          Panel
        </button>`);
        }
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
  if (titleNow == "") {
    var titleName = $("h4", this).text();
    titleNow = titleName;
  } else {
    titleName = titleNow;
  }
  $.ajax({
    url: "functions.php",
    type: "POST",
    dataType: "text",
    data: { functionName: "getPost", title: titleName },
    success: function(res) {
      res = JSON.parse(res);
      console.log(res);

      $("#forum").empty();
      $("#forum").append(postDiv);
      $("#title").append(titleName);
      for (let i = 0; i < res.length; i++) {
        if (i==0) {
          postIt("post",res[i].post, res[i].date, res[i].id, res[i].username);
        }
        else{
          postIt("reply",res[i].reply, res[i].date, res[i].id, res[i].username);
          //console.log(res[i].reply);
        }
        
      }
      $("#forum").append(`
      <div class="form-group green-border-focus" style="padding-top: 20px;">
      <textarea class="form-control" id="post" rows="5" placeholder="Write Something Here..."></textarea>
      <button type="button" class="btn btn-primary btn-lg" id="sendReply">POST</button>
      </div>`);
    }
  });
});

function postIt(type,pack, date = null, id, username) {
  if (type=="post") {
    var postDiv =
    `<div class="card" id="listedPost">
  <div class="card-body">
    <h4 class="card-text">` +
    pack +
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
  $("#posts").append(postDiv)
  $("#forum").append(`<div id="replies" style="padding-top: 20px;">
  </div>`);
  }
  else{
    var replyDiv =
    `<div class="card w-30 h-30" id="listedReply">
  <div class="card-body">
    <h4 class="card-text">` +
    pack +
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
  $("#replies").append(replyDiv);
  }
}


$(document).on("click", "#sendReply", function() {
  if (loggedUsername == "") {
    window.alert("Please login or register");
  } else {
    var reply = $("#post").val();
    $.ajax({
      url: "functions.php",
      type: "POST",
      data: {
        functionName: "sendReply",
        reply: reply,
        username: loggedUsername,
        title: titleNow
      },
      success: function(res) {
        $("Reply Sended")
        $("#post").val("");
      }
    });
  }
});

function listReplies(reply, date = null, username, id = null) {
  var replyDiv =
    `<div class="card w-30 h-50" id="reply">
  <div class="card-body">
    <h4 class="card-text">` +
    reply +
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
  $("#titles").append(replyDiv);
}


$(document).on("click", "#panelBtn", function() {
  $("#forum").empty();
  var div = panelDiv();
  $("#forum").append(div);
});

$(document).on("click", "#addCategory", function() {
  $("#categoryForm").remove();
  addDiv = `<div id="categoryForm" style="padding-bottom: 10px;">
  <form>
      <div class="form-group col-md-3">
          <label>Category Name</label>
          <input type="text" class="form-control" id="categoryName" placeholder="Category" />
    </div>
    <div class="form-group col-md-3">
      <label>Description</label>
      <input
        type="text"
        class="form-control"
        id="description"
      />
    </div>
    <div class="form-group col-md-3">
      <button type="button" class="btn btn-primary" id="sendCategory">
        ADD
      </button>
    </div>
  </form>
</div>`;
  $("#forum").append(addDiv);
});

$(document).on("click", "#sendCategory", function() {
  var catName = $("#categoryName").val();
  var description = $("#description").val();
  $.ajax({
    url: "functions.php",
    type: "POST",
    data: {
      functionName: "addCategory",
      categoryName: catName,
      description: description
    },
    success: function() {
      window.alert("Category created.")
      $("#categoryForm").remove();
    }
  });
});

$(document).on("click", "#panelBtn", function() {
  $("#forum").empty();
  var div = panelDiv();
  $("#forum").append(div);
});
