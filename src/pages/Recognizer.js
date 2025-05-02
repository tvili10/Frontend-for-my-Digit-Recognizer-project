import React, { useState, useEffect, useMemo } from 'react';
import Drawingboard from '../components/Drawinboard';
import Board from '../utils/Board';
import base_url from '../utils/base_url.js';
import '../styles/recognizerstyle.css';

function Recognizer() {

  const [_prediction, setPrediction] = useState(null);
  const [_probabilities, setProbabilities] = useState([]);
  const [_isPorbablityChartOpen, setIsPorbablityChartOpen] = useState(false);

  const _board = useMemo(() => new Board(), [])




  useEffect(() => {



    const handlePrediction = async () => {
      try {
        const response = await fetch(`${base_url}/predict`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pixels: _board.getBrightnessInOneDimArray() }),
        });

        if (!response.ok) throw new Error('Failed to get prediction');

        

        const data = await response.json();
        setPrediction(data.prediction);


        const sortedProbabilities = Object.entries(data["prob-distribution"]);

        sortedProbabilities.sort((a, b) => b[1] - a[1]);
        setProbabilities(sortedProbabilities);
        setIsPorbablityChartOpen(false)
        console.log(_probabilities)
      } catch (error) {
        console.error('Error:', error);
        setPrediction(null)
      }
    };

    _board.addEventListener('changed', handlePrediction);


  }, [_board, _probabilities]);

  const handleProbabailtyChartClicked = () => {
    setIsPorbablityChartOpen(!_isPorbablityChartOpen);
  }

  return (
    <div>

      <div>
        <Drawingboard board={_board} />
        {_prediction !== null ? (
          <div>
            <p className='prediction-par'>
              <span className='highlighted'>Prediction: </span>
              <span className='predicted-number'>{_prediction}</span>
            </p>
            <hr className='separator' />
            <details className='prob-details'>
              <summary onClick={handleProbabailtyChartClicked}>Click to <span className='chartopened'>{_isPorbablityChartOpen ? "hide" : "see"}</span> probablty distribution</summary>
              <table className='prob-table'>
                <tbody>

                  {_probabilities.map(([label, prob]) => (
                    <tr key={label}>
                      <td className='label'>{label}</td>
                      <td className='prob'>{(prob * 100).toFixed(2)}%</td>
                    </tr>
                  ))}



                </tbody>

              </table>
            </details>
          </div>

        ) : (
          <p className='prediction-par'>Start drawing to see the prediction</p>
        )}
      </div>



    </div>
  );
}

export default Recognizer;
