/**
 * Represents a drawing board with pixel brightness tracking capabilities.
 * @extends EventTarget
 */
export default class Board extends EventTarget {
    /**
     * Creates a new Board instance.
     */
    constructor() {
        super();
        this.SIZE = 28;
        this.pixelsBrightness = this.createEmptyBoard();
        this.drawEvent = new Event('changed');
        this.sentDataEvent = new Event('sentData');
        this.clearedEvent = new Event('cleared');
    }

    /**
     * Creates an empty board with all pixels set to 0 brightness.
     * @returns {number[][]} A 2D array representing the empty board
     */
    createEmptyBoard() {
        return Array(this.SIZE).fill().map(() => Array(this.SIZE).fill(0));
    }

    /**
     * Colors a pixel and its surrounding pixels at the specified coordinates.
     * @param {number} row - The row coordinate
     * @param {number} col - The column coordinate
     */
    colorPixel(row, col) {
        this.colorSurroundingPixels(row, col);
    }

    /**
     * Colors the surrounding pixels of a given coordinate with random brightness.
     * @param {number} row - The row coordinate
     * @param {number} col - The column coordinate
     */
    colorSurroundingPixels(row, col) {
        this.pixelsBrightness[row][col] = 1;

        const directions = [
            [row - 1, col], // up
            [row + 1, col], // down
            [row, col - 1], // left
            [row, col + 1]  // right
        ];

        for (const [newRow, newCol] of directions) {
            if (this.isValidPosition(newRow, newCol)) {
                this.pixelsBrightness[newRow][newCol] = this.checkIfPixelIsBrighter(
                    newRow,
                    newCol,
                    Math.random()
                );
            }
        }
    }

    /**
     * Checks if a position is valid on the board.
     * @param {number} row - The row coordinate
     * @param {number} col - The column coordinate
     * @returns {boolean} Whether the position is valid
     */
    isValidPosition(row, col) {
        return row >= 0 && row < this.SIZE && col >= 0 && col < this.SIZE;
    }

    /**
     * Returns the maximum brightness between current pixel brightness and new brightness.
     * @param {number} row - The row coordinate
     * @param {number} col - The column coordinate
     * @param {number} brightness - The new brightness value
     * @returns {number} The maximum brightness value
     */
    checkIfPixelIsBrighter(row, col, brightness) {
        return Math.max(this.pixelsBrightness[row][col], brightness);
    }

    /**
     * Converts the 2D brightness array into a 1D array.
     * @returns {number[]} Flattened array of brightness values
     */
    getBrightnessInOneDimArray() {
        return this.pixelsBrightness.flat();
    }

    /**
     * Signals that drawing is complete.
     */
    drawingDone() {
        this.dispatchEvent(this.drawEvent);
    }

    /**
     * Clears the board by setting all pixels to 0 brightness.
     */
    clear() {
        this.pixelsBrightness = this.createEmptyBoard();
    }

    /**
     * Restarts the drawing by clearing the board and dispatching the draw event.
     */
    restartDrawing() {
        this.clear();
        this.dispatchEvent(this.clearedEvent);
    }

    /**
     * Signals that data has been sent.
     */
    sentData() {
        this.dispatchEvent(this.sentDataEvent);
    }
}