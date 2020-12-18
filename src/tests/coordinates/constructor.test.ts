import Coordinates from '../../models/Coordinates';

test('Create coordinate (0,0)', () => {
    let coordinate = new Coordinates(0, 0);

    expect(coordinate.getRow()).toBe(0);
    expect(coordinate.getCol()).toBe(0);
});
