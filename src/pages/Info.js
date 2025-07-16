import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import "../styles/infostyle.css"
import 'katex/dist/katex.min.css';
import trExample from '../imgs/tr-example.png';


 function Info()   {
    return (
    <div>
       
        <h1 className='title'>Welcome to my Digit Classifier project!</h1>
        <div className='section'>
            <h2 className='subtitle'>Motivation</h2>
            <hr className='subtitle-separator'/>
            <p className='subtitle-info'>One of my main interest lately has been <span className='highlighted-info'>Deep learning</span>. With this project I was able to get a deeper understanding behind the mathematics and the structure of <span className='highlighted-info'>Neural Networks</span>, 
            and how they can be applied to solve problems. This project specifically focuses on classifying handwritten digits
            </p>
        </div>  
        <div className='section'>
            <h2 className='subtitle'>About the Neural Network</h2>
            <hr className='subtitle-separator'/>
            <p className='subtitle-info'>

                Neural networks are function approximators that can be used to solve a wide range of problems. In my case, the <span className='highlighted-info'><InlineMath math={"h \\in \\mathbb{R}^{784} \\to \\mathbb{R}^{10} "}/></span> function that the network is trying approximate is the realtionship between the brightnesses of pixels in an image and the probability of each digit from 0 to 9 that the image represents. 
                The input vector's size is 784, beacuse the images are made out of 28x28 pixels and the output vector's size is 10, because there are 10 possible digits. 
                    
                <br/>
                <br/>
                The model was trained on a large dataset <span className='highlighted-info'>(called MNIST dataset)</span> containing input vector labeled with their correct output vector. 
                <span className='highlighted-info'><InlineMath math={"(x^{(1)}, y^{(1)}), \\ (x^{(2)}, y^{(2)}), \\  \\dots \\  , \\ (x^{(n)}, y^{(n)}) \\ "}/></span> 
                are called training examples. Using these examples, the network tries to learn the function that maps these input vectors to the output vectors: <span className='highlighted-info'><BlockMath math={"h(x) = \\hat{y} \\approx y \\\\  (\\hat{y}: \\text{actual output, } \\ y: \\text{correct output}) "}/></span>  
                <br/>
                <br/>
                <fieldset className='example-container'>
                    <legend>Example</legend>
                    <img className='tr-example-pic' src={trExample} alt="Training Example" />
                
                    <br/>

                    <span className='highlighted-info'> 
                        <BlockMath math={`784 \\begin{cases} {\\begin{bmatrix}  0 \\\\ 0 \\\\ \\vdots \\\\ 0.56 \\\\ 0.89 \\\\ 0.43 \\\\ \\vdots \\\\ 1 \\\\ 1 \\\\ \\vdots \\\\ 0 \\end{bmatrix}} \\end{cases} \\rightarrow \\ h  \\ \\rightarrow \\begin{bmatrix} 0.02 \\\\ 0.02  \\\\ 0.03 \\\\ 0.03 \\\\ 0.03 \\\\ 0.5 \\\\ 0.1 \\\\ 0.03 \\\\ 0.08 \\\\ 0.1   \\end{bmatrix} \\\\ y = \\begin{bmatrix} 0 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ 1 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ 0\\end{bmatrix}`} />
                    </span>


                </fieldset>
                
                In this completely made-up example, the network predicts that the digit is a 5 with a probability of 50%. During training our goal is adjust the parameters of the network in a way that next time our model sees a similar image, it will predict 5 with a higher probability.  
            </p>
            <h2 className='subtitle'>How does the network learn?</h2>
            <hr className='subtitle-separator'/>
            <p className='subtitle-info'>For the network to learn, we need to define a <span className='highlighted-info'>loss function</span> that will measure how good or bad the network is at predicting the correct output vector. 
            <span className='highlighted-info'>
                <BlockMath math={'L : \\theta \\to \\mathbb{R}'}/>
            </span>
            Where <span className='highlighted-info'><InlineMath math={"\\theta"} /></span> is a vektor that contains all the parameters of the network.
            During training we have to calculate the gradient of the loss function with respect to the parameters of the network:
            <span className='highlighted-info'>
                <BlockMath math={'\\nabla_{\\theta} L(\\theta)'}/>
            </span>
            This gradient will tell us in which direction we have to adjust the parameters of the network to minimize the loss function.
            <br/>
            <br/>
            </p>
        </div>
    </div>
);
};

export default Info;