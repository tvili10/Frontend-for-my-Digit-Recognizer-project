import React from 'react';
import "../styles/infostyle.css"


function Info() {
  return (
    <div>
      <h1 className='title'>Welcome to my Digit recognizer project!</h1>
      <div className='section'>
        <h2 className='subtitle'>Motivation</h2>
        <hr className='subtitle-separator'/>
        <p className='subtitle-info'>During my university studies, I grew an interest towards <span className='highlighted-info'>Deep learning</span>. With this project I was able to get a deeper understanding behind the mathematics and the structure of <span className='highlighted-info'>Neural Networks</span>, and how they can be applied to solve problems. This project specifically focuses on recognizing handwritten digits using a neural network model trained on the MNIST dataset.
        </p>
      </div>
      <div className='section'>
        <h2 className='subtitle'>About the Neural Network</h2>
        <hr className='subtitle-separator'/>
        <p className='subtitle-info'>The Neural network I implemented from scratch is a multi-layer perceptron (MLP) with an input layer, one hidden layer, and an output layer. The network uses ReLU activation functions and is trained using backpropagation and gradient descent.</p>
      </div>
    </div>
  );
}

export default Info;