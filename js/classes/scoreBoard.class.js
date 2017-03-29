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

	calcOnesToSixes(dices, number){
		let sum = 0;
		for(let dice of dices){
			if(dice.value=== number)
			  {			  	
			  	sum += dice.value;
			  }
		}
		return sum;
		console.log('Sum of dices: ' + sum);
	}

	calcXOfAKind(dices, val){
		let amountOfUnique = [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0]];
		let sum = 0;
		let prop = '';
		for(let dice of dices){
			amountOfUnique[dice.value - 1][1] += 1;
		}
		for(let points of amountOfUnique){
			if(points[1] >= val){
				if(val !== 5){
					sum = (amountOfUnique.indexOf(points) + 1) * val;
				}else if(val === 5){
					sum = 50;
				}
				
			}
		}
		switch(val){
			case 3:
				prop = 'threeOfAKind';
				break;
			case 4:
				prop = 'fourOfAKind';
				break;
			case 5:
				prop = 'yatzy'
				break;
			default:
				console.log('Sorry, something went wrong.')
		}
		this.setPoints(prop, sum);
	}

	calcChance(dices){
		let sum = 0;
		for(let dice of dices){
			sum += dice.value;
		}
		console.log('Sum of dices: ' + sum);
		this.setPoints('chance', sum);
	}

	calcPair(dices){
		var count1 = 0;
		var count2 = 0;
		var count3 = 0;
		var count4 = 0;
		var count5 = 0;
		var count6 = 0;
		var sum = 0;

		for (let  dice of dices) {
			if (dice.value === 1) {
				count1++;
			}
				else if (dice.value === 2) {
				count2++;
			}
				else if (dice.value === 3) {
				count3++;
			}
				else if (dice.value === 4) {
				count4++;
			}
				else if (dice.value === 5) {
				count5++;
			}
				else if (dice.value === 6) {
				count6++;
			}

		}
		if (count6 >= 2) {
			sum = 12;
		}
		else if (count5 >= 2) {
			sum = 10;
		}
		else if (count4 >= 2){
			sum = 8;
		}
		else if (count3 >= 2) {
            sum = 6;
		}
		else if (count2 >= 2) {
			sum = 4;
		}
		else if (count1 >= 2) {
			sum = 2;
		}
		console.log(count1,'..',count2,'..',count3,'..',count4,'..',count5,'..',count6);
      console.log('Sum of pair ' + sum);
      this.setPoints('onePair', sum);

	}


	calcSmallStraight(dices){
		var count1 = 0;
		var count2 = 0;
		var count3 = 0;
		var count4 = 0;
		var count5 = 0;
		var count6 = 0;
		var sum = 0;

		for (let  dice of dices) {
			if (dice.value === 1) {
				count1++;
			}
				else if (dice.value === 2) {
				count2++;
			}
				else if (dice.value === 3) {
				count3++;
			}
				else if (dice.value === 4) {
				count4++;
			}
				else if (dice.value === 5) {
				count5++;
			}
				else if (dice.value === 6) {
				count6++;
			}

		}

		if(count1 === 1 && count2 === 1 && count3 ===1 && count4 === 1 && count5 === 1){
			sum = 15;
		}
	
		else{
			sum = 0;
		}
		console.log('Summan av lilla stegen ' + sum);
		this.setPoints('smallStraight', sum);


	}

	calcLargeStraight(dices){
		var count1 = 0;
		var count2 = 0;
		var count3 = 0;
		var count4 = 0;
		var count5 = 0;
		var count6 = 0;
		var sum = 0;

			for(let Dice of dices){
				if(Dice.value === 2){
					count1++;
			}				
				else if (Dice.value === 3) {
				count2++;
			}
				else if (Dice.value === 4) {
				count3++;
			}
				else if (Dice.value === 5) {
				count4++;
			}
				else if (Dice.value === 6) {
				count5++;
			}
				else if(Dice.value === 1){
					count6++;
			}
			}
			if(count1 === 1 && count2 === 1 && count3 === 1 && count4 === 1 && count5 === 1 && count6 === 0){
				sum = 20;
				console.log('sum of  LargeStraight', sum);
				

			}
			else{
				sum = 0;
			}
			this.setPoints('largeStraight', sum);

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








