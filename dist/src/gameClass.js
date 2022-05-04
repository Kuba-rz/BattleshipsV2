"use strict";
//Rows
const alph = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const emptyGrid = [];
class BattleshipsGame {
    numberOfShips;
    grid;
    //Create a 10x10 grid
    constructor() {
        this.numberOfShips = 0;
        for (let letter of alph) {
            const row = [];
            for (let i = 1; i <= 10; i++) {
                row.push({ square: `${letter}${i}`, status: false, shipName: false });
            }
            emptyGrid.push(row);
        }
        this.grid = emptyGrid;
    }
    //Return the grid for testing purposes
    returnGrid() {
        return this.grid;
    }
    //Clear the whole grid to starting position
    clearGrid() {
        for (let i = 0; i < 10; i++) {
            for (let y = 0; y < 10; y++) {
                this.grid[i][y].status = false;
                this.grid[i][y].shipName = false;
            }
        }
    }
    //Delete one ship from the grid
    clearShip(ship) {
        for (let i = 0; i < 10; i++) {
            for (let y = 0; y < 10; y++) {
                if (this.grid[i][y].shipName == ship) {
                    this.grid[i][y].status = false;
                    this.grid[i][y].shipName = false;
                }
            }
        }
    }
    //Function to create a ship. 2 options available 'battleship' and 'destroyer'
    createShip = (shipName) => {
        this.numberOfShips += 1;
        const rand = Math.floor(Math.random() * 2) + 1;
        let size = 0;
        let maxGridValue = 0;
        //The maximum grid values depending on the size of the ship
        if (shipName.toLowerCase() == 'battleship') {
            size = 5;
            maxGridValue = 5;
        }
        else if (shipName.toLowerCase() == 'destroyer') {
            size = 4;
            maxGridValue = 6;
        }
        else {
            console.log('Please enter a valid ship name');
            return;
        }
        if (rand === 1) {
            //Create a horizontal ship
            let column = Math.floor(Math.random() * 10);
            let row = 10;
            while (row > maxGridValue) {
                column = Math.floor(Math.random() * 10);
                row = Math.floor(Math.random() * 10);
                if (row <= maxGridValue) {
                    for (let i = 0; i < size; i++) {
                        //If a ship is already present, clear the current ship and start from scratch
                        if (this.grid[column][row + i].status == true) {
                            this.clearShip(`${shipName}${this.numberOfShips}`);
                            row = 10;
                            break;
                        }
                        else {
                            this.grid[column][row + i].status = true;
                            this.grid[column][row + i].shipName = `${shipName}${this.numberOfShips}`;
                        }
                    }
                }
            }
        }
        else {
            //Create a vertical ship
            let column = 10;
            let row = Math.floor(Math.random() * 10);
            while (column > maxGridValue) {
                column = Math.floor(Math.random() * 10);
                row = Math.floor(Math.random() * 10);
                if (column <= maxGridValue) {
                    for (let i = 0; i < size; i++) {
                        if (this.grid[column + i][row].status == true) {
                            this.clearShip(`${shipName}${this.numberOfShips}`);
                            column = 10;
                            break;
                        }
                        else {
                            this.grid[column + i][row].status = true;
                            this.grid[column + i][row].shipName = `${shipName}${this.numberOfShips}`;
                        }
                    }
                }
            }
        }
    };
    //Function to convert a letter which the user enters as the row, to a value which can be used to access the grid
    findRow(value) {
        try {
            if (value.length > 3 || (value.toUpperCase().charCodeAt(0) - 65) < 0 || (value.toUpperCase().charCodeAt(0) - 65) > 9) {
                return false;
            }
            else {
                return value.toUpperCase().charCodeAt(0) - 65;
            }
        }
        catch {
            return false;
        }
    }
    //Function to check if the column entered by the user is acceptable
    findColumn(value) {
        var r = /\d+/;
        try {
            const row = value.match(r)[0] - 1;
            if (row > 9 || row < 0) {
                return false;
            }
            else {
                return row;
            }
        }
        catch {
            return false;
        }
    }
    //Function to check if a ship has been sunk, after each succesful ship
    checkForSink(ship) {
        const coordinates = [];
        for (let i = 0; i < 10; i++) {
            for (let y = 0; y < 10; y++) {
                if (this.grid[i][y].shipName == ship && this.grid[i][y].status == 'hit') {
                    coordinates.push({ row: i, column: y });
                }
                else if (this.grid[i][y].shipName == ship && this.grid[i][y].status == true) {
                    return false;
                }
            }
        }
        //Create a set out of the coordinataes array, which will eliminate any duplicate coordinates
        const unique = [...new Set(coordinates)];
        //Set a status of 'sank' to all squares in coordinatesS
        for (let coordinate of unique) {
            this.grid[coordinate.row][coordinate.column].status = 'sank';
        }
        return true;
    }
    //Function to set the grid for testing purposes
    setNewGrid(grid) {
        this.grid = grid;
        return;
    }
    //After sinking a ship, check if game has been won
    checkForGameOver() {
        for (let i = 0; i < 10; i++) {
            for (let y = 0; y < 10; y++) {
                if (this.grid[i][y].shipName != false && this.grid[i][y].status != 'sank') {
                    return false;
                }
            }
        }
        return true;
    }
}
module.exports = BattleshipsGame;
