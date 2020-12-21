import GameStatus from '../../enum/GameStatus';
import PlayerShape from '../../enum/PlayerShape';
import Cell from '../../models/Cell';
import Coordinates from '../../models/Coordinates';
import Game from '../../models/Game';
import Player from '../../models/Player';

test('Game 3x3 Player 1 diagonal win', () => {
    let game = new Game(3);

    // "X" play / Expect no winner / current player "O"
    game.playerAction(new Coordinates(0, 0));
    expect(game.getBoardGame().getCell(new Coordinates(0, 0))).toEqual(
        new Cell(0, 0, PlayerShape.Cross, true)
    );
    expect(game.getCurrentPlayer().getForm()).toBe(PlayerShape.Circle);
    expect(game.getWinner()).toBe(undefined);

    // "O" play / Expect no winner / current player "X"
    game.playerAction(new Coordinates(0, 1));
    expect(game.getBoardGame().getCell(new Coordinates(0, 1))).toEqual(
        new Cell(0, 1, PlayerShape.Circle, true)
    );
    expect(game.getCurrentPlayer().getForm()).toBe(PlayerShape.Cross);
    expect(game.getWinner()).toBe(undefined);

    // "X" play / Expect no winner / current player "O"
    game.playerAction(new Coordinates(1, 1));
    expect(game.getBoardGame().getCell(new Coordinates(1, 1))).toEqual(
        new Cell(1, 1, PlayerShape.Cross, true)
    );
    expect(game.getCurrentPlayer().getForm()).toBe(PlayerShape.Circle);
    expect(game.getWinner()).toBe(undefined);

    // "0" play / Expect no winner / current player "X"
    game.playerAction(new Coordinates(0, 2));
    expect(game.getBoardGame().getCell(new Coordinates(0, 2))).toEqual(
        new Cell(0, 2, PlayerShape.Circle, true)
    );
    expect(game.getCurrentPlayer().getForm()).toBe(PlayerShape.Cross);
    expect(game.getWinner()).toBe(undefined);

    // "X" play / Expect winner "X"
    game.playerAction(new Coordinates(2, 2));
    expect(game.getBoardGame().getCell(new Coordinates(2, 2))).toEqual(
        new Cell(2, 2, PlayerShape.Cross, true)
    );
    expect(game.getCurrentPlayer().getForm()).toBe(PlayerShape.Cross);
    expect(game.getWinner()).toEqual(new Player('Player 1', PlayerShape.Cross));
    expect(game.getGameStatus()).toEqual(GameStatus.END);
});

test('Game 3x3 Player 2 column win', () => {
    let game = new Game(3);

    // "X" play / Expect no winner / current player "O"
    game.playerAction(new Coordinates(1, 1));

    // "O" play / Expect no winner / current player "X"
    game.playerAction(new Coordinates(0, 0));
    expect(game.getBoardGame().getCell(new Coordinates(0, 0))).toEqual(
        new Cell(0, 0, PlayerShape.Circle, true)
    );
    expect(game.getCurrentPlayer().getForm()).toBe(PlayerShape.Cross);
    expect(game.getWinner()).toBe(undefined);

    // "X" play / Expect no winner / current player "O"
    game.playerAction(new Coordinates(0, 2));
    expect(game.getBoardGame().getCell(new Coordinates(0, 2))).toEqual(
        new Cell(0, 2, PlayerShape.Cross, true)
    );
    expect(game.getCurrentPlayer().getForm()).toBe(PlayerShape.Circle);
    expect(game.getWinner()).toBe(undefined);

    // "0" play / Expect no winner / current player "X"
    game.playerAction(new Coordinates(1, 0));
    expect(game.getBoardGame().getCell(new Coordinates(1, 0))).toEqual(
        new Cell(1, 0, PlayerShape.Circle, true)
    );
    expect(game.getCurrentPlayer().getForm()).toBe(PlayerShape.Cross);
    expect(game.getWinner()).toBe(undefined);

    // "X" play / Expect no winner / current player "O"
    game.playerAction(new Coordinates(2, 2));
    expect(game.getBoardGame().getCell(new Coordinates(2, 2))).toEqual(
        new Cell(2, 2, PlayerShape.Cross, true)
    );
    expect(game.getCurrentPlayer().getForm()).toBe(PlayerShape.Circle);
    expect(game.getWinner()).toBe(undefined);

    // "0" play / Expect winner "O"
    game.playerAction(new Coordinates(2, 0));
    expect(game.getBoardGame().getCell(new Coordinates(2, 0))).toEqual(
        new Cell(2, 0, PlayerShape.Circle, true)
    );
    expect(game.getCurrentPlayer().getForm()).toBe(PlayerShape.Circle);
    expect(game.getWinner()).toEqual(
        new Player('Player 2', PlayerShape.Circle)
    );
    expect(game.getGameStatus()).toEqual(GameStatus.END);
});

