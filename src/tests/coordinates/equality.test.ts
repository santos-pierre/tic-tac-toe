import Coordinates from '../../models/Coordinates';

test('Check if two coordinates are the same', () => {
    let coordinate1 = new Coordinates(0, 0);
    let coordinate2 = new Coordinates(0, 0);

    expect(coordinate1.equals(coordinate2)).toBeTruthy();
});

test('Check if two coordinates are different', () => {
    let coordinate1 = new Coordinates(0, 0);
    let coordinate2 = new Coordinates(1, 0);

    expect(coordinate1.equals(coordinate2)).toBeFalsy();
});
