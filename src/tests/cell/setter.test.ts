import PlayerShape from '../../enum/PlayerShape';
import Cell from '../../models/Cell';

test('Set cell (0,0) with a cross for content', () => {
    let cell = new Cell(0, 0);

    cell.setCell(PlayerShape.Cross, true);

    expect(cell.getCol()).toBe(0);
    expect(cell.getRow()).toBe(0);
    expect(cell.getContent()).toBe(PlayerShape.Cross);
    expect(cell.getStatus()).toBeTruthy();
});

test('Set cell (-1,-1) with a circle for content', () => {
    let cell = new Cell(-1, -1);

    cell.setCell(PlayerShape.Circle, true);

    expect(cell.getCol()).toBe(-1);
    expect(cell.getRow()).toBe(-1);
    expect(cell.getContent()).toBe(PlayerShape.Circle);
    expect(cell.getStatus()).toBeTruthy();
});
