$(function () {
    //userData is used to push user inputs into storage when save button is pressed
    var userData = JSON.parse(localStorage.getItem("userData")) || [
      {id: "", text: ""},
      {id: "", text: ""},
      {id: "", text: ""},
      {id: "", text: ""},
      {id: "", text: ""},
      {id: "", text: ""},
      {id: "", text: ""},
      {id: "", text: ""},
      {id: "", text: ""},
    ];

  //Tick gets called every second - Updates clock & color-coding
  function tick() {

    var currentDay = dayjs().format('dddd, MMMM D');
    var currentTime = dayjs().format('h:mm:ss A');

    $("#currentDay").html(currentDay);
    $("#currentTime").html(currentTime);

    colorCode();
  };

  //Sets text box color based on hour of day
  function colorCode(){
    var now = dayjs().hour();

    var now = dayjs().hour();

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

  //Displays values saved in localData
  function loadData(){

    console.log(userData);

    $(".time-block").each(function(){
      var thisID = $(this).attr("id");
      var thisText = $(this).children(".description").val();
      console.log(thisID + "//" + thisText);
  
      //Replaces textarea value with userData.text
      $(this).children(".description").val(userData[thisID - 9].text);
    });
  };

  //Grabs row ID and description associated with the save button pressed, sends to localStorage
  $(".saveBtn").click(function(event){

    selectedID = $(event.target).parents(".time-block").attr("id");
    selectedText = $(event.target).parents("div").children(".description").val();
    
    //selectedID is subtracted by 9 so it aligns with the array value (i.e. userData[9] becomes userData[0] with the subtracted value)
    userData[selectedID - 9].id = selectedID;
    userData[selectedID - 9].text = selectedText;

    //pushes updated version of userData to localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
  });

  //Sets a time interval that calls tick() every second
  setInterval(tick, 1000);
  //tick() is called manually here to avoid the 1 second delay on load
  tick();
  //loadData() is called here to load in saved data at load
  loadData();
});
