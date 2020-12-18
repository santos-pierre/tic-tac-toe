import PlayerShape from '../../enum/PlayerShape';
import BoardGame from '../../models/BoardGame';
import Cell from '../../models/Cell';

test('Create board 3x3', () => {
    let board = new BoardGame();
    let expectedBoard = [
        [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)],
        [new Cell(1, 0), new Cell(1, 1), new Cell(1, 2)],
        [new Cell(2, 0), new Cell(2, 1), new Cell(2, 2)],
    ];
    expect(board.getBoard()).toEqual(expectedBoard);
});

test('Create board 4x4', () => {
    let board = new BoardGame(4);
    let expectedBoard = [
        [new Cell(0, 0), new Cell(0, 1), new Cell(0, 2), new Cell(0, 3)],
        [new Cell(1, 0), new Cell(1, 1), new Cell(1, 2), new Cell(1, 3)],
        [new Cell(2, 0), new Cell(2, 1), new Cell(2, 2), new Cell(2, 3)],
        [new Cell(3, 0), new Cell(3, 1), new Cell(3, 2), new Cell(3, 3)],
    ];
    expect(board.getBoard()).toEqual(expectedBoard);
});
