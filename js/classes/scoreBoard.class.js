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

		this.displayCol();
		// Kallar på funktionen för att visa -63 redan från start
		this.calcBonus(0);
	}

	displayCol(){
		// Skriver ut kolumn för den akuella spelaren
		// col-taggen är kanske inte nödvändig, men skadar inte
		$('table.table').prepend(`<col class="${this.playerName}-board" />`);
		for(let prop in this){
			if(prop === 'playerName'){
				$('.titles').append(`<th class="${this.playerName} ${prop}-cell">${this[prop]}</th>`);
			}else{
				// Skriver ut cell för varje property, men skriver ej ut värdet
				// eftersom vi vill se det som en tom cell istället för 0
				$('.' + prop).append(`<td class="${this.playerName} ${prop}-cell">${this[prop]}</td>`);
			}
		}
	}

	calcTotalPoints(){

		
		let sum = this.sum + this.onePair + this.twoPairs + this.threeOfAKind + this.fourOfAKind + this.smallStraight + this.largeStraight + this.fullHouse + this.chance + this.yatzy;

		if(this.bonus < 50){
			this.bonus = 0;
			//console.log('Bonus är: ' + this.bonus)
		}
		//console.log('Summan 1: ' + sum);
		sum+=this.bonus;
		//let sum = 0;
		//sum = this.onePair;
		//console.log('Summan 2: ' + sum);
		this.setPoints('total', sum);

	}


	calcOnesToSixes(dices, number){
		let sum = 0;
		for(let dice of dices){
			if(dice.value === number)
			  {			  	
			  	sum += dice.value;
			  }
		}
		return sum;
		//console.log('Sum of dices: ' + sum);
	}

	calcSumOfOnesToSixes(){
		let sum = 0;
		sum = this.ones + this.twos + this.threes + this.fours + this.fives + this.sixes;
		this.setPoints('sum', sum);
		this.calcBonus(sum);
	}

	// Sätter bonus till -63 till att börja med,
	// sen adderar man summan från 1-6-raderna för att visa
	// hur långt ifrån bonusen man är
	calcBonus(sum){
		let bonus = -63;
		if(sum > 62){
			bonus = 50;
		}else{
			bonus += sum;
		}
		this.setPoints('bonus', bonus);
	}

	calcXOfAKind(dices, val){
		// [[1,x],[2,y]...]
		// Tvådimensionell array där 1 motsvarar värdet på tärningen
		// och x hur många tärningar som har värdet 1
		// Använder man en endimensionell array i stil med
		// [x,y...]
		// och man använder indexet för att veta vilket värde på tärningen det är
		// så finns det risk att man får samma antal på fler än ett ställe
		// vilket gör att indexOf inte fungerar som det ska.
		let amountOfUnique = [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0]];
		let sum = 0;
		let prop = '';

		// Här läggs det på 1 på indexet i arrayen som är ett mindre än värdet
		// på tärningen. Så slipper vi att det startar på index 1.
		// Räknaren uppdaterar bara andra platsen i de inre arrayerna
		for(let dice of dices){
			amountOfUnique[dice.value - 1][1] += 1;
		}
		for(let points of amountOfUnique){
			// Vi kollar om det är någon plats i arrayen där räknaren gått upp
			// till minst det värdet vi letar efter (triss, fyrtal, yatzy)
			if(points[1] >= val){
				if(val !== 5){
					// Här är points kanske [1,2] en gång, och [3,2] en annan gång
					// hade vi haft en endimensionell array så hade vi haft
					// två index med värdet 2. Ex [0,2,0,2,1]
					// Eftersom första platsen i den inre arrayen motsvarar
					// värdet på tärningarna så kan vi multiplicera det med
					// 3 för triss eller 4 för fyrtal
					sum = points[0] * val;
				}else if(val === 5){
					// Om det finns fem tärningar med samma värde har man
					// fått yatzy, och då får man automatiskt 50 poäng
					sum = 50;
				}
				
			}
		}
		//console.log(amountOfUnique);

		// Vi måste skicka in olika strängar till setPoints beroende
		// på om man valt triss, fyrtal eller yatzy
		// Värdet på val motsvarar de olika 
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
				//console.log('Sorry, something went wrong.')
		}
		this.setPoints(prop, sum);
	}

	calcChance(dices){
		let sum = 0;
		for(let dice of dices){
			sum += dice.value;
		}
		//console.log('Sum of dices: ' + sum);
		this.setPoints('chance', sum);
	}

	calcForPair(dices){
		let count1 = 0;
		let count2 = 0;
		let count3 = 0;
		let count4 = 0;
		let count5 = 0;
		let count6 = 0;
        // Går igenom alla tärningar och ökar en counter beroende på vilket värde som står på tärningen
		for (let  dice of dices) {
			if (dice.value === 1) {
				count1++;}
				
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
		return [count1, count2, count3, count4, count5, count6];
	}

	calcPair(dices){
		let counts = this.calcForPair(dices);
		let sum = 0;
       // kollar i turordning ifall det finns minst två av tärningar 
       //när den hittar första paret så stoppar den och sätter summan därefter
		if (counts[5] >= 2) {
			sum = 12;
		}
		else if (counts[4] >= 2) {
			sum = 10;
		}
		else if (counts[3] >= 2){
			sum = 8;
		}
		else if (counts[2] >= 2) {
            sum = 6;
		}
		else if (counts[1] >= 2) {
			sum = 4;
		}
		else if (counts[0] >= 2) {
			sum = 2;
		}
		//console.log(count1,'..',count2,'..',count3,'..',count4,'..',count5,'..',count6);
      //console.log('Sum of pair ' + sum);
      this.setPoints('onePair', sum);
	}

	//A 2 pair function
   calcTwoPairs(dices){
   	var sum = 0;
   	var count = 0;

   	var totalSum =0;

   	//call calcPair() function to see which numbers are a pair
   	var twoPairsArray = this.calcForPair(dices);
   
   	for(var i = 0; i<twoPairsArray.length; i++){
   		if(twoPairsArray[i]>=2 && twoPairsArray[i]< 4){
   			//console.log("i", (i+1));
   			sum += (i+1)*2;
   			++count;

   			if(count>1){
   				totalSum = sum;
   			}
        }
        else if (twoPairsArray[i]>=4){
           totalSum = (i+1)*4;
        }
   	}
   	this.setPoints('twoPairs', totalSum);
   }


	calcSmallStraight(dices){
		let count1 = 0;
		let count2 = 0;
		let count3 = 0;
		let count4 = 0;
		let count5 = 0;
		let count6 = 0;
		let sum = 0;

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
		//console.log('Summan av lilla stegen ' + sum);
		this.setPoints('smallStraight', sum);


	}

	calcFullHouse(dices,valOne,valTwo){

		let amountOfUniques = [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0]];
		var sumOne = 0;
		var sumTwo = 0;
		var sum = 0;
		// Checks how many of each value there is
		for(let dice of dices){
			amountOfUniques[dice.value - 1][1] += 1;
		}
		//First loops to see if there is three of any kind if there is it takes that value * 3
		for(let points of amountOfUniques){
			if(points[1] === valOne){
				sumOne = (amountOfUniques.indexOf(points) + 1) * valOne;
                //If the first one went through it checks here if any value has exactly 
                //2 of a kind and then calculates it
				for(let points of amountOfUniques){
					if(points[1] === valTwo){
						sumTwo += (amountOfUniques.indexOf(points) + 1) * valTwo;
					}
					//if there is no 2 of a kind sets second sum to 0
					else if (sumTwo === 0){
						sumTwo = 0;
					}
				}
			}
		}
		// checks if there were any pair in the second loop, if it aint there isnt a full house
		// and it wont calc the sum
		if(sumTwo > 0){
			sum = sumOne + sumTwo;
		}
		//set the points 0 if there is no full house or the score if you have a fullHouse	
		//this.setPoints('fullHouse',sum);
	this.setPoints('fullHouse', sum);
	}
	calcLargeStraight(dices){
		let count1 = 0;
		let count2 = 0;
		let count3 = 0;
		let count4 = 0;
		let count5 = 0;
		let count6 = 0;
		let sum = 0;


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
				//console.log('sum of  LargeStraight', sum);
				

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
		$(`.${this.playerName}.${prop}-cell`).html(this[prop]);
	}






}








