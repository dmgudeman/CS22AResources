'use strict'
function update() {
 
    // Get the two input numbers 
    var firstNumber = Number(document.getElementById('first').value);
    var secondNumber = Number(document.getElementById('second').value);
 
    // Then  compute the sum
    var myAnswer = firstNumber + secondNumber;
 
    // And write it in the 'answer' element 
    document.getElementById('answer').textContent = myAnswer;
}

function help() {
 
    // check that there is an answer currently displayed
    var currentAnswer = Number(document.getElementById('answer').textContent);
    if (currentAnswer) {
        document.getElementById('answer').textContent = 
            currentAnswer +
            '=' +
            document.getElementById('first').value +
            '+' + 
            document.getElementById('second').value;
    }
}
  
    
document.getElementById('first').addEventListener('input', update, false);
document.getElementById('second').addEventListener('input', update, false);
document.getElementById('answer').addEventListener('mouseover', help, false);
