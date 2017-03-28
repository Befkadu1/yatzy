class ScoreBoard {
	constructor(playerName){
		this.playerName = playerName;
		this.ones = '';
		this.twos = '';
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

		// Skriver ut kolumn för den akuella spelaren
		$('table.table').prepend(`<col class="${this.playerName}-board" />`);
		for(let prop in this){
			if(prop === 'playerName'){
				$('.titles').append(`<th class="${this.playerName} ${prop}-cell">${this[prop]}</th>`);
			}else{
				$('.' + prop).append(`<td class="${this.playerName} ${prop}-cell">${this[prop]}</td>`);
			}
		}
	}

	calcOnes(dices){
		let sum = 0;
		for(let dice of dices){
			sum += dice.value;
		}
		console.log('Sum of dices: ' + sum);
	}

	calcThreeOfAKind(dices){
		let amountOfUnique = [0,0,0,0,0,0,0];
		let sum = 0;
		for(let dice of dices){
			console.log('amount before',amountOfUnique[dice.value]);
			amountOfUnique[dice.value] += 1;
			console.log('amount after', amountOfUnique[dice.value]);
		}
		for(let val of amountOfUnique){
			if(val >= 3){
				sum = amountOfUnique.indexOf(val) * 3;
			}
		}
		this.setPoints('threeOfAKind', sum);
	}

	calcChance(dices){
		let sum = 0;
		for(let dice of dices){
			sum += dice.value;
		}
		console.log('Sum of dices: ' + sum);
		this.setPoints('chance', sum);
	}



	// Kan användas för att uppdatera DOM:en så att den skriver ut aktuella värden
	updateScores(){
		for(let prop in this){
			$(`.${this.playerName}.${prop}-cell`).html(this[prop]);
		}
	}

	// Tar in värdet och propertyn som ska uppdateras
	// Uppdaterar både objektet och DOM:en
	setPoints(prop, val){
		this[prop] = val;
		$(`.${this.playerName}.${prop}-cell`).append(this[prop]);
	}







}








