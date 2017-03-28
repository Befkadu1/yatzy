
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

$(start);

function start(){
  $('body').prepend(displayNavbar());
  $('.page-content').append('<div class="scoreboard-container col-xs-6" />');
  $('.scoreboard-container').append(displayScoreBoard());
  $('.page-content').append(`<div class="dice-container col-xs-2 col-md-push-2">  <div class="panel panel-primary ">
    <div class="panel-heading">
    <h3 class="panel-title">Roll the dices</h3>
    </div><div class = testing></div></div></div>`);

  
  for(let i = 0; i < 5; i++){
    dices.push(new Dice(i+1, i+1));
  }
  console.log('dices',dices);

  $('.dice-container').append(displayDices(dices));
  $('.dice-container').append(displayThrowButton());

  scoreBoards[0] = new ScoreBoard('Joel');
  scoreBoards[1] = new ScoreBoard('Olle');
  scoreBoards[2] = new ScoreBoard('Pelle');
  // scoreBoards[0].setPoints('twos', 4);
  // scoreBoards[1].setPoints('threes', 6);
}


$(document).on('click', '.throwButton', function(){
  for (var i = 0; i < dices.length; i++) {
    if (dices[i].locked == false) {
      var randthrow = Math.floor( (Math.random() *6) +1 );
      dices[i].val = randthrow;
      dices[i].setClass(dices[i].locked)
      console.log(dices[i].value);
      $('.diceGroup').remove();
      $('.testing').append(displayDices(dices));

  console.log($(this).text());
    }
    else{
      console.log("This dice is locked!");
    }
  }
});



$(document).on('click', '.dice', function(){

  if(dices[this.id - 1].locked){
    dices[this.id - 1].locked = false;
    dices[this.id -1].setClass(dices[this.id -1].locked);
     $('.diceGroup').remove();
      $('.testing').append(displayDices(dices));
  }else{
    dices[this.id - 1].locked = true;
    dices[this.id -1].setClass(dices[this.id -1].locked);
     $('.diceGroup').remove();
      $('.testing').append(displayDices(dices));
  }

  $(this).toggleClass('locked');

});


$(document).on('click', `tr td`, function(){


  var row = $(this).parent().attr('class');
  console.log(row);

  // Selectorn är ex. '.ones .Joel' och används för att kolla
  // om rätt cell är tom, inte den cellen man klickar på 
  if($('.' + row + ' .' + scoreBoards[turn].playerName).text() == ''){
    switch(row){
      case 'ones': 
        //scoreBoards[turn].calcOnesToSixes(dices,1);
        scoreBoards[turn].setPoints('ones',scoreBoards[turn].calcOnesToSixes(dices,1));
        break;
      case 'twos': 
        //scoreBoards[turn].calcOnesToSixes(dices,2);
        scoreBoards[turn].setPoints('twos',scoreBoards[turn].calcOnesToSixes(dices,2));
        break;
      case 'threes': 
        //scoreBoards[turn].calcOnesToSixes(dices,3);
        scoreBoards[turn].setPoints('threes',scoreBoards[turn].calcOnesToSixes(dices,3));
        break;
      case 'fours': 
        //scoreBoards[turn].calcOnesToSixes(dices,4);
        scoreBoards[turn].setPoints('fours',scoreBoards[turn].calcOnesToSixes(dices,4));
        break;      
      case 'fives': 
        //scoreBoards[turn].calcOnesToSixes(dices,5);
        scoreBoards[turn].setPoints('fives',scoreBoards[turn].calcOnesToSixes(dices,5));
        break;
      case 'sixes': 
        //scoreBoards[turn].calcOnesToSixes(dices,6);
        scoreBoards[turn].setPoints('sixes',scoreBoards[turn].calcOnesToSixes(dices,6));
        break;
      case 'threeOfAKind':
        scoreBoards[turn].calcXOfAKind(dices, 3);
        break;
      case 'fourOfAKind':
        scoreBoards[turn].calcXOfAKind(dices, 4);
        break;
      case 'chance':
        scoreBoards[turn].calcChance(dices);
        break;
      case 'yatzy':
        scoreBoards[turn].calcXOfAKind(dices, 5);
        break;
      default:
        console.log('Default');
    }
  }
});








