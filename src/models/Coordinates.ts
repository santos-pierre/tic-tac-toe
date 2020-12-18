/**
 * Provides informations and methods for the coordinates in the game board.
 */

class Coordinates {
    private row: number;
    private col: number;

    /**
     * Constructs a coordinate with specified row and column.
     *
     * @param row the row of the coordinate
     * @param column the column of the coordinate
     */

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }

    /**
     * Get the value of row
     *
     * @return the value of row
     */
    getRow() {
        return this.row;
    }

    /**
     * Get the value of col
     *
     * @return the value of col
     */
    getCol() {
        return this.col;
    }

    /**
     * Tell us if a coordinate is equal to a coordinate reference.
     *
     * @param coordinate the coordinate you want to compare to the reference
     * @return Return true if the coordinate is the same as the reference
     */

    equals(coordinate: Coordinates) {
        return (
            this.row === coordinate.getRow() && this.col === coordinate.getCol()
        );
    }
}

export default Coordinates;
