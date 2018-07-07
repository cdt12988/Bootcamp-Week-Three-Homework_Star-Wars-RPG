/*
var quiGon = {
	name: 'qui-Gon Jinn',
	hp: 132,
	ap: 8,
	def: 6,
	currentHP: 132,
	currentAP: 8,
	counterAttack: 0
}
var obiWan = {
	name: 'obi Wan Kenobi',
	hp: 94,
	ap: 8,
	def: 6,
	currentHP: 94,
	currentAP: 8
}
var luke = {
	name: 'Luke Skywalker',
	hp: 75,
	ap: 12,
	def: 4,
	currentHP: 75,
	currentAP: 12
}
var yoda = {
	name: 'Yoda',
	hp: 120,
	ap: 8,
	def: 5,
	currentHP: 120,
	currentAP: 8
}
var rey = {
	name: 'Rey',
	hp: 88,
	ap: 9,
	def: 4,
	currentHP: 88,
	currentAP: 9
}
var darthMaul = {
	name: 'Darth Maul',
	hp: 75,
	ap: 9,
	def: 6,
	currentHP: 75,
	currentAP: 9
}
var countDooku = {
	name: 'Count Dooku',
	hp: 153,
	ap: 7,
	def: 6,
	currentHP: 153,
	currentAP: 7
}
var darthVader = {
	name: 'Darth vader',
	hp: 85,
	ap: 9,
	def: 6,
	currentHP: 85,
	currentAP: 9
}
var darthSidious = {
	name: 'Darth Sidious',
	hp: 96,
	ap: 10,
	def: 5,
	currentHP: 96,
	currentAP: 10
}
var kyloRen = {
	name: 'Kylo Ren',
	hp: 80,
	ap: 9,
	def: 5,
	currentHP: 80,
	currentAP: 9
}
*/

var quiGon = {
	name: 'qui-Gon Jinn',
	hp: 1188,
	ap: 51,
	def: 108,
	currentHP: 1188,
	currentAP: 51,
}
var obiWan = {
	name: 'obi Wan Kenobi',
	hp: 984,
	ap: 72,
	def: 72,
	currentHP: 984,
	currentAP: 72
}
var luke = {
	name: 'Luke Skywalker',
	hp: 754,
	ap: 123,
	def: 41,
	currentHP: 754,
	currentAP: 123
}
var yoda = {
	name: 'Yoda',
	hp: 1234,
	ap: 82,
	def: 51,
	currentHP: 1234,
	currentAP: 82
}
var rey = {
	name: 'Rey',
	hp: 932,
	ap: 92,
	def: 53,
	currentHP: 932,
	currentAP: 92
}
var darthMaul = {
	name: 'Darth Maul',
	hp: 761,
	ap: 100,
	def: 67,
	currentHP: 761,
	currentAP: 100
}
var countDooku = {
	name: 'Count Dooku',
	hp: 1530,
	ap: 57,
	def: 76,
	currentHP: 1530,
	currentAP: 51
}
var darthVader = {
	name: 'Darth vader',
	hp: 855,
	ap: 108,
	def: 61,
	currentHP: 855,
	currentAP: 108
}
var darthSidious = {
	name: 'Darth Sidious',
	hp: 961,
	ap: 100,
	def: 55,
	currentHP: 961,
	currentAP: 100
}
var kyloRen = {
	name: 'Kylo Ren',
	hp: 808,
	ap: 94,
	def: 69,
	currentHP: 808,
	currentAP: 94
}


var selectedChar = '';
var allChars = ['quiGon', 'obiWan', 'luke', 'yoda', 'rey', 'darthMaul', 'countDooku', 'darthVader', 'darthSidious', 'kyloRen'];
var enemies = [];
var currentEnemies = [];
var enemiesDefeated = [];
var selectedEnemy = '';
var message = '';
var gameState = 'choose-character';
var round = 1;
var dmgDealt = 0;
var dmgReceived = 0;

	// Logs game data
function logData() {
	if(selectedChar != '') {
		console.log('Selected Character: ' + selectedChar + '; HP: ' + eval(selectedChar).currentHP + '; AP: ' + eval(selectedChar).currentAP);
	} else {
		console.log('Selected Character: ' + selectedChar);
	}
	console.log('Enemies: ' + enemies);
	console.log('Current Enemies: ' + currentEnemies);
	if(selectedEnemy != '') {
		console.log('Selected Enemy: ' + selectedEnemy + '; HP: ' + eval(selectedEnemy).currentHP + '; AP: ' + eval(selectedEnemy).currentAP);
	} else {
		console.log('Selected Enemy: ' + selectedEnemy);
	}
	console.log('Enemies Defeated: ' + enemiesDefeated);
	console.log('Game Message: ' + message);
	console.log('Game State: ' + gameState);
	console.log('---------------------------------');
	$('#message').text(message);
}

	// Shuffles the order of all indexes within the array that is passed through
