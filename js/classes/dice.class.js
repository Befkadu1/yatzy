class Dice {

	constructor(id = 0,value = 0,locked = false){
		this.id = id;
		this.value = value;
		this.locked = locked;
		this.setSymbol();
	}

	set val(value){
		this.value = value;
		this.setSymbol();
	}

	setSymbol(){
		switch(this.value){
			case 1:
				this.symbol = '&#9856;';
				break;
			case 2:
				this.symbol = '&#9857;';
				break;
			case 3:
				this.symbol = '&#9858;';
				break;
			case 4:
				this.symbol = '&#9859;';
				break;
			case 5:
				this.symbol = '&#9860;';
				break;
			case 6:
				this.symbol = '&#9861;';
				break;
			default:
				this.symbol = '	&#127922;';
		}
	}

	/*set value(value){
       this.value = value;
	}
	set locked(locking){
		this.locked = locking;
	}*/
       
}