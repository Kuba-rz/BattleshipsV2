const battleshipsGame = require('../src/gameClass')

test('The game should exist', () => {
    const battleships = new battleshipsGame
})

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

test('We should be able to create a battleship ship on the grid', () => {
    const battleships = new battleshipsGame
    battleships.createShip('battleship')
    const grid = battleships.returnGrid()

    console.log(grid)
})