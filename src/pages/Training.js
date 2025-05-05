import React from 'react';
import Board from '../utils/Board';
import base_url from '../utils/base_url.js';
import Drawingboard from '../components/Drawingboard.js';
import "../styles/trainingstyle.css";



import { useState } from 'react';
function Training() {
  const _board = new Board();




  const [_labels, setLabels] = useState([
    {
      num: 0,
      className: 'selectable-label',
    },
    {
      num: 1,
      className: 'selectable-label',
    }
    ,
    {
      num: 2,
      className: 'selectable-label',
    }
    ,
    {
      num: 3,
      className: 'selectable-label',
    }
    ,
    {
      num: 4,
      className: 'selectable-label',
    }
    ,
    {
      num: 5,
      className: 'selectable-label',
    }
    ,
    {
      num: 6,
      className: 'selectable-label',
    }
    ,
    {
      num: 7,
      className: 'selectable-label',
    }
    ,
    {
      num: 8,
      className: 'selectable-label',
    }
    ,
    {
      num: 9,
      className: 'selectable-label',
    }

  ]);
  const [_labelByUser, setLabelByUser] = useState(null)


  const adjuctLabelClasses = (index) => {
    if (index === _labelByUser) {
      resetLabelClasses()
      return
    }
    const newLabels = [..._labels];
    for (let i = 0; i < newLabels.length; i++) {
      if (i === index) {
        newLabels[i].className = 'selected-label';
      } else {
        newLabels[i].className = 'selectable-label';
      }
    }
    setLabels(newLabels);
    setLabelByUser(index)
  }

  const resetLabelClasses = () => {
    const newLabels = [..._labels];
    for (let i = 0; i < newLabels.length; i++) {
      newLabels[i].className = 'selectable-label';
    }
    setLabels(newLabels);
    setLabelByUser(null)
  }

  const handleSentData = async () => {
    console.log(_board.pixelsBrightness)

    try {
      if (_labelByUser == null) throw new Error()

      console.log(_board.getBrightnessInOneDimArray())
      const response = await fetch(`${base_url}/addtrainingexample`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pixels: _board.getBrightnessInOneDimArray(), label: _labelByUser }),
      });

      console.log(response)




    } catch (e) {
      console.log("unable to send data")
    }

    _board.sentData();
    resetLabelClasses();
  }

  return (
    <div>
      <Drawingboard board={_board} />
      <h1 className='label-txt'>Label your training example!</h1>
      <div className='labels-container'>

        {_labels.map((label, index) => {
          return <div key={index} className={label.className} onClick={() => adjuctLabelClasses(index)}>{label.num}</div>
        })}



      </div>

      <div className='send-btn-container'>
        <button onClick={handleSentData} className='send-btn'>Send training data</button>
      </div>

    </div>
  );
}

export default Training;