
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

  let scoreBoard = new ScoreBoard('Joel');
  let scoreBoard2 = new ScoreBoard('Olle');
  let scoreBoard3 = new ScoreBoard('Pelle');
  scoreBoard.setPoints('twos', 4);
  scoreBoard2.setPoints('threes', 5);
}

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

function throwDices(){
  for (var i = 0; i < dices.length; i++) {
    if (dices[i].locked == false) {
      var randthrow = Math.floor( (Math.random() *6) +1 );
      dices[i].val = randthrow;
      dices[i].setClass(dices[i].locked)
      console.log(dices[i].value);
      $('.diceGroup').remove();
      $('.testing').append(displayDices(dices));

    }
    else{
      console.log("This dice is locked!");
    }
  }
}







