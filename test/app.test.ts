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