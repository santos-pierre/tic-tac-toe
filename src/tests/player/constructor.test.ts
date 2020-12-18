import PlayerShape from '../../enum/PlayerShape';
import Player from '../../models/Player';

test('Create player with name Georges form X', () => {
    let player = new Player('Georges', PlayerShape.Cross);

    expect(player.getName()).toBe('Georges');
    expect(player.getForm()).toBe('X');
});

test('Create player with name Georges form O', () => {
    let player = new Player('Georges', PlayerShape.Circle);

    expect(player.getName()).toBe('Georges');
    expect(player.getForm()).toBe('O');
});
