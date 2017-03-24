
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

$(start);

function start(){
  $('body').prepend(displayNavbar());
  $('.page-content').append('<div class="scoreboard-container col-xs-6" />');
  $('.scoreboard-container').append(displayScoreBoard());
  $('.page-content').append('<div class="dice-container col-xs-6" />');
  $('.dice-container').append(displayDices());
  $('.dice-container').append(displayThrowButton());

  let scoreBoard = new ScoreBoard('Joel');
  let scoreBoard2 = new ScoreBoard('Olle');
  let scoreBoard3 = new ScoreBoard('Pelle');
  scoreBoard.setPoints('twos', 4);
  scoreBoard2.setPoints('threes', 5);
}
