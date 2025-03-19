import React from 'react';
import Board from '../utils/Board';
import base_url from '../utils/base_url.js';
import Drawingboard from '../components/Drawinboard';
import "../styles/trainingstyle.css";



import { useState } from 'react';
function Training() {
  const B = new Board();


  

  const [labels, setLabels] = useState([
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
  const [labelByUser, setLabelByUser] = useState(null)


  const adjuctLabelClasses = (index) => {
    if(index === labelByUser) {
      resetLabelClasses()
      return
    }
    const newLabels = [...labels];
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
    const newLabels = [...labels];
    for (let i = 0; i < newLabels.length; i++) {
      newLabels[i].className = 'selectable-label';
    }
    setLabels(newLabels);
    setLabelByUser(null)
  }

  const handleSentData = async () => {
    console.log(B.pixelsBrightness)

    try {
      if (labelByUser == null) throw new Error()

      console.log(B.getBrightnessInOneDimArray())
      const response = await fetch(`${base_url}/addtrainingexample`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pixels: B.getBrightnessInOneDimArray(), label: labelByUser }),
      });

      console.log(response)




    } catch (e) {
      console.log("unable to send data")
    }

    B.sentData();
    resetLabelClasses();
  }

  return (
    <div>
      <Drawingboard board={B} />
      <h1 className='label-txt'>Label your training example!</h1>
      <div className='labels-container'>

        {labels.map((label, index) => {
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