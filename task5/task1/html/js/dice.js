$(function() {
   console.log("Throwing die");
   
   function loadDie() {
       $.getJSON( "/api/students/", function(dice) {
           console.log("dice");
           var message = "Type : " + dice.type + ", Value : "+dice.result;
           $(".intro-text").text(message);
       });
   };
   
   loadDie();
   setInterval(loadDie, 2000);
});
