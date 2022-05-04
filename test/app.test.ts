const battleshipsGame = require('../src/gameClass')


test('The game should create a grid to play on', () => {
    const battleships = new battleshipsGame

    expect(battleships.returnGrid())
})

test('We should be able to clear the grid to initial values', () => {
    const battleships = new battleshipsGame
    battleships.clearGrid()
    const grid = battleships.returnGrid()

    for (let i = 0; i < 10; i++) {
        for (let y = 0; y < 10; y++) {
            expect(grid[i][y].status).toBe(false)
            expect(grid[i][y].shipName).toBe(false)
        }
    }
})

test('We should be able to create a battleship on the grid', () => {
    const battleships = new battleshipsGame
    battleships.createShip('battleship')
    const grid = battleships.returnGrid()

    expect(grid).toEqual(
        expect.arrayContaining([
            expect.arrayContaining([
                expect.objectContaining({ shipName: 'battleship1' })])
        ])
    );
})

test('We should be able to create a destroyer on the grid', () => {
    const battleships = new battleshipsGame
    battleships.createShip('destroyer')
    const grid = battleships.returnGrid()

    expect(grid).toEqual(
        expect.arrayContaining([
            expect.arrayContaining([
                expect.objectContaining({ shipName: 'destroyer1' })])
        ])
    );
})

test('We should be able to create 2 destroyers on the grid', () => {
    const battleships = new battleshipsGame
    battleships.createShip('destroyer')
    battleships.createShip('destroyer')
    const grid = battleships.returnGrid()

    expect(grid).toEqual(
        expect.arrayContaining([
            expect.arrayContaining([
                expect.objectContaining({ shipName: 'destroyer1' })])
        ])
    );
    expect(grid).toEqual(
        expect.arrayContaining([
            expect.arrayContaining([
                expect.objectContaining({ shipName: 'destroyer2' })])
        ])
    );
})

test('We should be able to create 2 destroyers and 1 battleship on the grid', () => {
    const battleships = new battleshipsGame
    battleships.createShip('destroyer')
    battleships.createShip('destroyer')
    battleships.createShip('battleship')
    const grid = battleships.returnGrid()

    expect(grid).toEqual(
        expect.arrayContaining([
            expect.arrayContaining([
                expect.objectContaining({ shipName: 'destroyer1' })])
        ])
    );
    expect(grid).toEqual(
        expect.arrayContaining([
            expect.arrayContaining([
                expect.objectContaining({ shipName: 'destroyer2' })])
        ])
    );

    expect(grid).toEqual(
        expect.arrayContaining([
            expect.arrayContaining([
                expect.objectContaining({ shipName: 'battleship1' })])
        ])
    );
})

test('We should be able to clear a ship from the grid', () => {
    const battleships = new battleshipsGame
    battleships.createShip('battleship')
    battleships.clearShip('battleship1')

    const grid = battleships.returnGrid()

    expect(grid).not.toEqual(
        expect.arrayContaining([
            expect.arrayContaining([
                expect.objectContaining({ shipName: 'battleship1' })
            ])
        ])
    )
})

test('Entering a row as a letter, should return the correct index so that it can be used in an array', () => {
    const battleships = new battleshipsGame
    expect(battleships.findRow('C')).toEqual(2)
    expect(battleships.findRow('H')).toEqual(7)
    expect(battleships.findRow('M')).toEqual(false)
})

test('Entering a column, should return the correct number even if the string contains more than just one letter, and reject too large values', () => {
    const battleships = new battleshipsGame
    expect(battleships.findColumn('3')).toEqual(2)
    expect(battleships.findColumn('21')).toEqual(false)
    expect(battleships.findColumn('A7')).toEqual(6)
    expect(battleships.findColumn('B4B')).toEqual(3)
})


test('After hitting all of the grid coordinates for a ship, we should be able to sink it', () => {
    const battleships = new battleshipsGame
    battleships.createShip('battleship')
    expect(battleships.checkForSink('battleship1')).toEqual(false)

    let grid = battleships.returnGrid()
    for (let i = 0; i < 10; i++) {
        for (let y = 0; y < 10; y++) {
            if (grid[i][y].shipName == 'battleship1') {
                grid[i][y].status = 'hit'
            }
        }
    }
    battleships.setNewGrid(grid)
    expect(battleships.checkForSink('battleship1')).toEqual(true)
})


test('After sinking all of the ships, we should be able end the game', () => {
    const battleships = new battleshipsGame
    battleships.createShip('battleship')
    battleships.createShip('destroyer')
    battleships.createShip('destroyer')

    expect(battleships.checkForGameOver()).toEqual(false)

    let grid = battleships.returnGrid()

    for (let i = 0; i < 10; i++) {
        for (let y = 0; y < 10; y++) {
            if (grid[i][y].shipName == 'battleship1' || grid[i][y].shipName == 'destroyer3' || grid[i][y].shipName == 'destroyer2') {
                grid[i][y].status = 'sank'
                grid[i][y].shipName = false
            }
        }
    }
    console.log(grid)
    battleships.setNewGrid(grid)
    expect(battleships.checkForGameOver()).toEqual(true)

})


