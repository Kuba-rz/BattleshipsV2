const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})

//Rows
const alph: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const emptyGrid: any[] = []



class BattleshipsGame {

    numberOfShips: number
    grid: any[]

    //Create a 10x10 grid
    constructor() {
        this.numberOfShips = 0

        for (let letter of alph) {
            const row: { square: string, status: string | boolean, shipName: boolean | string }[] = []
            for (let i = 1; i <= 10; i++) {
                row.push({ square: `${letter}${i}`, status: false, shipName: false })
            }
            emptyGrid.push(row)
        }
        this.grid = emptyGrid
    }

    //Return the grid for testing purposes
    returnGrid() {
        return this.grid
    }

    //Clear the whole grid to starting position
    clearGrid() {
        for (let i = 0; i < 10; i++) {
            for (let y = 0; y < 10; y++) {
                this.grid[i][y].status = false;
                this.grid[i][y].shipName = false
            }
        }
    }

    //Delete one ship from the grid
    clearShip(ship: string) {
        for (let i = 0; i < 10; i++) {
            for (let y = 0; y < 10; y++) {
                if (this.grid[i][y].shipName == ship) {
                    this.grid[i][y].status = false;
                    this.grid[i][y].shipName = false
                }
            }
        }
    }

    //Function to create a ship. 2 options available 'battleship' and 'destroyer'
    createShip = (shipName: string) => {
        this.numberOfShips += 1
        const rand: number = Math.floor(Math.random() * 2) + 1
        let size: number = 0
        let maxGridValue: number = 0
        //The maximum grid values depending on the size of the ship
        if (shipName.toLowerCase() == 'battleship') {
            size = 5
            maxGridValue = 5
        } else if (shipName.toLowerCase() == 'destroyer') {
            size = 4
            maxGridValue = 6
        } else {
            console.log('Please enter a valid ship name')
            return
        }

        if (rand === 1) {
            //Create a horizontal ship
            let column: number = Math.floor(Math.random() * 10)
            let row: number = 10
            while (row > maxGridValue) {
                column = Math.floor(Math.random() * 10)
                row = Math.floor(Math.random() * 10)

                if (row <= maxGridValue) {
                    for (let i = 0; i < size; i++) {
                        //If a ship is already present, clear the current ship and start from scratch
                        if (this.grid[column][row + i].status == true) {
                            this.clearShip(`${shipName}${this.numberOfShips}`)
                            row = 10
                            break
                        } else {
                            this.grid[column][row + i].status = true
                            this.grid[column][row + i].shipName = `${shipName}${this.numberOfShips}`
                        }
                    }
                }
            }
        } else {
            //Create a vertical ship
            let column: number = 10
            let row: number = Math.floor(Math.random() * 10)
            while (column > maxGridValue) {
                column = Math.floor(Math.random() * 10)
                row = Math.floor(Math.random() * 10)

                if (column <= maxGridValue) {
                    for (let i = 0; i < size; i++) {
                        if (this.grid[column + i][row].status == true) {
                            this.clearShip(`${shipName}${this.numberOfShips}`)
                            column = 10
                            break
                        } else {
                            this.grid[column + i][row].status = true
                            this.grid[column + i][row].shipName = `${shipName}${this.numberOfShips}`
                        }
                    }
                }
            }
        }
    }

    //Function to convert a letter which the user enters as the row, to a value which can be used to access the grid
    findRow(value: string) {
        try {
            if (value.length > 3 || (value.toUpperCase().charCodeAt(0) - 65) < 0 || (value.toUpperCase().charCodeAt(0) - 65) > 9) {
                return false
            } else {
                return value.toUpperCase().charCodeAt(0) - 65
            }
        } catch {
            return false
        }

    }

    //Function to check if the column entered by the user is acceptable
    findColumn(value: any) {
        var r = /\d+/;
        try {
            const row = value.match(r)[0] - 1
            if (row > 9 || row < 0) {
                return false
            } else {
                return row
            }
        } catch {
            return false
        }
    }

    //Function to check if a ship has been sunk, after each succesful ship
    checkForSink(ship: string | boolean) {
        const coordinates: { row: number, column: number }[] = []
        for (let i = 0; i < 10; i++) {
            for (let y = 0; y < 10; y++) {
                if (this.grid[i][y].shipName == ship && this.grid[i][y].status == 'hit') {
                    coordinates.push({ row: i, column: y })
                }
                else if (this.grid[i][y].shipName == ship && this.grid[i][y].status == true) {
                    return false
                }
            }
        }
        //Create a set out of the coordinataes array, which will eliminate any duplicate coordinates
        const unique: any[] = [...new Set(coordinates)]
        //Set a status of 'sank' to all squares in coordinatesS
        for (let coordinate of unique) {
            this.grid[coordinate.row][coordinate.column].status = 'sank'
        }
        return true
    }

    //Function to set the grid for testing purposes
    setNewGrid(grid: any[]) {
        this.grid = grid
        return
    }

    //After sinking a ship, check if game has been won
    checkForGameOver() {
        for (let i = 0; i < 10; i++) {
            for (let y = 0; y < 10; y++) {
                if (this.grid[i][y].shipName != false && this.grid[i][y].status != 'sank') {
                    return false
                }
            }
        }
        return true
    }

    async play() {
        console.log('***************************************************************')
        console.log('Please type in values in the following format: "A5"/"F8" etc...')
        console.log('Values from A-J and 1-10 are accepted')
        console.log('Type q to stop playing')
        console.log('***************************************************************')

        let gameOver: boolean = false
        let numberOfTries: number = 0

        while (!gameOver) {

            const asyncGridValue: any = new Promise((resolve, reject) => {
                readline.question(`Where do you want to attack? `, (gridAttackValue: string) => {
                    resolve(gridAttackValue)
                })
            })
            await asyncGridValue.then((gridAttackValue: string) => {
                if (gridAttackValue.toLowerCase() == 'q') {
                    gameOver = true;
                    process.exit()
                }

                numberOfTries += 1

                let row: number | boolean = this.findRow(gridAttackValue)
                let column: number | boolean = this.findColumn(gridAttackValue)

                //Check if the enterered row and column were filled in correctly
                if (row === false || column === false) {
                    console.log('')
                    console.log('Oooops, looks like something went wrong')
                    console.log('Please type in values in the following format: "A5"/"F8" etc...')
                    console.log('Values from A-J and 1-10 are accepted')
                    console.log('')
                    return
                }

                let square: { square: string, status: string | boolean, shipName: boolean | string } = this.grid[row][column]

                //Check if user has already attacked this square previously
                if (square.status != false && square.status != true) {
                    console.log('')
                    console.log('You have already attacked here!')
                    console.log(`The status of this square is: ${square.status}`)
                    console.log('')
                    return
                }

                //Miss
                if (square.status == false) {
                    console.log('You have missed! Try again')
                    this.grid[row][column].status = 'miss'

                    //Hit
                } else {
                    console.log('Nice aim! You have scored a hit')
                    this.grid[row][column].status = 'hit'
                    if (this.checkForSink(square.shipName)) {
                        console.log('And you have also sank the ship!')
                        console.log('')
                        if (this.checkForGameOver()) {
                            console.log('Congratulations, you have sank all the ships!')
                            console.log(`It took you ${numberOfTries} tries to finish the game!`)
                            console.log('')
                            gameOver = true
                            process.exit()
                        }
                    }
                }

            })

            console.log('')
        }
        return
    }
}

module.exports = BattleshipsGame