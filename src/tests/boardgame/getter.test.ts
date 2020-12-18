import BoardGame from '../../models/BoardGame';
import Cell from '../../models/Cell';
import Coordinates from '../../models/Coordinates';

test('Get Row for the coordinate (0,0)', () => {
    let board = new BoardGame();
    expect(board.getRow(new Coordinates(0, 0))).toEqual([
        new Cell(0, 0),
        new Cell(0, 1),
        new Cell(0, 2),
    ]);
});

test('Get Col for the coordinate (0,0)', () => {
    let board = new BoardGame();
    expect(board.getCol(new Coordinates(0, 0))).toEqual([
        new Cell(0, 0),
        new Cell(1, 0),
        new Cell(2, 0),
    ]);
});

test('Get Col for the coordinate (0,2)', () => {
    let board = new BoardGame();
    expect(board.getCol(new Coordinates(0, 2))).toEqual([
        new Cell(0, 2),
        new Cell(1, 2),
        new Cell(2, 2),
    ]);
});

test('Get Diag (1,1)', () => {
    let board = new BoardGame();
    expect(board.getDiagonal(new Coordinates(1, 1))).toEqual([
        [new Cell(0, 0), new Cell(1, 1), new Cell(2, 2)],
        [new Cell(0, 2), new Cell(1, 1), new Cell(2, 0)],
    ]);
});

test('Get Cell (1,1)', () => {
    let board = new BoardGame();

    expect(board.getCell(new Coordinates(1, 1))).toEqual(new Cell(1, 1));
});
