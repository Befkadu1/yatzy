class Dice {

	constructor(id = 0,value = 0,locked = false){
		this.id = id;
		this.value = value;
		this.locked = locked¨;
	}

	set value(value){
       this.value = value;
	}
	set locked(locking){
		this.locked = locking;
	}
       
}