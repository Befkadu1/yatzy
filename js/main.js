//creating a result table
$.ajax({
    type: 'POST',
    url: '/queries/create-result-table'    
}).done(function(){
  //console.log('reading the lorems row with id 1');
});


$.ajax({
    type: 'POST',
    url: '/queries/create-current-game-table'    
}).done(function(){
  $.ajax({
    type: 'POST',
    url: '/queries/clear-current-game'    
  }).done(function(){
    //console.log('reading the lorems row with id 1');
  });
});


/*
$.ajax({
    type: 'GET',
    url: '/queries/read-lorems'
}).done(function(data){
  console.log('reading all the the lorems rows', data);
});

$.ajax({
    type: 'GET',
    url: '/queries/read-ipsums'
}).done(function(data){
  console.log('reading all the the ipsums rows', data);
});

$.ajax({
    type: 'GET',
    url: '/queries/read-lorems-ipsums'
}).done(function(data){
  console.log('reading all the the lorems-ipsums left joins', data);
});*/
var first = false
let dices = [];
let scoreBoards = [];
var numberOfThrows = 0;
let gameCounter = 0; // 15 är max, då har alla rutor fyllts i 

// turn startar på -1 eftersom att vi kallar på
// newRound() i början för att autokasta,
// och där ökar vi turn 
let turn = -1;
  

// Skapar en turn-tabell, och skriver till databasen
$.ajax({
    type: 'POST',
    url: '/queries/create-turn-table'    
}).done(function(){
  $.ajax({
    type: 'POST',
    url: '/queries/clear-turn-table'    
  }).done(function(){
    $.ajax({
      type: 'POST',
      url: '/queries/insert-turn-row',
      data: JSON.stringify([turn]),
      dataType:"json",
      contentType: "application/json",
      processData: false    
    }).done(function(){
      $.ajax({
        type: 'GET',
        url: '/queries/read-turn'
      }).done(function(data){
        console.log('Turn: Player ' + data[0].player_index);
      });
    });
  });
});

$(start);

function start(){
  $('.start-page').append('<div class="input-userName col-xs-3" />');
  $('.input-userName').append(displayStartPage());
      $('.start-page').append(`<div class="input-userName">
    </div><div class="user-panel col-xs-3"></div>`);



      (function() {
  $(function() {
    $(".login--container").removeClass("preload");
    this.timer = window.setTimeout((function(_this) {
      return function() {
        return $(".login--container").toggleClass("login--active");
      };
    })(this), 2000);
    return $(".js-toggle-login").click((function(_this) {
      return function() {
        window.clearTimeout(_this.timer);
        $(".login--container").toggleClass("login--active");
        return $(".login--username-container input").focus();
      };
    })(this));
  });
}).call(this);
}
 //Only allows letters in username
function alphaOnly(event) {
  var key = event.keyCode;  
  return ((key >= 65 && key <= 90) || key == 8);
};

$(document).on('click', '.addUser', function(){
  $(".theButtons").before($(".user-panel"));
  $('.user-panel').append(displayUserPage());
});

$(document).on('click', '.removeUser', function(){
$('.user-panel .newUser:last').remove()
});

