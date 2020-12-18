import PlayerShape from '../../enum/PlayerShape';
import Cell from '../../models/Cell';

test('Create cell (0,0) not selected without content', () => {
    let cell = new Cell(0, 0);

    expect(cell.getCol()).toBe(0);
    expect(cell.getRow()).toBe(0);
    expect(cell.getContent()).toBe(undefined);
    expect(cell.getStatus()).toBeFalsy();
});

test('Create cell (1,1) with a cross for content', () => {
    let cell = new Cell(1, 1, PlayerShape.Cross, true);

    expect(cell.getCol()).toBe(1);
    expect(cell.getRow()).toBe(1);
    expect(cell.getContent()).toBe(PlayerShape.Cross);
    expect(cell.getStatus()).toBeTruthy();
});
