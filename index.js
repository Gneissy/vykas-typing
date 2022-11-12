//Geliştirmek için yapılacaklar:
// 1+ Mevcut tuş margin-bottom ile (veya lower margin-top ile) yükseltilecek.
// 2 Ses efektleri kaliteli hale gelecek.
// 3+ Success ve Fail işaretleri Eklenecek
// 4+ Mevcut tuş sarımsı şekilde parlayacak.
// 5? Navbar Eklenecek
// 6+ Başlangıca "Press any key to start" eklenecek.


// Default Variables
var keySeries = [];
var isStarted = false;

// Random Letter Generation
function randomLetterGenerator(){
  var letters = ["Q","W","E","A","S","D"];
  randomNumber = Math.floor(Math.random()*6);
  var randomLetter = letters[randomNumber];
  return randomLetter;
}

// Random 7 letters
function randomSeries(){
  for (var i=1; i<9; i++){
      keySeries.push(randomLetterGenerator());
      for (var j=0; j<8; j++){
        $(".p"+j).html("<p>"+keySeries[j]+"</p>");
      }
  }
}

// Starting the game
function kivilcim(){
  $("body").keydown(function(event){
    if(isStarted == false){
      isStarted = true;
      randomSeries();
      // Makes the first button yellow
      $(".btn"+k).addClass("yellowBackground");
      $(".btn"+k).animate({marginTop: "-=30", width:50}, {duration:200});
      $(".successFailure").animate({opacity:0},{duration: 300});
      nextStep();
    }
  });
}
$(".successFailure").animate({opacity:1},{duration: 300}); // "Press Any Key to Start" activated
kivilcim();

// Each keydown
var k = 1;
function nextStep(){
  $("body").keydown(function (event){
    var pressedKey = event.key;
    pressedKey = pressedKey.toUpperCase();
    if(pressedKey === keySeries[k]){
      $(".btn"+k).addClass("pressAnimation"); // Greyish background for passed button
      $(".btn"+(k+1)).addClass("yellowBackground"); // Yellow background on Current Button
      $(".btn"+(k+1)).animate({marginTop: "-=30", width:50}, {duration:200}); // Rising animation for current button
      $(".btn"+k).animate({marginTop: 0, width:50}, {duration:200}); // Descending animation when current button passed
      setTimeout(function(){
        $(".btn"+(k-1)).removeClass("yellowBackground"); // Removing yellow background when current button passed
      },1);
      var sound = new Audio ("audio/success.mp3"); // Success Audio when succeeded
      sound.play();
      imageAdd(k);
      k++;
      if(k===8){
        $("h2").text("Success!"); // Changes h2's text to "Success!"
        $("h2").removeClass("failure"); // Changes h2's shadow color to blue
        $("h2").animate({opacity:1},{duration:200}); // "Success" is visible
        setTimeout(function(){
          $("h2").animate({opacity:0},{duration:200}); // "Success" is not visible
          restartGame();
        },500);
      }
    }
    else if (pressedKey !== keySeries[k]){
      $(".btn"+k).removeClass("yellowBackground"); // Removing yellow background when current button pressing is failed
      $(".btn"+k).addClass("redBackground"); // Adding red background instead
      $("h2").text("Failed"); // Changes h2's text to "Failed"
      $("h2").addClass("failure"); // Changes h2's shadow color to red
      $("h2").animate({opacity:1},{duration:200}); // "Success" is visible
      setTimeout(function(){
        $("h2").animate({opacity:0},{duration:200}); // "Success" is not visible
        restartGame();
      },500);
    }
  });
}

// Starting over
function restartGame(){
  k=1; // Reseting all loops
  i=1; // Reseting all loops
  j=0; // Reseting all loops
  keySeries = []; // Reseting current challange's letters
  randomSeries(); // Creating new challange's letters
  $(".btn").removeClass("pressAnimation"); // Resets greyish background bcz of "pressed" sign
  $(".btn").removeClass("redBackground"); // Resets red background sign of failure
  $(".btn").removeClass("yellowBackground"); // Resets yellow background sign of current button
  $(".btn"+k).addClass("yellowBackground"); // Adds yellow background to the first challange's first letter
  $(".btn").animate({marginTop: 0, width:50}, {duration:200}); // Resets all positions
  $(".btn"+(k)).animate({marginTop: "-=30", width:50}, {duration:200}); // Rise animation of the first letter of the first challange
}

// Poping star when pressing is succeeded
function imageAdd(k){
  $(".btn"+k+ " img").addClass("star-visible");
  setTimeout(function(){
    $(".btn"+k+ " img").removeClass("star-visible");
  },200); // Removes star after 0.2s
}
