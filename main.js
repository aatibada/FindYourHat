const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(twoDimensionalArr) {
    this.field = twoDimensionalArr;
    //might not need lines 12 and 13 since they only find rows and columns which were being used to calc new loc
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
  //Returns the element at the proposed new location if it is within bounds
  move(direction) {  
    if (direction === 'u') {
      this.yCoor -= 1;
    } else if (direction === 'd') {
      this.yCoor += 1;
    } else if (direction === 'r') {
      this.xCoor =+ 1;
    } else if (direction === 'l') {
      this.xCoor =- 1;
    }
    // Check whether location is in bounds ** try..catch error handling may work here aswell
    if (this.yCoor < 0 || this.yCoor > (this.numOfRows - 1) || this.xCoor < 0 || this.xCoor > (this.numOfColumns - 1)) {
      console.log('You are out of bounds, please try again.')
    } else {
      return this.field[this.yCoor][this.xCoor];
    }
    //Changes selected element to path character: this.field[this.xCoor][this.yCoor] = '*';
  }
  
}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
  ['░', 'O', '░']
]);
// map = myField.print();
//console.log(map);
//console.log(myField.move(0, 'l'));
//const myMove = myField.move(0, 'd');
console.log(myField.field);
console.log(myField.move('u'));
console.log(myField.field);


/*currentLocation() {
  switch (loc) {
    case hat: 
      console.log('Congrats, You found the hat!');
      break;
    case hole:
      console.log('Whoops, you fell down a hole, please try again.');
      break;
    case fieldCharacter:
      this.move();
      break;
    case pathCharacter:
      console.log('You have already visited this space, please try again');
      break;
    default:
      console.log('You are out of bounds, please try again.');
  }
}
move() {
  let map = myField.print();
  let direction = prompt('Which way would you like to go? ');
  if (direction === r || direction === R) {
    
  }
}
gamePlay() {

}*/