test('Game 3x3 draw', () => {
    let game = new Game(3);

    game.playerAction(new Coordinates(0, 0)); //X
    game.playerAction(new Coordinates(1, 1)); //O
    game.playerAction(new Coordinates(0, 2)); //X
    game.playerAction(new Coordinates(0, 1)); //O
    game.playerAction(new Coordinates(2, 1)); //X
    game.playerAction(new Coordinates(1, 2)); //O
    game.playerAction(new Coordinates(1, 0)); //X
    game.playerAction(new Coordinates(2, 0)); //O
    game.playerAction(new Coordinates(2, 2)); //X

    expect(game.getGameStatus()).toEqual(GameStatus.END);
    expect(game.getWinner()).toBe(undefined);
});

test('Game 3x3 negative diagonal', () => {
    let game = new Game(3);

    game.playerAction(new Coordinates(0, 0)); //X
    game.playerAction(new Coordinates(0, 2)); //O
    game.playerAction(new Coordinates(1, 0)); //X
    game.playerAction(new Coordinates(1, 1)); //O
    game.playerAction(new Coordinates(0, 1)); //X
    game.playerAction(new Coordinates(2, 0)); //O

    expect(game.getGameStatus()).toEqual(GameStatus.END);
    expect(game.getWinner()).toEqual(
        new Player('Player 2', PlayerShape.Circle)
    );
});

test('Game 4x4 Player 1 diagonal win', () => {
    let game = new Game(4);

    // "X" play / Expect no winner / current player "O"
    game.playerAction(new Coordinates(0, 0));
    expect(game.getBoardGame().getCell(new Coordinates(0, 0))).toEqual(
        new Cell(0, 0, PlayerShape.Cross, true)
    );
    expect(game.getCurrentPlayer().getForm()).toBe(PlayerShape.Circle);
    expect(game.getWinner()).toBe(undefined);

    // "O" play / Expect no winner / current player "X"
    game.playerAction(new Coordinates(0, 1));
    expect(game.getBoardGame().getCell(new Coordinates(0, 1))).toEqual(
        new Cell(0, 1, PlayerShape.Circle, true)
    );
    expect(game.getCurrentPlayer().getForm()).toBe(PlayerShape.Cross);
    expect(game.getWinner()).toBe(undefined);

    // "X" play / Expect no winner / current player "O"
    game.playerAction(new Coordinates(1, 1));
    expect(game.getBoardGame().getCell(new Coordinates(1, 1))).toEqual(
        new Cell(1, 1, PlayerShape.Cross, true)
    );
    expect(game.getCurrentPlayer().getForm()).toBe(PlayerShape.Circle);
    expect(game.getWinner()).toBe(undefined);

    // "0" play / Expect no winner / current player "X"
    game.playerAction(new Coordinates(0, 2));
    expect(game.getBoardGame().getCell(new Coordinates(0, 2))).toEqual(
        new Cell(0, 2, PlayerShape.Circle, true)
    );
    expect(game.getCurrentPlayer().getForm()).toBe(PlayerShape.Cross);
    expect(game.getWinner()).toBe(undefined);

    // "X" play / Expect winner "X"
    game.playerAction(new Coordinates(2, 2));
    expect(game.getBoardGame().getCell(new Coordinates(2, 2))).toEqual(
        new Cell(2, 2, PlayerShape.Cross, true)
    );

    // "0" play / Expect no winner / current player "X"
    game.playerAction(new Coordinates(0, 3));
    expect(game.getBoardGame().getCell(new Coordinates(0, 3))).toEqual(
        new Cell(0, 3, PlayerShape.Circle, true)
    );
    expect(game.getCurrentPlayer().getForm()).toBe(PlayerShape.Cross);
    expect(game.getWinner()).toBe(undefined);

    // "X" play / Expect winner "X"
    game.playerAction(new Coordinates(3, 3));
    expect(game.getBoardGame().getCell(new Coordinates(3, 3))).toEqual(
        new Cell(3, 3, PlayerShape.Cross, true)
    );

    expect(game.getCurrentPlayer().getForm()).toBe(PlayerShape.Cross);
    expect(game.getWinner()).toEqual(new Player('Player 1', PlayerShape.Cross));
    expect(game.getGameStatus()).toEqual(GameStatus.END);
});
