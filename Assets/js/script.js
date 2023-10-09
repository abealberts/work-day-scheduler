// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.



$(function () {

  var now = dayjs().hour();
  
  //Tick gets called every second - Updates clock & color-coding
  function tick() {

    var currentDay = dayjs().format('dddd, MMMM D');
    var currentTime = dayjs().format('h:mm:ss A');

    $("#currentDay").html(currentDay);
    $("#currentTime").html(currentTime);

    colorCode();
  };
  
  setInterval(tick, 1000);

// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?

  //Grabs row ID and description associated with the save button pressed
  $(".saveBtn").click(function(event){
    
    selectedID = $(event.target).parents(".time-block").attr("id");
    selectedText = $(event.target).parents("div").children(".description").val();

    console.log("ID: " + selectedID + '\n' + "HTML: " + selectedText);
  });

  //Sets text box color based on hour of day
  function colorCode(){
    resetColor();

    $(".time-block").each(function(){
      if ($(this).attr("id") == now) {
        $(this).addClass("present");
      } else if ($(this).attr("id") < now) {
        $(this).addClass("past");
      } else {
        $(this).addClass("future");
      };
      });
  };
  
    //Removes color-determining classes from text boxes to avoid stacking different class types
    function resetColor(){
      $(".time-block").each(function(){
        $(this).removeClass("present", "past", "future");
      });
    };

  colorCode();
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.
});
