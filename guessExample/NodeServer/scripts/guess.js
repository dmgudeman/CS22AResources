/*
 * Word Guessing Game
 * David Gudeman
 * CS22 Assignment 7
 */
'use strict';
// a container for the game, its variables and its methods.
var game = {
  answerPosition: 0,   // position of the current answer in the wordList - start at 0
  display: '',         // the current dash/guessed letters display - ex '-a-a--r--t'
  wrong: '',           // all the wrong letters guessed so far
  answer: '',          // the correct answer - one word from game.answersList
  wrongCount: 0,       // the number of wrong guesses so far
  over: false,         // is the game over?
  answersList: [       // list of answers to cycle through
    'JavaScript',
    'document',
    'element',
    'ajax',
    'jQuery',
    'event',
    'json',
    'listener',
    'transition',
    'window',
    'this',
    'that',
    'get'
  ]
};

// Initializes the game at the beginning or after restart
game.restart = function () {
    

    // the game variables (the model)
    game.display = '';
    // use modulo to allow list to cycle
    game.answerPosition = (game.answerPosition) % game.answersList.length;
    game.answer = game.answersList[game.answerPosition];
    game.display = game.dashes(game.answer.length);
    game.wrong = '';
    game.wrongCount = 0;
    game.over = false;
   
    // the web page (the view)
    $('#display').text(game.display);
    $('#wrong').text(game.wrong);
    $('progress').val(game.wrongCount);

    ++ game.answerPosition; //which word in the list
    // The focus method invoked on an input element allows the user to type in that input without having to click it.
    $('#guessedletter').focus();
};

// takes a number as a parameter
// and returns a string of dashes of number length
game.dashes = function (number) {
  for (var i = 0; i < number; i++) {
     game.display = game.display + '-';
  }
    return game.display;
};

// collects the input letter
// calls check to compare letter against the answer
// calls outcome to see if it causes a game end
game.play = function () {

  var letter = $('#guessedletter').val();
  
  check(game.answer, letter);
  game.outcome();
  $('#guessedletter').focus();
 }

// Invoked when the user clicks on GUESS
// takes in two parameters: answer and the guessed letter
// checks to see if input letter is in answer
//if input is empty do nothing, if already guessed right do nothing.
// if true replaces the appropriate dash in dashes string
// if false adds it to the guessed wrong letters 
function check (answer, letter){
  $('#guessedletter').val('');
  // helper function to construct updated dashes string
  String.prototype.replaceAt = function(index, character) {
    var str = this.substr(0, index) + character + this.substr(index+character.length);
    return str;
  }
  // local variables
  var position;
  var result = false;
  var lowerLetter = letter.toLowerCase()
  var lowerAnswer = answer.toLowerCase();
  
  //checks for null and game.over
  if (letter  && !game.over) {
    position = lowerAnswer.indexOf(lowerLetter); //converts to lowercase to compare
    
    if (position > -1){
      result = true;
    } else {
      game.wrong = game.wrong + letter; // adds wrong guess to wrong list
      $('#wrong').text(game.wrong); //updates view
      ++game.wrongCount // increments wrong count
      $('progress').val(game.wrongCount);//increments progress bar
      game.outcome(); // checks to see if game is over
    }
      result = false;
  }
  while (position >= 0) {

    game.display = game.display.replaceAt(position, answer.charAt(position));
    $('#display').text(game.display);//updates view
    position = answer.indexOf(letter, position + 1)//continues the search for duplicates
    game.outcome(); // checks to see if game is over
  }
};
 
// checks if the game is won or lost
game.outcome = function () {
  if (!game.over) {
    if (game.display === game.answer ) {
      $('#wrong').text("Congratulations! you win"); 
      game.over = true;
    }
    // if number of choices = 10  print out correct word and ask to play again.
    if (game.wrongCount >= 10) {
      $('#wrong').text("Sorry the word was " + game.answer + ". Play again?");
      game.over = true;
    }
  }
 
};
// Main program starts here
$(document).ready(function () {
   game.restart();
  $('#guessbutton').click(game.play);
  $('#restart').click(game.restart);
});

 