$(document).on('click', '.startGame', function(){

  var checkEmpty = false;
  var values = $("input[name='pname[]']")
              .map(function(){return $(this).val();}).get();
              console.log(values);
  for (var i = 0; i < values.length; i++) {
    if(values[i] === ""){
      checkEmpty = true;
      alert("Fill all usernames");
    }

  } 
  console.log(checkEmpty);
  if(checkEmpty === false){
  $(".overlay").remove();
   $('body').prepend(displayNavbar());
  // Skriver ut en container för att hålla scoreboarden, tar upp halva page-content
  $('.page-content').append('<div class="scoreboard-container col-xs-4" />');
  // Skriver ut grund-protokollet, alltså utan spelar-kolumnerna
  $('.scoreboard-container').append(displayScoreBoard());
  
  $('.page-content').append(`<div class="dice-container col-xs-4 col-xs-push-2">  <div class="panel panel-primary ">
    <div class="panel-heading">
    <h3 class="panel-title">Roll the dices</h3>
    </div><div class="dice-panel"></div>
    </div>`);

  // Skapar nya tärningar som läggs in i dices-arrayen
  for(let i = 0; i < 5; i++){
    dices.push(new Dice(i+1, i+1));
  }
  //console.log('dices',dices);
 
  

  console.log("NUMMER: " + numberOfThrows);
  $('.dice-container').append(displayThrowButton());


  // Skapar scoreboards för olika spelare
  // Senare, om man låter användarna skriva in sitt namn
  // själv, så kan man skicka in det namnet, eller t.o.m. person-objektet

  // Läser in modalen för high scores
  $('.page-content').append('<div class="high-scores-modal-container" />')
  $('.high-scores-modal-container').html(highScoresModal());

    for (var i = 0; i < values.length; i++) {
      scoreBoards[i] = new ScoreBoard(values[i]);
    }

    newRound();
  }

//highlighting the column of the current player
  $( '.'+ scoreBoards[0].playerName +'-board').addClass( "toBeselected" );
});

function newRound(){
  // Itererar över scoreBoards index för att bestämma vems tur det är
  if(turn === scoreBoards.length - 1){ 
    turn = 0;
    //highlighting the column of the current player
    $( '.'+ scoreBoards[turn].playerName +'-board').addClass( "toBeselected" ); 
    $('.'+ scoreBoards[turn].playerName +'-board').nextAll().removeClass("toBeselected" );   
   
  } else {
    ++turn;
    //highlighting the column of the current player
     $('.'+ scoreBoards[turn].playerName +'-board').prevAll().removeClass("toBeselected" );
      $( '.'+ scoreBoards[turn].playerName +'-board').addClass( "toBeselected" );
      $('.'+ scoreBoards[turn].playerName +'-board').nextAll().removeClass("toBeselected" );

  }

  // Skriver den uppdaterade turn till DB
  $.ajax({
    type: 'POST',
    url: '/queries/update-turn',
    data: JSON.stringify([turn]),
    dataType:"json",
    contentType: "application/json",
    processData: false    
  });
 

  // Denna funktion körs varje gång man startar spelet eller valt poäng och 
  //kastar då tärningarna en gång direkt så man inte kan använda dem gamla tärningarna
      playSound('throw');
     for (var i = 0; i < dices.length; i++) {
      var randthrow = Math.floor( (Math.random() *6) +1 );
        dices[i].val = randthrow;
        //console.log(dices[i].value);
        dices[i].locked = false;
        dices[i].setClass(dices[i.locked]);
        $('.diceGroup').remove();
        $('.dice-panel').append(displayDices(dices));
     }

     // När tärningarna slumpats så vill vi visa hintar
     scoreBoards[turn].calcHints(dices);

     numberOfThrows++;
     document.getElementById("kastCounter").innerHTML = "Kast "+ numberOfThrows +" av 3";
     console.log("Du har kastat: " + numberOfThrows);
}

// En listener för länken "High scores" i navbaren
$(document).on('click', '#high-scores-link', function(){
  $('.high-scores-table').html(`
    <tr>
      <th>Rank</th>
      <th>Username</th>
      <th>Score</th>
    </tr>`);
  // get the high score list
  $.ajax({
    type: 'GET',
    url: '/queries/read-high-scores'
  }).done(function(data){
    // Här kan man loopa igenom en lista som man hämtar från DB och skicka in till
    // highScoreRow som objekt eller en array om man vill
    for(let row of data){
      $('.high-scores-table').append(highScoreRow({rank: data.indexOf(row) + 1, username: row.username, result: row.result}));
    }
  });
});

$(document).on('click', '#rules-link', function(){
  console.log("hej");
  

  });

