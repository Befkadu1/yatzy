class ScoreBoard {


	constructor(playerName){
		this.playerName = playerName;
		this.ones = 0;
		this.twos = 0;
		this.threes = 0;
		this.fours = 0;
		this.fives = 0;
		this.sixes = 0;
		this.sum = 0;
		this.bonus = 0;
		this.onePair = 0;
		this.twoPairs = 0;
		this.threeOfAKind = 0;
		this.fourOfAKind = 0;
		this.smallStraight = 0;
		this.largeStraight = 0;
		this.fullHouse = 0;
		this.chance = 0;
		this.yatzy = 0;
		this.total = 0;
		this.testing = 0;

		// Skriver ut kolumn för den akuella spelaren
		// col-taggen är kanske inte nödvändig, men skadar inte
		$('colgroup').append(`<col class="${this.playerName}-board col-xs-1" />`);
		for(let prop in this){
			if(prop === 'playerName'){
				//$('.titles').append(`<th class="${this.playerName} ${prop}-cell">${this[prop]}</th>`);
			}else{
				// Skriver ut cell för varje property, men skriver ej ut värdet
				// eftersom vi vill se det som en tom cell istället för 0
				$('.' + prop).append(`<td class="${this.playerName} ${prop}-cell"></td>`);
			}
		}

		// Kallar på funktionen för att visa -63 redan från start
		this.calcBonus(0);
	}

	calcHints(dices){
		let cell = '';
		for(let prop in this){
			if(prop !== 'playerName' || prop !== 'sum' || prop !== 'bonus' || prop !== 'total' || prop !== 'testing'){
				// Classen för den cellen vi vill skriva ut en hint i
				cell = `.${this.playerName}.${prop}-cell`;
			}
			// Om cellen är tom, eller om den redan har en annan hint
			// så vill vi köra rätt funktion
			// true betyder att det är en hint och ska därför inte
			// uppdatera poängen. Det kollas i varje funktion
			if($(cell).text().length < 1 || $(cell).hasClass('hint')){
				switch(prop){
			      	case 'ones': 
				        this.calcOnesToSixes(dices,1,true);
			        	break;
			        case 'twos': 
			        	this.calcOnesToSixes(dices,2,true);
			        	break;
			        case 'threes': 
				        this.calcOnesToSixes(dices,3,true);
			        	break;
			        case 'fours': 
			        	this.calcOnesToSixes(dices,4,true);
			        	break;  
			        case 'fives': 
			        	this.calcOnesToSixes(dices,5,true);
			        	break;
			        case 'sixes': 
				        this.calcOnesToSixes(dices,6,true);
			        	break;
			        case 'onePair':
			        	this.calcPair(dices, true);
			        	break;  
			        case 'twoPairs': 
			        	this.calcTwoPairs(dices, true);
			        	break;
			        case 'threeOfAKind':
			        	this.calcXOfAKind(dices, 3, true);
			        	break;
			        case 'fourOfAKind':
			        	this.calcXOfAKind(dices, 4, true);
			        	break;
			        case 'fullHouse':
			        	this.calcFullHouse(dices,3,2, true);
			        	break;
			        case 'smallStraight':
			        	this.calcSmallStraight(dices, true);
			        	break;
			        case 'largeStraight':
			        	this.calcLargeStraight(dices, true);
			        	break;
			        case 'chance':
			        	this.calcChance(dices, true);
			        	break;
			        case 'yatzy':
				        this.calcXOfAKind(dices, 5, true);
				        break;
			      	default:
			        	//console.log('Default');
      			}
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


	calcOnesToSixes(dices, number, isHint){
		let prop = '';
		let sum = 0;
		for(let dice of dices){
			if(dice.value === number)
			  {			  	
			  	sum += dice.value;
			  }
		}

		switch(number){
			case 1:
				prop = 'ones';
				break;
			case 2:
				prop = 'twos';
				break;
			case 3:
				prop = 'threes';
				break;
			case 4: 
				prop = 'fours';
				break;
			case 5:
				prop = 'fives';
				break;
			case 6:
				prop = 'sixes';
				break;
			default:
				console.log('Something went wrong..');
		}

		// Är det en hint eller ej?
		if(isHint){
			this.showHint(prop, sum);
		}else{
			this.setPoints(prop, sum);
		}
		//console.log('Sum of dices: ' + sum);
	}

	calcSumOfOnesToSixes(){
		let sum = 0;
		sum = this.ones + this.twos + this.threes + this.fours + this.fives + this.sixes;
		this.setPoints('sum', sum);
		this.calcBonus(sum);
		//console.log(this.testing);
		this.testing++;
	}

	// Sätter bonus till -63 till att börja med,
	// sen adderar man summan från 1-6-raderna för att visa
	// hur långt ifrån bonusen man är
	calcBonus(sum){
		let bonus = -63;
		if(sum > 62){
			bonus = 50;
		}
			else if(this.testing === 5){
				bonus = 0;
			}
		else{
			bonus += sum;
		}
		this.setPoints('bonus', bonus);
	}

	calcXOfAKind(dices, val, isHint){
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
		if(isHint){
			this.showHint(prop, sum);
		}else{
			this.setPoints(prop, sum);
		}
	}

	calcChance(dices, isHint){
		let sum = 0;
		for(let dice of dices){
			sum += dice.value;
		}
		if(isHint){
			this.showHint('chance', sum);
		}else{
			this.setPoints('chance', sum);
		}
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

	calcPair(dices, isHint){
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
      if(isHint){
		this.showHint('onePair', sum);
	  }else{
    	this.setPoints('onePair', sum);
	  }
	}

	//A 2 pair function
   calcTwoPairs(dices, isHint){
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
   	if(isHint){
		this.showHint('twoPairs', totalSum);
	}else{
   		this.setPoints('twoPairs', totalSum);
   	}
   }


	calcSmallStraight(dices, isHint){
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
		if(isHint){
			this.showHint('smallStraight', sum);
		}else{
			this.setPoints('smallStraight', sum);
		}

	}

	calcFullHouse(dices,valOne,valTwo, isHint){

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
		if(isHint){
			this.showHint('fullHouse', sum);
		}else{
			this.setPoints('fullHouse', sum);
		}
	}
	calcLargeStraight(dices, isHint){
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
			if(isHint){
				this.showHint('largeStraight', sum);
			}else{
				this.setPoints('largeStraight', sum);
			}
	}




	// Kan användas för att uppdatera DOM:en så att den skriver ut aktuella värden
	updateScores(){
		for(let prop in this){
			$(`.${this.playerName}.${prop}-cell`).html(this[prop]);
		}
	}

	// Skriver ut en hint och lägger på classen hint
	showHint(prop, val){
		$(`.${this.playerName}.${prop}-cell`).html(val);
		$(`.${this.playerName}.${prop}-cell`).addClass('hint');
	}

	// Tar in värdet och propertyn som ska uppdateras
	// Uppdaterar både objektet och DOM:en
	setPoints(prop, val){
		this[prop] = val;		
		$(`.${this.playerName}.${prop}-cell`).html(this[prop]);
		
		// Bonus, sum och total kommer uppdateras flera gånger under spelet,
		// men eftersom de inte finns första gången (förutom bonus) så kan vi inte
		// använda update, så vi tar bort raderna istället och skriver in dem igen
      if(prop === 'bonus' || prop === 'sum' || prop === 'total'){
      	$.ajax({
        type: 'POST',
        url: '/queries/delete-game-row',
        data: JSON.stringify([this.playerName, prop]),
        dataType:"json",
        contentType: "application/json",
        processData: false    
        }).done(function(){
          //console.log('Deleted a row in db');
        });
      }

      // Skriver en ny rad till current_game, med username, row och score
      $.ajax({
        type: 'POST',
        url: '/queries/insert-game-row',
        data: JSON.stringify([this.playerName, prop, val]),
        dataType:"json",
        contentType: "application/json",
        processData: false    
      }).done(function(){
        //console.log('Done writing a row to db');
      });
	}
}








