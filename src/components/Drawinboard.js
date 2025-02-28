import { useState } from 'react';
import "../styles/drawingboardstyle.css";

function Drawingboard(props) {
    const b = props.board;
    const size = b.SIZE;

    const [isDrawing, setIsDrawing] = useState(false);
    const [grid, setGrid] = useState(Array(size).fill().map(() => Array(size).fill(0)));

    const handleMouseDown = (row, col) => {
        setIsDrawing(true);
        colorPixel(row, col);
    };

    const handleMouseUp = () => {
        setIsDrawing(false)
        b.drawingDone()
    };

    const handleCellEnter = (row, col) => {
        if (!isDrawing) return;
        colorPixel(row, col);
    };

    const colorPixel = (row, col) => {
        b.colorPixel(row, col);
        setGrid([...b.pixelsBrightness]);
    };

    const clearBoard = () => {
        b.restartDrawing();
        setGrid([...b.pixelsBrightness]);

    };

    b.addEventListener('sentData', () => {
        clearBoard();
    });

    return (
        <div

            draggable="false"
        >

            <table className="drawingboard" draggable="false" onMouseUp={handleMouseUp} >
                <tbody draggable="false">
                    {Array.from({ length: size }, (_, i) => (
                        <tr key={i} draggable="false">
                            {Array.from({ length: size }, (_, j) => (
                                <td
                                    key={j}
                                    onMouseDown={() => handleMouseDown(i, j)}
                                    onMouseEnter={() => handleCellEnter(i, j)}
                                    style={{ backgroundColor: grid[i][j] > 0 ? `burlywood` : "", opacity: grid[i][j] ? grid[i][j] : 1 }}
                                    draggable="false"   
                                ></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='btn-container'>
                <button className='clear-btn' onClick={clearBoard}>Clear!</button>
            </div>

        </div>
    );
}

export default Drawingboard;