function playSound(type){
  var sound = document.createElement("audio");
  sound.volume=0.20;
  sound.autoPlay=false;
  sound.preLoad=true;  
  // Man kan lägga till flera olika ljud i switchen
  switch(type){
    case 'throw':
      sound.src="../sounds/roll-dices.wav";
      break;
    case 'game-over':
      sound.src="../sounds/game-over.wav";
      break;
    default:
      console.log('No sound for that');
  }
  sound.play();
}

$(document).on('click', '.throwButton', function(){
  // kollar så man inte kastat 3 gånger redan har man inte gjort det så 
  //går den in och kör random på alla tärningar
  
  if(numberOfThrows < 3){
     playSound('throw');
        

    for (var i = 0; i < dices.length; i++) {
      if (dices[i].locked == false) {
        var randthrow = Math.floor( (Math.random() *6) +1 );
        dices[i].val = randthrow;
        dices[i].setClass(dices[i].locked)
        //console.log(dices[i].value);
        $('.diceGroup').remove();
        $('.dice-panel').append(displayDices(dices));
      }
      else{
        //console.log("This dice is locked!");
      }
    }
    // När tärningarna slumpats vill vi visa hintar
    scoreBoards[turn].calcHints(dices);
  }
  else{
    //console.log('You have already rolled three times')
  }//ifall man inte kastat 3 gånger så ökas numberOfThrows med ett
  
  if(numberOfThrows < 3){
    numberOfThrows++;
     document.getElementById("kastCounter").innerHTML = "Kast "+ numberOfThrows +" av 3";
 

   
    

    // har man kastat exakt tre gånger så låser sig knappen och blir oklickbar
    if (numberOfThrows === 3){
      document.getElementById("throwingButton").disabled = true;
       document.getElementById("kastCounter").innerHTML = "Kast "+ numberOfThrows +" av 3";
    }
  }

});



$(document).on('click', '.dice', function(){
 // lyssnar på klick på tärningarna ifall man klickar på en så låser den sig 
 //och uppdaterar så den röda färgen syns 
 console.log("id ", dices[this.id-1]);
  if(dices[this.id - 1].locked){
    dices[this.id - 1].locked = false;
    dices[this.id -1].setClass(dices[this.id -1].locked);
    $('.diceGroup').remove();
    $('.dice-panel').append(displayDices(dices));

    //To show the number of throws left 
    document.getElementById("kastCounter").innerHTML = "Kast "+ numberOfThrows +" av 3";
//Är tärningen redan låst så låses den upp vid klick och uppdaterar så användaren ser det
  }else{
    dices[this.id - 1].locked = true;
    dices[this.id -1].setClass(dices[this.id -1].locked);
    $('.diceGroup').remove();
    console.log("Antal kast: " + numberOfThrows);
    $('.dice-panel').append(displayDices(dices));
    //To show the number of throws left
    document.getElementById("kastCounter").innerHTML = "Kast "+ numberOfThrows +" av 3";
  }

  $(this).toggleClass('locked');

});

function gameOver(){
  playSound('game-over');
  var winner = "";
  var bestScore = 0;
  for (var i = 0; i < scoreBoards.length; i++) {

    //To insert the username and the total point to the database
    $.ajax({
      type: 'POST',
      url: '/queries/write-score',
      data: JSON.stringify({"username": scoreBoards[i].playerName ,"result":scoreBoards[i].total}),
      dataType:"json",
      contentType: "application/json",
      processData: false
    }).done(function(result){
      // console.log('reading all the the rows in the result table', result);
    });
    if(scoreBoards[i].total > bestScore) {
      bestScore = scoreBoards[i].total;
      winner = scoreBoards[i].playerName;
    }
  }

  $(document).on('click', `.play-again-button`, function(){
    location.reload();
  });

  let message = "The winner is " + winner + " with a score of " + bestScore + "!";
  $('.page-content').append('<div class="game-over-modal-container" />')
  $('.game-over-modal-container').html(gameOverModal(message));

  $(document).ready(function() {
    $('.game-over-modal').modal('show');
  });

   //alert(message);
}

