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
    let direction = prompt('Which direction would you like to move in? ');
    if (direction === 'u') {
      this.yCoor -= 1;
    } else if (direction === 'd') {
      this.yCoor += 1;
    } else if (direction === 'r') {
      this.xCoor =+ 1;
    } else if (direction === 'l') {
      this.xCoor =- 1;
    }
  }
  //Assesses whether proposed user direction results in win, loss, or continued gameplay
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
}

const myField = new Field([
  ['*', 'O', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
  ['░', 'O', '░']
]);

myField.play();
