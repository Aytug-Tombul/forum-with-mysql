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