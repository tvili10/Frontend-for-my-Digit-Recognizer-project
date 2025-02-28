export default class Board extends EventTarget {

    constructor() {
        super();
        this.name = 1
        this.SIZE = 28;
        this.pixelsBrightness = Array(this.SIZE).fill().map(() => Array(this.SIZE).fill(0));
        this.drawEvent = new Event('changed');
        this.sentDataEvent = new Event('sentData');
    }


    colorPixel(row, col) {
        this.pixelsBrightness[row][col] = 1;
        this.colorSorroudningPixels(row, col);
    
    }

    colorSorroudningPixels(row, col) {
        this.pixelsBrightness[row][col] = 1;
        if (row > 0) this.pixelsBrightness[row - 1][col] = this.checkIfPixelIsBrighter(row - 1, col, Math.random());
        if (row < this.SIZE - 1) this.pixelsBrightness[row + 1][col] = this.checkIfPixelIsBrighter(row + 1, col, Math.random() );
        if (col > 0) this.pixelsBrightness[row][col - 1] = this.checkIfPixelIsBrighter(row, col - 1, Math.random() );
        if (col < this.SIZE - 1) this.pixelsBrightness[row][col + 1] = this.checkIfPixelIsBrighter(row, col + 1, Math.random() );
        
        // Color the corner pixels
        /*if (row > 0 && col > 0) this.pixelsBrightness[row - 1][col - 1] = this.checkIfPixelIsBrighter(row - 1, col - 1, Math.random() );
        if (row > 0 && col < this.SIZE - 1) this.pixelsBrightness[row - 1][col + 1] = this.checkIfPixelIsBrighter(row - 1, col + 1, Math.random() );
        if (row < this.SIZE - 1 && col > 0) this.pixelsBrightness[row + 1][col - 1] = this.checkIfPixelIsBrighter(row + 1, col - 1, Math.random() );
        if (row < this.SIZE - 1 && col < this.SIZE - 1) this.pixelsBrightness[row + 1][col + 1] = this.checkIfPixelIsBrighter(row + 1, col + 1, Math.random() );
    */
    }

  
    checkIfPixelIsBrighter(row, col, brightness) {
        return Math.max(this.pixelsBrightness[row][col], brightness);
    }

    getBrightnessInOneDimArray() {
        let brightness = [];
        for (let i = 0; i < this.SIZE; i++) {
            for (let j = 0; j < this.SIZE; j++) {
                brightness.push(this.pixelsBrightness[i][j]);
            }
        }
        return brightness; 
    }

    drawingDone() {
        this.dispatchEvent(this.drawEvent);
    }

    clear() {
        this.pixelsBrightness = Array(this.SIZE).fill().map(() => Array(this.SIZE).fill(0));
        
    }

    restartDrawing() {
        this.pixelsBrightness = null;
        this.dispatchEvent(this.drawEvent);
        this.clear();
    }

    sentData() {
        this.dispatchEvent(this.sentDataEvent);
    }

}