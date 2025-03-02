import React from 'react';
import "../styles/infostyle.css"


function Info() {
  return (
    <div>
      <h1 className='title'>Welcome to my Digit recongizer project!</h1>
      <div className='section'>
        <h2 className='subtitle'>Motivation</h2>
        <hr className='subtitle-separator'/>
        <p className='subtitle-info'>During my <span className='highlighted-info'>university </span> studies,</p>

      </div>
    </div>
  );
}

export default Info;