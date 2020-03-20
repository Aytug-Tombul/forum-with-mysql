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