function shuffleArray(array) {
    for (var i = array.length-1; i > 0; --i) {
        // Select a random index 0 <= j <= i
        var j = Math.floor(Math.random() * (i+1));
        // Swap elements at i and j
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

	// Changes HP Displays
function displayHP() {
	$('#' + selectedChar + 'CurrHP').text('HP: ' + eval(selectedChar).currentHP);
	$('#' + selectedEnemy + 'CurrHP').text('HP: ' + eval(selectedEnemy).currentHP);
}

	// Game loss functions
function lose() {
	$('#attackButton').addClass('hidden');
	$('#newGameButton').removeClass('hidden');
	$('*[data-id="' + selectedChar + '"]').addClass('charDefeated');
}

	// Round win functions
function winRound() {
	$('#attackButton').addClass('hidden');
	
	var newDiv = $('<div>');
	newDiv.text(eval(selectedEnemy).name);
	$('.defeated-container').append(newDiv);
	newDiv.attr('class', 'defeated');
	
	enemiesDefeated.push(selectedEnemy);
	$('*[data-id="' + selectedEnemy + '"]').addClass('charDefeated');
	
	if(enemiesDefeated.length == 3 || enemiesDefeated.length == 6) {
		winLevel();
		message = 'You dealt ' + dmgDealt + ' damage and have defeated ' + eval(selectedEnemy).name + '! You have advanced to the next level! Now, choose your next enemy!';
	} else if(enemiesDefeated.length == 9) {
		winGame();
	} else {
		
		message += ' Choose your next enemy!';
		gameState = 'choose-enemy';
	}
}

	// Level win functions
function winLevel() {
	
	// Selects 3 new random enemies
	currentEnemies = [];
	shuffleArray(enemies)
	for(var i = 0; i < 3; i++) {
		shuffleArray(enemies);
		currentEnemies.push(enemies.pop());
	}
	
	// Shows the new enemies
	currentEnemies.forEach(function(enemy){
		$('*[data-id="' + enemy + '"]').removeClass('hidden');
	});
	
	// Repositions the new enemies
	for(var i = 0; i < currentEnemies.length; i++) {
		$('.' + currentEnemies[i]).addClass('enemy');
		$('.' + currentEnemies[i]).detach().appendTo('#enemy' + i);
	}
	
	// Change the game state
	gameState = 'choose-enemy';
	
}

	// Game win functions
function winGame() {
	message = 'You have defeated all enemies! You win!';
	$('#newGameButton').removeClass('hidden');
}

	// Sets the character select event listener and stores the selected character
$('.back').on('click', function() {
	selectedChar = $(this).attr('id');
// 	console.log(eval(selectedChar).name + ' HP: ' + eval(selectedChar).hp);

	// Stores the rest of the characters as enemies
	allChars.forEach(function(character) {
		if(character !== selectedChar) {
			enemies.push(character);
		}
	});
	
	// Selects 3 random enemies
	for(var i = 0; i < 3; i++) {
		shuffleArray(enemies);
		currentEnemies.push(enemies.pop());
	}
	
	// Hides the non-selected enemies
	enemies.forEach(function(enemy) {
		$('.' + enemy).addClass('hidden');
// 		$('#' + enemy).addClass('hidden');
	});
	
	// Removes the backs of each character card and their ability to flip
	allChars.forEach(function(character){
		$('#' + character).addClass('hidden');
		$('.flipper').removeClass('flipper');
	});
	
	// Repositions the selected character
// 	$('#' + selectedChar).addClass('hidden');
	$('.' + selectedChar).detach().appendTo('.selected-char');
	
	// Reposition the current enemies
/*
	currentEnemies.forEach(function(enemy) {
		$('.' + enemy).addClass('enemy');
		$('.' + enemy).detach().appendTo()
	});
*/
	for(var i = 0; i < currentEnemies.length; i++) {
		$('.' + currentEnemies[i]).addClass('enemy');
		$('.' + currentEnemies[i]).detach().appendTo('#enemy' + i);
	}
	
	// Shrinks the help icon
// 	$('.helpButton').addClass('shrink');
	
	// Change the game state
	gameState = 'choose-enemy';
	
	// Change message and log game data
	message = 'You have chosen ' + eval(selectedChar).name + '! Now choose your first enemy!';
	logData();
});




	// Sets the enemy select event listener
$('.character').on('click', function() {
	
	var tempClicked = $(this).attr('data-id');
	
	if(selectedEnemy != '' && tempClicked != selectedChar && tempClicked != selectedEnemy && gameState === 'choose-enemy') {
		$('*[data-id="' + selectedEnemy + '"]').addClass('hidden');
	}
	
	// Checks that 
	if(gameState === 'choose-enemy' && tempClicked !== selectedChar && tempClicked !== selectedEnemy) {
		selectedEnemy = $(this).attr('data-id');
		gameState = 'duel';
	
	// Reposition the selected enemy
		if(selectedEnemy != selectedChar) {
			$('.' + selectedEnemy).detach().appendTo('#currentEnemy');
		}
	
	// Show attack button
	$('#attackButton').attr('class', 'button');
	
	// Show HP displays
	$('#' + selectedChar + 'HP').attr('class', 'character-hp');
	$('#' + selectedEnemy + 'HP').attr('class', 'character-hp');
	displayHP();
	
	message = 'Round ' + round + ': ' + eval(selectedChar).name + ' vs ' + eval(selectedEnemy).name + '!';
	logData();
	
	}
	
});





	// Sets the attack button event listener
$('#attackButton').on('click', function() {
	
// 	var randomAtkMod = 0.5 + Math.random() * 3;

	var randomMod = 1.25 + Math.random() * 2.75;
	var counterAttack = Math.floor((eval(selectedEnemy).ap * randomMod));
	dmgDealt = (eval(selectedChar).currentAP - eval(selectedEnemy).def);
	dmgReceived = counterAttack - eval(selectedChar).def;
	
	if(dmgDealt < 0) {
		dmgDealt = 0;
	}
	if(dmgReceived < 0) {
		dmgReceived = 0;
	}
	
//	eval(selectedEnemy).currentHP -= (eval(selectedChar).currentAP - eval(selectedEnemy).def);
	eval(selectedEnemy).currentHP -= dmgDealt;
	
	
	if(eval(selectedEnemy).currentHP > 0) {
//		eval(selectedChar).currentHP -= Math.floor(((eval(selectedEnemy).ap * 2.5) - eval(selectedChar).def));
		eval(selectedChar).currentHP -= dmgReceived;
//		message = 'You attack ' + eval(selectedEnemy).name + ' for ' + (eval(selectedChar).currentAP - eval(selectedEnemy).def) + ' damage and take ' + Math.floor(((eval(selectedEnemy).ap * 2.5) - eval(selectedChar).def)) + ' damage in return!';
		message = 'You attack ' + eval(selectedEnemy).name + ' for ' + dmgDealt + ' damage and take ' + dmgReceived + ' damage in return!';
	} else {
		eval(selectedEnemy).currentHP = 0;
		message = 'You dealt ' + dmgDealt + ' damage and have defeated ' + eval(selectedEnemy).name + '!';
		round++;
		winRound();
	}
	
	if(eval(selectedChar).currentHP < 1) {
		eval(selectedChar).currentHP = 0;
		message = 'You suffered ' + dmgReceived + ' damage and have been defeated by ' + eval(selectedEnemy).name + '! Game over!';
		gameState = 'lose';
		lose();
	}
	
	displayHP();
	
	eval(selectedChar).currentAP += eval(selectedChar).ap;
	
	console.log('~~~~~~ Random Modifier: ' + randomMod + '~~~~~~');
	logData();
});




	// Sets the new game reset button event listener
$('#newGameButton').on('click', function() {
	location.reload();
});

	// Sets instructions event listener
$('.helpButton').on('click', function() {
	$('.instructions').toggleClass('hidden');
	$('.top-container').toggleClass('hidden');
	$('.mid-container').toggleClass('hidden');
	$('.bottom-container').toggleClass('hidden');
});

	// Sets back button event listener
$('.backButton').on('click', function() {
	$('.instructions').toggleClass('hidden');
	$('.top-container').toggleClass('hidden');
	$('.mid-container').toggleClass('hidden');
	$('.bottom-container').toggleClass('hidden');
});