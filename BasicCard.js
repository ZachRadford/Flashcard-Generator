

var BasicCard = function(front, back){
	this.front = front;
	this.back = back;
	this.getquestion = function(){
		return this.front;
	}

	this.getanswer = function(){
		return this.back;
	}
}



module.exports = BasicCard;