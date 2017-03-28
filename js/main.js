
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
  $('.page-content').append('<div class="dice-container col-xs-4 col-sm-2 col-xs-push-2" />');

  
  for(let i = 0; i < 5; i++){
    dices.push(new Dice(i+1, i+1));
  }
  console.log('dices',dices);

  $('.dice-container').append(displayDices(dices));
  $('.dice-container').append(displayThrowButton());

  scoreBoards[0] = new ScoreBoard('Joel');
  scoreBoards[1] = new ScoreBoard('Olle');
  scoreBoards[2] = new ScoreBoard('Pelle');
  scoreBoards[0].setPoints('twos', 4);
  scoreBoards[1].setPoints('threes', 6);
}

$(document).on('click', '.dice', function(){
  if(dices[this.id - 1].locked){
    dices[this.id - 1].locked = false;
  }else{
    dices[this.id - 1].locked = true;
  }

  $(this).toggleClass('locked');

});

$(document).on('click', `tr td`, function(){

  console.log($(this).text());

  var row = $(this).parent().attr('class');
  console.log(row);

  // Selectorn är ex. '.ones .Joel' och används för att kolla
  // om rätt cell är tom, inte den cellen man klickar på 
  if($('.' + row + ' .' + scoreBoards[turn].playerName).text() == ''){
    switch(row){
      case 'ones': 
        scoreBoards[turn].calcOnes(dices);
        break;
      case 'twos': 
        scoreBoards[turn].calcTwos(dices);
        break;
      case 'threes': 
        scoreBoards[turn].calcThrees(dices);
        break;
      case 'chance':
        scoreBoards[turn].calcChance(dices);
        break;
      default:
        console.log('Default');
    }
  }
});






