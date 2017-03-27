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


		$(document).on('click', `tr td.${this.playerName}`, function(){

			console.log($(this).text());

			var row = $(this).parent().attr('class');
			console.log(row);

			if($(this).text() == ''){

				return row;

				
				
				/*switch(row){
					case 'ones': 
						this.calcOnes();
						break;
					case 'twos': 
						this.calcTwos();
						break;
					case 'threes': 
						this.calcThrees();
						break;
					default:
						console.log('Default');

				}
*/

			}

	  
		});


	}



	 calcOnes(){
		console.log('ETTOR');
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








