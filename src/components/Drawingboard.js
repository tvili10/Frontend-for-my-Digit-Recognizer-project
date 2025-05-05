import { useState } from 'react';
import "../styles/drawingboardstyle.css";

function Drawingboard(props) {
    const _board = props.board;
    const _size = _board.SIZE;

    const [_isDrawing, setIsDrawing] = useState(false);
    const [_grid, setGrid] = useState(Array(_size).fill().map(() => Array(_size).fill(0)));

    const [_currentColor, setCurrentColor] = useState("burlywood");
    const [_colors, setColors] = useState([
        {
            color: "burlywood",
            isSelected: true
        },
        {
            color: "Tomato",
            isSelected: false
        },
        {
            color: "orange",
            isSelected: false
        },
        {
            color: "Goldenrod",
            isSelected: false
        },
        {
            color: "Peru",
            isSelected: false
        },
        {
            color: "indianred",
            isSelected: false
        }
    ])

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

    const handleColorClick = (color) => {
        setColors(prevColors =>
            prevColors.map(c => ({
                ...c,
                isSelected: c.color === color
            }))
        );
        setCurrentColor(color);
        clearBoard();
    }

    return (
        <div draggable="false">
            <div className='color-container'>
                {_colors.map((color, index) => (
                    <div key={index} className={color.isSelected ? "color-box selected" : "color-box"} style={{ backgroundColor: color.color }} onClick={() => (handleColorClick(color.color))}></div>
                ))}
            </div>
            <table className="drawingboard" draggable="false" onMouseUp={handleMouseUp} >
                <tbody draggable="false">
                    {Array.from({ length: _size }, (_, i) => (
                        <tr key={i} draggable="false">
                            {Array.from({ length: _size }, (_, j) => (
                                <td
                                    key={j}
                                    onMouseDown={() => handleMouseDown(i, j)}
                                    onMouseEnter={() => handleCellEnter(i, j)}
                                    style={{ backgroundColor: _grid[i][j] > 0 ? _currentColor : "", opacity: _grid[i][j] ? _grid[i][j] : 1 }}
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