// Lyssnar på klick i alla celler, kör rätt funktion beroende på rad
$(document).on('click', `.yatzy-table tr`, function(){
  var row = $(this).attr('class');

  // Selectorn är ex. '.ones .Joel' och används för att kolla
  // om rätt cell är tom eller har classen .hint
  let cell = '.' + row + ' .' + scoreBoards[turn].playerName;
  if($(cell).text() == '' || $(cell).hasClass('hint')){
    //$(cell).removeClass('hint');
    $('.hint').html('');
    $('.' + scoreBoards[turn].playerName).removeClass('hint');

    switch(row){
      case 'ones': 
        //scoreBoards[turn].calcOnesToSixes(dices,1);
        scoreBoards[turn].calcOnesToSixes(dices,1);
        // Räknar ut summan och bonus för 1-6-raderna
        scoreBoards[turn].calcSumOfOnesToSixes();
        break;
        case 'twos': 
        //scoreBoards[turn].calcOnesToSixes(dices,2);
        scoreBoards[turn].calcOnesToSixes(dices,2);
        scoreBoards[turn].calcSumOfOnesToSixes();
        break;
        case 'threes': 
        //scoreBoards[turn].calcOnesToSixes(dices,3);
        scoreBoards[turn].calcOnesToSixes(dices,3);
        scoreBoards[turn].calcSumOfOnesToSixes();
        break;
        case 'fours': 
        //scoreBoards[turn].calcOnesToSixes(dices,4);
        scoreBoards[turn].calcOnesToSixes(dices,4);
        scoreBoards[turn].calcSumOfOnesToSixes();
        break;      
        case 'fives': 
        //scoreBoards[turn].calcOnesToSixes(dices,5);
        scoreBoards[turn].calcOnesToSixes(dices,5);
        scoreBoards[turn].calcSumOfOnesToSixes();
        break;
        case 'sixes': 
        //scoreBoards[turn].calcOnesToSixes(dices,6);
        scoreBoards[turn].calcOnesToSixes(dices,6);
        scoreBoards[turn].calcSumOfOnesToSixes();
        break;
        case 'onePair':
        scoreBoards[turn].calcPair(dices);
        break;  
        case 'twoPairs': 
        scoreBoards[turn].calcTwoPairs(dices);
        break;
        case 'threeOfAKind':
        scoreBoards[turn].calcXOfAKind(dices, 3);
        break;
        case 'fourOfAKind':
        scoreBoards[turn].calcXOfAKind(dices, 4);
        break;
        case 'fullHouse':
        scoreBoards[turn].calcFullHouse(dices,3,2);
        break;
        case 'smallStraight':
        scoreBoards[turn].calcSmallStraight(dices);
        break;
        case 'largeStraight':
        scoreBoards[turn].calcLargeStraight(dices);
        break;
        case 'chance':
        scoreBoards[turn].calcChance(dices);
        break;
        case 'yatzy':
        scoreBoards[turn].calcXOfAKind(dices, 5);
        break;
      default:
        //console.log('Default');
      }
      //kollar så man inte klickat på total eller sum
      if(row === 'total' || row === 'sum'){
      }
      else{
        numberOfThrows = 0;
        document.getElementById("throwingButton").disabled = false;
        scoreBoards[turn].calcTotalPoints();
        
        // Kollar om det är sista spelarens tur 
        if(turn === scoreBoards.length - 1){
          gameCounter++;
          // Om gamecounter är 15 så är alla rutor ifyllda
          if(gameCounter >= 15){
            // Här kan man kalla på en funktion, typ gameOver()
            gameOver();

          }else{
            newRound();
          }
        }else{
          newRound();
        }

        }
      }
    
  });








