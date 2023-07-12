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
    this.xCoor = 0;
    this.yCoor = 0;
  }
  //Returns constructed field map
  print() {
    const fieldMap = this.field.map(arr => arr.join('')).join('\n');
    return fieldMap; 
  }
  //Calculates new location index based on user input [0][0]
  move(currentLocationIndex, direction) {  
    let newLocationIndex = currentLocationIndex;
    if (direction === 'u') {
      newLocationIndex = currentLocationIndex - (this.numOfColumns + 1);
    } else if (direction === 'd') {
      newLocationIndex = currentLocationIndex + (this.numOfColumns + 1);
    } else if (direction === 'r') {
      newLocationIndex = currentLocationIndex + 1;
    } else if (direction === 'l') {
      newLocationIndex = currentLocationIndex - 1;
    }
    return newLocationIndex;
  }
  updateMap(newLocationIndex) {
    let fieldMap = this.field.print();
    if (fieldMap[newLocationIndex] === fieldCharacter) {
      fieldMap.splice(newLocationIndex, 1, pathCharacter);
    }
    return fieldMap;
  }
}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
  ['░', 'O', '░']
]);
map = myField.print();
console.log(map);
console.log(myField.move(0, 'l'));
//const myMove = myField.move(0, 'd');
console.log(myField.field);
console.log(typeof(myField.field));
console.log(map.findIndex(arr => arr.));


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