

var inquirer = require('inquirer');

var BasicCard = require('./BasicCard.js')
var ClozeCard = require ('./ClozeCard.js')

var firstQuestion = new BasicCard("Who is the main protagonist of Final Fantasy VII?", 'Cloud Strife');
var secondQuestion = new BasicCard('How many copies of FF7 were sold in the first three days of release? (Rounded to the nearest million)', '2,000,000');
var thirdQuestion = new BasicCard('FF7 was the first Final Fantasy game to show what?', 'Blood');
var fourthQuestion = new BasicCard('What limitation of the N64 caused the game to be scrapped and moved to the PlayStation for release?', 'Memory');

var basicArray = [firstQuestion, secondQuestion, thirdQuestion, fourthQuestion]

var firstCloze = new ClozeCard('Cloud Strife is the main protagonist of Final Fantasy VII', 'Cloud Strife')
var secondcloze = new ClozeCard('Threeve is a combination of three and five', 'Threeve')
var thirdCloze = new ClozeCard('Alan Turing created his universal computation machine to run a code', 'a code')


var clozeArray = [firstCloze, secondcloze, thirdCloze]



function runGame() {

    inquirer.prompt([{
        type: 'list',
        name: 'cardChoice',
        message: 'What would you like to do?',
        choices: ["Basic Cards", "Cloze Cards", "Make my own card", "Quit"]
    }]).then(function(user) {

        switch (user.cardChoice){
            case 'Basic Cards':
                var nextQuestion = basicArray.pop()
                askQuestion(nextQuestion.getquestion(), nextQuestion.getanswer(), basicArray)
                break;

            case 'Cloze Cards':
                var nextQuestion = clozeArray.pop()
                askQuestion(nextQuestion.getquestion(), nextQuestion.getanswer(), clozeArray)
                break;

            case 'Make my own card':
                makeOwnCard();
                break; 

            case 'Quit':
                console.log('Goodbye')
                return;
                break;        

        } //closes switch case

    }).catch(function (){
    	console.log('Rejected')
    })
}

runGame()



function askQuestion(question, answer, aquestions){

    inquirer.prompt([{
        type: 'imput',
        name: 'answer',
        message: question

    }]).then(function(answers) {
        if (answers.answer !== answer) {
            console.log('That is not correct')
        } else {
            console.log('Correct!');
        }

        if (aquestions.length === 0){
            console.log('No more questions');
            runGame() 
        }

        var nextQuestion = aquestions.pop()

        askQuestion(nextQuestion.getquestion(), nextQuestion.getanswer(), aquestions)

    }).catch(function (){
        console.log('Rejected')
    })
}


function makeOwnCard() {
    inquirer.prompt([{
        type: 'list',
        name: 'makeCardChoice',
        message: 'What kind of card would you like to make?',
        choices: ["Basic Card", "Cloze Card"]
    }]).then(function(user) {
        if (user.makeCardChoice === 'Basic Card') {
            inquirer.prompt([{
                type: 'imput',
                name: 'writeQuestion',
                message: 'Type in your question.'
            }, {
                type: 'input',
                name: 'writeAnswer',
                message: 'Type the answer to your question.'
            }]).then(function(userQuestion) {
                basicArray.push(new BasicCard(userQuestion.writeQuestion, userQuestion.writeAnswer))
                runGame()
            })
        } else {
            inquirer.prompt([{
                type: 'imput',
                name: 'writeClozeQuestion',
                message: 'Type in your question.'
            }, {
                type: 'input',
                name: 'writeClozeAnswer',
                message: 'Type the text to be ommited.'
            }]).then(function(userClozeQuestion) {
                clozeArray.push(new ClozeCard(userClozeQuestion.writeClozeQuestion, userClozeQuestion.writeClozeAnswer))
                runGame()
            })
        }
    })
}