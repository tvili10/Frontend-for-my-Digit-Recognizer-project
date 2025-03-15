import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import "../styles/infostyle.css"
import 'katex/dist/katex.min.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import trExample from '../imgs/tr-example.png';


 function Info()   {
return (
    <div>
        <h1 className='title'>Welcome to my Digit recognizer project!</h1>
        <div className='section'>
            <h2 className='subtitle'>Motivation</h2>
            <hr className='subtitle-separator'/>
            <p className='subtitle-info'>One of my main interest lately has been <span className='highlighted-info'>Deep learning</span>. With this project I was able to get a deeper understanding behind the mathematics and the structure of <span className='highlighted-info'>Neural Networks</span>, 
            and how they can be applied to solve problems. This project specifically focuses on recognizing handwritten digits made out of 28x28 pixels. The model was trained on the MNIST dataset, which is a dataset of 60,000 training images and 10,000 testing images of handwritten digits.
            </p>
        </div>
        <div className='section'>
            <h2 className='subtitle'>About the Neural Network</h2>
            <hr className='subtitle-separator'/>
            <p className='subtitle-info'>

                The Neural network I implemented from scratch, using python and numpy is a <span className='highlighted-info'>Multi-layer perceptron (MLP)</span>  with an input layer, two hidden layers, and an output layer. 
                In my case the input vector is of size 784 (28x28 pixels), and the output vector is of size 10, representing the probabilty distribution of all digits from 0 to 9. The goal is to find a funtion that maximaze the probability of the correct digit and minimize the probability of the incorrect digits.
                <span className='highlighted-info'>
                    <BlockMath key="network-architecture" math={'x \\rightarrow \\ our \\ optimized \\ function \\ \\rightarrow  y \\\\ (x \\in \\mathbb{R}^{784} \\ , \\ \\text{ } y \\in \\mathbb{R}^{10})'} />
                   <BlockMath math={'(\\forall \\ i = \\ 1, \\ 2  \\dots 784 \\ :\\ x_i \\ is \\ the \\ brightness \\ of \\ the \\ pixel ) \\\\ (\\forall \\ j = \\ 1, \\ 2 \\dots 10 \\ : \\ y_j \\ is \\ the \\ probability \\ of \\ the \\ j-1th \\ digit)'} />
                    <BlockMath math={''} />
                    <BlockMath math={'(x_i \\ , y_j \\in [0,1])'} />
                </span>
                For a given example it looks something like this: 
                <br/>
                
                <img className='tr-example-pic' src={trExample} alt="Training Example" />
                
                <br/>

                <span className='highlighted-info'> 
                    <BlockMath math={`784 \\ \\begin{cases} \\begin{bmatrix}  0 \\\\ 0 \\\\ \\vdots \\\\ 0.56 \\\\ 0.89 \\\\ 0.43 \\\\ \\vdots \\\\ 1 \\\\ 1 \\\\ \\vdots \\\\ 0 \\end{bmatrix} \\end{cases} \\rightarrow \\ our \\ optimized \\ function \\ \\rightarrow \\begin{bmatrix} 0.02 \\\\ 0.02  \\\\ 0.03 \\\\ 0.03 \\\\ 0.03 \\\\ 0.5 \\\\ 0.1 \\\\ 0.03 \\\\ 0.08 \\\\ 0.1   \\end{bmatrix} `} />
                </span>
                In this completely made-up example, the network predicts that the digit is a 5 with a probability of 50%. During training our goal is adjust the parameters in a way that next time the network sees a similar image, it will predict 5 with a higher probability.  

                The network uses the leaky ReLU activation function, which is defined as :
                <span className='highlighted-info'>
                    <BlockMath key="leaky-relu" math={'f(x) = \\begin{cases} x, & \\text{if, } x > 0 \\\\ \\alpha x, & \\text{if, } x \\leq 0  \\end{cases}'} />
                    <BlockMath  math={'\\text{where } \\alpha \\in \\mathbb{R} \\text{ is a small constant}'} />
                </span>

                and is trained using backpropagation and gradient descent.
                The loss function used during backpropagation is the cross-entropy loss function, which, for a single training example is defined as : 
                
                <span className='highlighted-info'>
            
                    <BlockMath key="loss-equation" math={'L = - \\sum_{i =1}^{n} y_i \\log(\\hat{y_i})'} />
                </span>
                where <InlineMath key="yi" math={'y_i'} /> is the true label and <InlineMath key="yhati" math={'\\hat{y_i}'} /> is the predicted label and n is the number of possible classifications (in my case, 10). The reason for using the cross-entropy loss is that it is an optimal loss function for classification problems.
                
                
                <SyntaxHighlighter language="python" style={dracula} className='code-snippet'>
{`
import numpy as np
import random
from mnist.loader import MNIST
from MNIST_data_handler.database_manager import Database_Manager
import scipy.ndimage

class MultilayerPerceptron:
    def __init__(self, layers):
            self.weights = [np.random.randn(y, x) * np.sqrt(1.0 / x) for x, y in zip(layers[:-1], layers[1:])]
            self.biases = [np.random.randn(y, 1) for y in layers[1:]]

    def feed_forward(self, A):
            A = np.array(A).reshape(-1, 1)
            activations = [A]
            zValues = []
            for W, B in zip(self.weights, self.biases):
                    z = np.dot(W, A) + B
                    zValues.append(z)
                    A = relu(z)
                    activations.append(A)
            activations[-1] = np.exp(activations[-1]) / np.sum(np.exp(activations[-1]))
            return activations, zValues

    def train(self, X_train, Y_train, epochs=5):
            num_of_batches = round(len(X_train) / 16)
            for epoch in range(epochs):
                    print(f"Epoch {epoch + 1}/{epochs}")
                    batchSize = len(X_train) // num_of_batches
                    miniBatches = [(X_train[i * batchSize:(i + 1) * batchSize], 
                                    Y_train[i * batchSize:(i + 1) * batchSize]) 
                                 for i in range(num_of_batches)]
                    
                    for miniBatch in miniBatches:
                            self.mini_batch_gradient_update(miniBatch, learningRate=0.01)

    def mini_batch_gradient_update(self, miniBatch, learningRate):
            nabla_w = [np.zeros(w.shape) for w in self.weights]
            nabla_b = [np.zeros(b.shape) for b in self.biases]

            for x, y in zip(miniBatch[0], miniBatch[1]):
                    delta_nabla_w, delta_nabla_b = self.backpropagation(x, y)
                    nabla_w = [nw + dnw for nw, dnw in zip(nabla_w, delta_nabla_w)]
                    nabla_b = [nb + dnb for nb, dnb in zip(nabla_b, delta_nabla_b)]
            
            batch_size = len(miniBatch[0])   
            self.weights = [w - (learningRate * (nw / batch_size)) for w, nw in zip(self.weights, nabla_w)]
            self.biases = [b - (learningRate * (nb / batch_size)) for b, nb in zip(self.biases, nabla_b)]

    def backpropagation(self, x, y):
            nabla_w = [np.zeros(w.shape) for w in self.weights]
            nabla_b = [np.zeros(b.shape) for b in self.biases]

            activations, zs = self.feed_forward(x)
            outputLayer = np.zeros((activations[-1].shape[0], 1))
            outputLayer[y] = 1

            delta = (activations[-1] - outputLayer)
            nabla_b[-1] = delta
            nabla_w[-1] = np.dot(delta, activations[-2].T)

            for l in range(2, len(self.weights) + 1):
                    z = zs[-l]
                    delta = np.dot(self.weights[-l + 1].T, delta) * relu_derivative(z)
                    nabla_b[-l] = delta
                    nabla_w[-l] = np.dot(delta, activations[-l - 1].T)

            return (nabla_w, nabla_b)

    def test(self, X_test, Y_test):
            correct = 0
            for x, y in zip(X_test, Y_test):
                    activations, _ = self.feed_forward(x)
                    if np.argmax(activations[-1]) == y:
                            correct += 1
            print(f"Accuracy: {correct / len(X_test) * 100}%")

def relu(x):
    return np.maximum(1, x)

def relu_derivative(x):
    return np.where(x > 1, 1, 0)
`}
                </SyntaxHighlighter>


            </p>
         
        </div>
    </div>
);
};

export default Info;