/*
 * Virtual Pet App
 * David Gudeman
 * CS22
 */

'use strict';
// Here's the object oriented model implementation from a previous assignment
// DO NOT MODIFY THIS PART
// Create the pet protoptype
var pet = {
  hungry: true,
  ill: false,
  name: 'Your Pet'
};
pet.feed = function () {
  // The pet is no longer hungry.
  // Return a string indicating that the pet is full. 
  this.hungry = false;
  return this.name + ' is full.';
};
pet.newDay = function () {
  // Set ALL the boolean properties to true.
  // Return 'Good morning!'
  for (var prop in this) {
    if (typeof this[prop] === 'boolean') {
      this[prop] = true;
    }
  }
  return 'Good morning!';
};
pet.check = function () {
  // Check ALL the boolean properties of the pet object.
  // Return true if the pet needs attention.
  // Return false is the pet is fine.
  var result = false;
  for (var prop in this) {
    if (this[prop] === true) {
      result = true;
    }
  }
  return result;
};
// Create the fish prototype. 
var fish = Object.create(pet);
fish.clean = function () {
  // Set the object unhealthy property to false.    
  // Return a string of the form: 'pet name likes the clean tank.'
  this.ill = false;
  return this.name + ' likes the clean tank.';
};
// Create the dog prototype. 
var dog = Object.create(pet);
// initialize the lonely property
dog.lonely = false;
dog.walk = function () {
  // Set the object's unhealthy property to false.
  // Return a string of the form: 'pet name enjoyed the walk!'
  this.ill = false;
  return this.name + ' enjoyed the walk!';
};
dog.play = function () {
  // Set the object's lonely property to false.
  // Return a string of the form:  'pet name loves you.'
  this.lonely = false;
  return this.name + ' loves you.';
};
/*---------------------------------------------------------------------------------------------*/
// Do not modify anything above this line
// New code starts here
var feed = document.getElementById('feed'); 
var walk = document.getElementById('walk');
var play = document.getElementById('play');
var clean = document.getElementById('clean');

// These are the User Interface functions - the 'view'
function updateUI(species) {
  // Rearrange the images and the buttons to reflect the specific adoption
  document.getElementById('adopt').className = 'hide';
  if (species === 'dog') {
    document.getElementById('fish').className = 'disappear';
    play.className = '';
    walk.className = '';
  } else if (species === 'fish') {
    document.getElementById('dog').className = 'disappear';
    clean.className = '';
  }
  feed.className = '';
}

function updatePetUI(petObject, petSpecies) {
  // Check to see if the pet needs attention
  // Update the UI accordingly to show that.
  if (petObject.check()) {
    console.log(petObject);
    console.log(petSpecies);
    document.getElementById(petSpecies).className = 'move';
  } else {
    document.getElementById(petSpecies).className = '';
  }
}

function changeUIBackground() {
  // Initiate a background change 
  if (document.body.className === 'day') {
    document.body.className = 'night';
  } else if (document.body.className === 'night') {
    document.body.className = 'day';
  }

}
// This is the main function - it controls the app logic    
function adopt(event) {
  var myPet;    // this is the adopted pet object.
  var species = event.target.id; // the species of the adopted pet:  fish or dog?
  // Update the data model to reflect the adoption
  if (species === 'dog') {
    myPet = Object.create(dog);  //     
  } else if (species === 'fish') {
    myPet = Object.create(fish); 
  } else {  // enable future enhancements
    myPet = Object.create(pet);        
  }
  // disable further adoptions 
  document.getElementById('choice').removeEventListener('click', adopt, false);
  
  // Upate the UI
  updateUI(species);
  updatePetUI(myPet, species)
  // add an event listener for the action buttons.
  feed.addEventListener('click', function() {
    console.log(myPet);
    myPet.feed();
    updatePetUI(myPet, species);
  }, false);
  walk.addEventListener('click', function() {
    myPet.walk();
    updatePetUI(myPet, species);
  }, false);
  play.addEventListener('click', function() {
    myPet.play();
    updatePetUI(myPet, species);
  }, false);
  clean.addEventListener('click', function() {
    myPet.clean();
    updatePetUI(myPet, species);
  }, false);
  // Schedule a background change 
  var intervalUIBackground = setInterval(changeUIBackground, 30000);
  // Schedule a new day start
  var newDay = setInterval(function() {
    myPet.newDay();
    updatePetUI(myPet, species);
  }, 60000);

}

// main program starts here
// Register the pet adoption event handler on the element with id choice
document.getElementById('choice').addEventListener('click', adopt, false);