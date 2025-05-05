import { useState } from 'react';
import "../styles/drawingboardstyle.css";

function Drawingboard(props) {
    const _board = props.board;
    const _size = _board.SIZE;

    const [_isDrawing, setIsDrawing] = useState(false);
    const [_grid, setGrid] = useState(Array(_size).fill().map(() => Array(_size).fill(0)));

    const handleMouseDown = (row, col) => {
        setIsDrawing(true);
        colorPixel(row, col);
    };

    const handleMouseUp = () => {
        setIsDrawing(false)
        _board.drawingDone()
    };

    const handleCellEnter = (row, col) => {
        if (!_isDrawing) return;
        colorPixel(row, col);
    };

    const colorPixel = (row, col) => {
        _board.colorPixel(row, col);
        setGrid([..._board.pixelsBrightness]);
    };

    const clearBoard = () => {
        _board.restartDrawing();
        setGrid([..._board.pixelsBrightness]);

    };

    _board.addEventListener('sentData', () => {
        clearBoard();
    });

    return (
        <div draggable="false">

            <table className="drawingboard" draggable="false" onMouseUp={handleMouseUp} >
                <tbody draggable="false">
                    {Array.from({ length: _size }, (_, i) => (
                        <tr key={i} draggable="false">
                            {Array.from({ length: _size }, (_, j) => (
                                <td
                                    key={j}
                                    onMouseDown={() => handleMouseDown(i, j)}
                                    onMouseEnter={() => handleCellEnter(i, j)}
                                    style={{ backgroundColor: _grid[i][j] > 0 ? `burlywood` : "", opacity: _grid[i][j] ? _grid[i][j] : 1 }}
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
