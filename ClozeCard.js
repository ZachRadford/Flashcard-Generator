

var ClozeCard = function(fullText, cloze){
	this.cloze = cloze;
	this.fullText = fullText;
	this.partial = function(){
		var newString = fullText.replace(cloze, '...');
		return newString;
	}

	this.getquestion = function(){
		return this.partial();
	}

	this.getanswer = function(){
		return this.cloze;
	}
}

module.exports = ClozeCard;

// Allen turning created his universal computaitonal machine  ot run a code