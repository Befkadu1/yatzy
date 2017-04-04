
/*$.ajax({
    type: 'POST',
    url: '/queries/read-lorem',
    data: JSON.stringify([1]),
    contentType: "application/json"
}).done(function(data){
  console.log('reading the lorems row with id 1', data);
});
=======
$(start);
>>>>>>> 8b804e511a4e4bfa83b6f75f7c1fa5cc99a250eb


function start(){

$('body').append(displayNavbar());
$('body').append(displayDices());

<<<<<<< HEAD
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

let dices = [];
let scoreBoards = [];
let turn = 0;
var numberOfThrows = 0;

$(start);

function start(){
  $('body').prepend(displayNavbar());
  // Skriver ut en container för att hålla scoreboarden, tar upp halva page-content
  $('.page-content').append('<div class="scoreboard-container col-xs-6" />');
  // Skriver ut grund-protokollet, alltså utan spelar-kolumnerna
  $('.scoreboard-container').append(displayScoreBoard());
  
  $('.page-content').append(`<div class="dice-container col-xs-6 col-xs-push-2">  <div class="panel panel-primary ">
    <div class="panel-heading">
    <h3 class="panel-title">Roll the dices</h3>
    </div><div class="dice-panel"></div>
    <div class="kast1 stylekast"></div><div class="kast2 stylekast"></div><div class="kast3 stylekast"></div></div></div>`);

  // Skapar nya tärningar som läggs in i dices-arrayen
  for(let i = 0; i < 5; i++){
    dices.push(new Dice(i+1, i+1));
  }
  //console.log('dices',dices);

  newRound();
  console.log("NUMMER: " + numberOfThrows);
  $('.dice-container').append(displayThrowButton());


  // Skapar scoreboards för olika spelare
  // Senare, om man låter användarna skriva in sitt namn
  // själv, så kan man skicka in det namnet, eller t.o.m. person-objektet
  scoreBoards[0] = new ScoreBoard('Joel');
  scoreBoards[1] = new ScoreBoard('Olle');
  scoreBoards[2] = new ScoreBoard('Pelle');
}
function newRound(){
  // Denna funktion körs varje gång man startar spelet eller valt poäng och 
  //kastar då tärningarna en gång direkt så man inte kan använda dem gamla tärningarna
     for (var i = 0; i < dices.length; i++) {
      var randthrow = Math.floor( (Math.random() *6) +1 );
        dices[i].val = randthrow;
        //console.log(dices[i].value);
        dices[i].locked = false;
        dices[i].setClass(dices[i.locked]);
        $('.diceGroup').remove();
        $('.dice-panel').append(displayDices(dices));

        //console.log($(this).text());


     }

     numberOfThrows++;
     console.log("Du har kastat: " + numberOfThrows);

      $('.kast1').append("Kast " + numberOfThrows + " av 3.");


}




$(document).on('click', '.throwButton', function(){
  // kollar så man inte kastat 3 gånger redan har man inte gjort det så 
  //går den in och kör random på alla tärningar
  
  if(numberOfThrows < 3){

    for (var i = 0; i < dices.length; i++) {
      if (dices[i].locked == false) {
        var randthrow = Math.floor( (Math.random() *6) +1 );
        dices[i].val = randthrow;
        dices[i].setClass(dices[i].locked)
        //console.log(dices[i].value);
        $('.diceGroup').remove();
        $('.dice-panel').append(displayDices(dices));
        

        //console.log($(this).text());
      }
      else{
        //console.log("This dice is locked!");
      }
    }
  }
  else{
    //console.log('You have already rolled three times')
  }//ifall man inte kastat 3 gånger så ökas numberOfThrows med ett
  
  if(numberOfThrows < 3){
    numberOfThrows++;
 

    console.log(numberOfThrows,'Många kast har du gjort');
     $('.kast1').remove();
     $('.kast2').append("Kast " + numberOfThrows + " av 3.");
   
    

    // har man kastat exakt tre gånger så låser sig knappen och blir oklickbar
    if (numberOfThrows === 3){
      document.getElementById("throwingButton").disabled = true;
       $('.kast2').remove();
       $('.kast3').append("Kast " + numberOfThrows + " av 3.");
    }
  }

});



$(document).on('click', '.dice', function(){
 // lyssnar på klick på tärningarna ifall man klickar på en så låser den sig 
 //och uppdaterar så den röda färgen syns
  if(dices[this.id - 1].locked){
    dices[this.id - 1].locked = false;
    dices[this.id -1].setClass(dices[this.id -1].locked);
    $('.diceGroup').remove();
    $('.dice-panel').append(displayDices(dices));
//Är tärningen redan låst så låses den upp vid klick och uppdaterar så användaren ser det
  }else{
    dices[this.id - 1].locked = true;
    dices[this.id -1].setClass(dices[this.id -1].locked);
    $('.diceGroup').remove();
    console.log("Antal kast: " + numberOfThrows);
    $('.dice-panel').append(displayDices(dices));
  }

  $(this).toggleClass('locked');

});

// Lyssnar på klick i alla celler, kör rätt funktion beroende på rad
$(document).on('click', `tr td`, function(){
  var row = $(this).parent().attr('class');
  //console.log(row);

  // Selectorn är ex. '.ones .Joel' och används för att kolla
  // om rätt cell är tom, inte den cellen man klickar på 
  if($('.' + row + ' .' + scoreBoards[turn].playerName).text() == ''){
    switch(row){
      case 'ones': 
        //scoreBoards[turn].calcOnesToSixes(dices,1);
        scoreBoards[turn].setPoints('ones',scoreBoards[turn].calcOnesToSixes(dices,1));
        // Räknar ut summan och bonus för 1-6-raderna
        scoreBoards[turn].calcSumOfOnesToSixes();
        break;
        case 'twos': 
        //scoreBoards[turn].calcOnesToSixes(dices,2);
        scoreBoards[turn].setPoints('twos',scoreBoards[turn].calcOnesToSixes(dices,2));
        scoreBoards[turn].calcSumOfOnesToSixes();
        break;
        case 'threes': 
        //scoreBoards[turn].calcOnesToSixes(dices,3);
        scoreBoards[turn].setPoints('threes',scoreBoards[turn].calcOnesToSixes(dices,3));
        scoreBoards[turn].calcSumOfOnesToSixes();
        break;
        case 'fours': 
        //scoreBoards[turn].calcOnesToSixes(dices,4);
        scoreBoards[turn].setPoints('fours',scoreBoards[turn].calcOnesToSixes(dices,4));
        scoreBoards[turn].calcSumOfOnesToSixes();
        break;      
        case 'fives': 
        //scoreBoards[turn].calcOnesToSixes(dices,5);
        scoreBoards[turn].setPoints('fives',scoreBoards[turn].calcOnesToSixes(dices,5));
        scoreBoards[turn].calcSumOfOnesToSixes();
        break;
        case 'sixes': 
        //scoreBoards[turn].calcOnesToSixes(dices,6);
        scoreBoards[turn].setPoints('sixes',scoreBoards[turn].calcOnesToSixes(dices,6));
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
      newRound();
      scoreBoards[turn].calcTotalPoints();
    }
    }
  });








