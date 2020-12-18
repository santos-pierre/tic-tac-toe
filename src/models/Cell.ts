import PlayerShape from '../enum/PlayerShape';
import Coordinates from './Coordinates';

/**
 * Provides informations and methods for the cell in the game board. (extends the Coordinate)
 */

class Cell extends Coordinates {
    private content: undefined | PlayerShape;
    private isSelected: boolean;

    /**
     * Constructs a coordinate on the table,with specified row and column.
     *
     * @typeparam PlayerShape the different form that define the player
     *
     * @param row the row of the coordinate
     * @param column the column of the coordinate
     * @param content the content of the cell (default empty)
     * @param isSelected the status of the cell (default false)
     */

    constructor(
        row: number,
        col: number,
        content: PlayerShape | undefined = undefined,
        isSelected: boolean = false
    ) {
        super(row, col);
        this.content = content;
        this.isSelected = isSelected;
    }

    /**
     * Get the value of content
     *
     * @return the value of content
     */

    getContent() {
        return this.content;
    }

    /**
     * Get the value of isSelect
     *
     * @return the value of isSelect
     */

    getStatus() {
        return this.isSelected;
    }

    /**
     * Set the content and isSlected of a cell
     *
     * @typeparam PlayerShape the different form that define the player
     *
     */

    setCell(newContent: PlayerShape, newStatus: boolean) {
        this.content = newContent;
        this.isSelected = newStatus;
    }
}

export default Cell;
