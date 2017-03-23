class ScoreBoard {
	constructor(playerName){
		this.playerName = playerName;
		this.ones = '';
		this.twos = 5;
		this.threes = '';
		this.fours = '';
		this.fives = '';
		this.sixes = '';
		this.sum = '';
		this.bonus = '';
		this.onePair = '';
		this.twoPairs = '';
		this.threeOfAKind = '';
		this.fourOfAKind = '';
		this.smallStraight = '';
		this.largeStraight = '';
		this.fullHouse = '';
		this.chance = '';
		this.yatzy = '';
		this.total = '';
		this.updateScores();
	}
	updateScores(){
		for(let prop in this){
			if(prop === 'playerName'){
				$('.titles').append(`<th>${this[prop]}</th>`);
			}else{
				$('.' + prop).append(`<td>${this[prop]}</td>`);
			}
		}
	}
}