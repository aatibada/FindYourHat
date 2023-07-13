const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(twoDimensionalArr) {
    this.field = twoDimensionalArr;
    this.numOfRows = this.field.length;
    this.numOfColumns = this.field[0].length;
    this.yCoor = 0;
    this.xCoor = 0;
  }
  //Returns constructed field map
  print() {
    const fieldMap = this.field.map(arr => arr.join('')).join('\n');
    return fieldMap; 
  }
  //Saves new user location 
  move() { 
    let direction = prompt('Which direction would you like to move in? ').toLowerCase();
    if (direction === 'u') {
      this.yCoor -= 1;
    } else if (direction === 'd') {
      this.yCoor += 1;
    } else if (direction === 'r') {
      this.xCoor += 1;
    } else if (direction === 'l') {
      this.xCoor -= 1;
    }
  }
  //Assesses whether saved user location results in win, loss, or continued gameplay
  testLocation() {
    if (this.yCoor < 0 || this.yCoor > (this.numOfRows - 1) || this.xCoor < 0 || this.xCoor > (this.numOfColumns - 1)) {
      return 'You are out of bounds, please try again.';
    }
    let currentLocationIcon = this.field[this.yCoor][this.xCoor];
    let result = 'limbo';
    if (currentLocationIcon === hat) {
      result = 'Congrats, you found the hat!';
    } else if (currentLocationIcon === hole) {
      result = 'Whoops, you fell down a hole, please try again.';
    } else if (currentLocationIcon === fieldCharacter) {
      this.field[this.yCoor][this.xCoor] = pathCharacter;
      result = 'limbo';
    } 
    return result;
  }
  // Gameplay loop 
  play() {
    console.log('Find the hat!');
    do {
      console.log(this.print());
      this.move();
      this.testLocation();
    } while (this.testLocation() === 'limbo');
    //Logs result when game is over
    console.log(this.testLocation());
  }
  //Generates a randomized field based on user input of height, width, and percentage of holes
  static generateField(height, width, pctOfHoles) {
    //Generates one large array with correct number of each character
    const rawElements = [];
    const neededElements = height * width;
    const neededHoles = Math.floor(neededElements * pctOfHoles);
    const neededFieldChar = neededElements - (2 + neededHoles);
    rawElements.push(pathCharacter);
    rawElements.push(hat);
    for (let createdHoles = 0; createdHoles < neededHoles; createdHoles++) {
      rawElements.push(hole);
    }
    for (let createdFieldChar = 0; createdFieldChar < neededFieldChar; createdFieldChar++) {
      rawElements.push(fieldCharacter);
    }
    //Generate one large randomized array
    const randomizedElements = [pathCharacter];
    rawElements.splice(0, 1);
    while (rawElements.length > 0) {
      let index = Math.floor(Math.random() * rawElements.length);
      randomizedElements.push(rawElements[index]);
      rawElements.splice(index, 1);
    }
    //Split array into 2 dimensional array
    const finalizedArr = [];
    while (finalizedArr.length < height) {
      finalizedArr.push(randomizedElements.slice(0, width));
      randomizedElements.splice(0, width); 
    }
    return finalizedArr;
  }
}

const myField = new Field(Field.generateField(6, 6, .3));

myField.play();
