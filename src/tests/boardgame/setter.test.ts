import PlayerShape from '../../enum/PlayerShape';
import BoardGame from '../../models/BoardGame';
import Cell from '../../models/Cell';
import Coordinates from '../../models/Coordinates';

test('Set Cell (4,4) with content Cross', () => {
    let board = new BoardGame(5);

    expect(board.getCell(new Coordinates(4, 4))).toEqual(
        new Cell(4, 4, undefined, false)
    );

    board.setCell(new Coordinates(4, 4), PlayerShape.Cross, true);

    expect(board.getCell(new Coordinates(4, 4))).toEqual(
        new Cell(4, 4, PlayerShape.Cross, true)
    );
});

test('Set Cell (0,0) with content Circle', () => {
    let board = new BoardGame(5);

    expect(board.getCell(new Coordinates(0, 0))).toEqual(
        new Cell(0, 0, undefined, false)
    );

    board.setCell(new Coordinates(0, 0), PlayerShape.Circle, true);

    expect(board.getCell(new Coordinates(0, 0))).toEqual(
        new Cell(0, 0, PlayerShape.Circle, true)
    );
});
