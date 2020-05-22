---
title: Harris Corner Detectors are Awesome!
date: 2020-11-25
---

# THIS PAGE IS NOT DONE BUT YEAH, soon ...

Today I want to talk about one of my favorite things I've learned from taking
[Computer Vision](http://16385.courses.cs.cmu.edu/fall2020/) this semester. I
would say Harris Corner Detectors are my favorite topic because there's a
*healthy* amount of math but it all comes together for a super elegant solution.

## Disclaimer

I know this isn't legally binding but if you're taking **16-385** now and you've
stumbled across this blog somehow and want to cheat know the following:

1. Please don't

I can't say much else. 

The code for Harris Corner Detectors is everywhere on the internet. These
concepts aren't super hard (if you're taking **16-385**). Because I'm not adding
too much more than other sources on the internet if someone is going to cheat
then they're going to cheat. I don't think I'm responsible for their decisions. 

The results and plots are mine to avoid plagiarising lecture slides (although
they are freely available online).

## Let's get the Math Aside

First we start with the mathematics. Buckle up because we're going to cover
quite a few subjects: 

### Problem Specification

Okay before we jump into the math we need lets start with the problem statement.
Let's attempt to mathematically define a corner. What is a corner? Well if we're
at a corner then we know it has a horizontal edge and a vertical edge. Therefore
if we move a window around it we expect a strong response. Mathematically we can
say that this is the following 

$$
E_w(u,v;x,y) = \sum_{s,t} w(s,t)[I(x-s+u,y-t+v) -I(x-s,y-t)]^2
$$

Let's break down what this equation is:

1. $w(s,t)$ is our window function
2. $I(x-s,y-t)$ is our original intensity
3. $[a-b]^2$ is our sum of squared differences. 
4. $I(x-s+u,y-t+v)$ is our shifted intensity

TODO: add visually what I'm talking about

Using a second order taylor expansion we can get the following (the proof will
be left as an excercise to the reader :) )

$$ 
E_w(u,v;x,y) = \begin{bmatrix}
        u & v 
        \end{bmatrix}
        \begin{bmatrix}
        \sum_{s,t} I_x^2(x-s,y-t) & \sum_{s,t} I_{xy}(x-s,y-t)\\
        \sum_{s,t} I_{xy}(x-s,y-t)& \sum_{s,t} I_y^2(x-s,y-t)
        \end{bmatrix}
        \begin{bmatrix}
        u \\ v
        \end{bmatrix}
$$

Now since we're going to eventually be doing this on a computer we want to make
this as few operations as possible. Therefore I'll propose one further step
which is the following 

$$
        \begin{bmatrix}
        \sum_{s,t} I_x^2(x-s,y-t) & \sum_{s,t} I_{xy}(x-s,y-t)\\
        \sum_{s,t} I_{xy}(x-s,y-t)& \sum_{s,t} I_y^2(x-s,y-t)
        \end{bmatrix}
        = 
        \sum_{s,t} w(s,t) 
        \begin{bmatrix}
        I_x^2 && I_xy \\
        I_xy && I_y^2 \\
        \end{bmatrix}
$$

Notice this matrix is diagonal. This will be important later.

### Fun with Matrices

**Note:** $\LaTeX$ **rendering is temperamental**

First we start with polynomials and their matrix representation. 

Consider the following:

$$f(x,y) = {x^2} + {y^2}$$

![Figure [Equation Plot]: ](../images/x2y2.png)

We can rewrite the above equation in matrix form as follows

$$ f(x,y) = \begin{bmatrix} x & y \end{bmatrix}  I_2 \begin{bmatrix}
x \\ y \end{bmatrix}$$ 

Why would we want to do that? Well, the reason is if we take the "coefficient
matrix" and get it's Singular Value Decomposition we see that the coefficient
matrix describes an ellipse. 

Recall the Singular Value Decomposition of a matrix is the following:

$$M = U \sum V^*$$


So in our case of an identity matrix it'd be 

$$
 \begin{bmatrix} 1 & 0 \\ 0 & 1\end{bmatrix} =
 \begin{bmatrix} 1 & 0 \\ 0 & 1\end{bmatrix} 
 \begin{bmatrix} 1 & 0 \\ 0 & 1\end{bmatrix} 
 \begin{bmatrix} 1 & 0 \\ 0 & 1\end{bmatrix}^T 
$$

Where we can think of the columns of our first matrix as the eigenvectors and
the diagonal of our second matrix as our eigenvalues. I say "we can think"
because generally these are psuedo eigenvectors and eigenvalues. The **SVD**
allows us to compute eigenvalues and vectors for matrices that otherwise might
not have them. This is super helpful is computer vision. Without going into too
much detail the solution to the equation $Ax=0$ is the eigenvector corresponding
to the small eigenvalue of the **SVD** of $A$. 


### Last Steps

We've now shown that our eigenvalues and vectors are equivalent to describing an
ellipse in 3d space. Because we want a corner we want as strong a 3d response as
possible.

We can think of our eigenvector test as follows:

1. $\lambda_1 >> \lambda_2$ vertical edge
2. $\lambda_2 >> \lambda_1$ horizontal edge
3. $\lambda_1 \sim \lambda_2$ corner
4. $\lambda_1 \sim \lambda_2 \sim 0$ flat region

There's a lot of "cornerness" tests but the one I'll be using is the following

$$R= \lambda_1 \lambda_2 - K(\lambda_1 + \lambda_2)^2$$

Where $k\in [0.04,0.06]$ and is a normalizing constant. See here for more.

Why is this test so powerful? Well recall that our matrix (also known as the
structural tensor in literature) is diagonal. This means its eigen values follow
along its diagonal. 

Therefore the above test is equivalent to 

$$R= determinant(M) - k\cdot trace(M)^2$$ 

Which we can really easily compute.

## Code 

### Code with minimal libraries
Here is code with minimal libraries. This code is fairly naive and as a result
slow. One improvement is that we can harness the distributive property of
convolutions. If you notice, we apply a gaussian kernel twice in the sobel
filters. The reason I kept this in is because I wanted each function to stand on
its own ie if you were calling `sobel_X` it should return the proper `sobel`
results.

If we wanted to make improvements we'd know that we eventually apply a smoothing kernel
at the very end and so we'd put off our gaussian blurring until then. This would
result in a few fewer convolutions and therefore a big time speedup.

Convolutions are by far the most expensive operation.


``` python 
import numpy as np
import cv2 as cv
from math import ceil
from scipy import signal

def myImageFilter(img0, h):
    """
    This function takes an image and a kernel and returns the convolution of
    them.  Note: the math in the for loop is actually perform correlation on a
    flipped kernel.
    """
    (length, width) = h.shape

    # check that the kernel is square and odd
    assert(length == width and (length % 2 == 1))

    # pad image to edges
    padded_im = np.pad(img0, ((width//2, width//2), 
        (length//2,length//2)), "edge") 

    # We only want to work on the padded pixels not the unpadded ones
    (orig_len, orig_width) = img0.shape
    new_img = np.empty([orig_len, orig_width], dtype=img0.dtype)

    # we want to flip the kernel to get convolution
    h = np.flip(h) 

    for i in np.arange(orig_len):
        for j in np.arange(orig_width):
            # this gets the slice of the 
            # padded array that is the size of the kernel 
            # whose center correspond to i,j in the image
            comp = padded_im[i:i+length,j:j+width] 
            new_img[i][j] = np.sum(h * comp)

    return new_img

def myGaussianKernel(sigma):
    """
    Returns a 2D gaussian kernel
    """
    hsize = 2 * ceil(3 * sigma) + 1
    gaussianWindow = signal.windows.gaussian(hsize, sigma)

    tmp_gaussian = gaussianWindow.copy() # makes a copy
    tmp_gaussian.resize([hsize,1]) #resizes

    # forms 2d matrix and normalizes values
    gaussianKernel = tmp_gaussian * gaussianWindow

    # to form the vector norm then take 1/sum if there are negative numbers
    # then take one over the sum of positive numbers
    gaussianKernel = (1/np.sum(gaussianKernel)) * gaussianKernel
    return gaussianKernel

def mySobelY(img0, sigma=2.4):
    """
    Calculates the y derivative of an image
    """
    gaussian = myGaussianKernel(sigma)
    sobel_y = np.array([[1,2,1],
                        [0,0,0],
                        [-1,-2,-1]])
    blurredImage = myImageFilter(img0, gaussian)
    return myImageFilter(blurredImage, sobel_y)

def mySobelX(img0, sigma=2.4):
    """
    Calculates the x derivative of an image
    """
    gaussian = myGaussianKernel(sigma)
    sobel_x = np.array([[1,0,-1],
                        [2,0,-2],
                        [1,0,-1]])
    blurredImage = myImageFilter(img0, gaussian)
    return myImageFilter(blurredImage, sobel_x)

def getkMaxVals(mat, k):
    """
    Gets the k max values in a tensor
    """
    # Partially sort the max values and get the k max indices
    indx = np.argpartition(-1 * mat.ravel(), k)[:k]
    # Reconstruct the original indices
    return np.column_stack(np.unravel_index(indx, mat.shape))


def myHarris(I, alpha, k=0.04, P=5):
    """
    My Harris Corner Detector
    """
    # If the image is in color conver it to grayscale
    if len(I.shape) == 3 and I.shape[2] == 3:
        I = cv.cvtColor(I, cv.COLOR_BGR2GRAY)
    # Scale to floats assuming input is of type int8
    if I.max() > 1.0:
        I = I / 255.0

    # Calculate derivatives
    dx = mySobelX(I)
    dy = mySobelY(I)

    # Convolution kernel (aka blurring)
    kernel = np.ones((P,P))

    # Note these aren't real eigen values
    eigen1 = (dx**2)
    eigen2 = (dy**2)

    # Calculate R score
    R = (eigen1* eigen2) - k * ((eigen1 + eigen2) ** 2)

    # Apply convolution
    points = myImageFilter(R, kernel)

    # Return max values
    return getkMaxVals(points, alpha), points
    
     
if __name__ == "__main__":
    # Import data
    from skimage import data
    # Import plotting library
    import matplotlib.pyplot as plt

    # Load an image
    I = data.astronaut()

    # Note p is not sorted
    p, R = myHarris(I, 100)
    fig, axis = plt.subplots(2)
    axis[0].imshow(I)
    # Remember x and y values are flipped
    # p rows are y values
    # p columns are x values
    axis[0].scatter(p[:,1],p[:,0])
    axis[1].imshow(R)
    plt.show()
```

![Figure [Harris Output]: ](../images/myHarris.png)

The bottom plot is a plot of the `R` test.

I would say the results are not bad. As you can see there's a lot of clustering
on the helmet and if you look at the `R` test plot that's where our strongest
results are. The reason this happens is we naively take the highest responses.
One solution to this problem would be to work on a lower resolution image. A
lower resolution means that we would've have fewer responses. 

The best solution is to use a technique called Non-maximal Supression. The idea
is simple. First we dilate. Dilation is defined as 


$$Dilate(x,y) = max(x + w_1, y +w_2)$$ 

Where $w_1,w_2$ are window sizes. The idea is that we set each pixel to the
maximum value in a window around it. You can read more about dilation
[here](https://docs.opencv.org/3.4/db/df6/tutorial_erosion_dilatation.html).

After dilating each pixel is set to its max neighbor. We then return 

```dilated(img) == orig_img```

The idea is that if a value was the maximum in its neighborhood in the original
image then it'll stay the same so the above equality would return true for that
pixel. If it wasn't, ie it got set to the maximum by the dilation operation then
that inequality will be false so it'll be set to 0. 

This  technique is commonly used to make thick lines pixel-width. 

### Code with some libraries and improvements

Here we use `corner_peaks` to perform Non-maximal Suppression.
We also use `opencv` to perform the sobel calculations.

``` python
import numpy as np
import cv2 as cv
from scipy import ndimage
from utils import imfilter
from skimage.feature import corner_peaks

def NMSmyHarris(I, alpha, k, P=5):
    # P defines the kernel size

    if len(I.shape) == 3 and I.shape[2] == 3:
        I = cv.cvtColor(I, cv.COLOR_RGB2GRAY)
    if I.max() > 1.0:
        I = I / 255.0

    # outputimage will have the same depth and type as source
    ddepth = -1

    dx = cv.Sobel(I, ddepth, 1, 0, ksize=P, borderType=cv.BORDER_DEFAULT)
    dy = cv.Sobel(I, ddepth, 0, 1, ksize=P, borderType=cv.BORDER_DEFAULT)

    kernel = np.ones((P,P))

    # Note these aren't actually eigen vectors
    eigen1 = (dx**2)
    eigen2 = (dy**2)

    # Calculate R value
    R = (eigen1 * eigen2) - k * ((eigen1 + eigen2)**2)

    # Convolution of window on covariance matrix
    points = ndimage.convolve(R, kernel)
    
    # NMS and max indices in one go!
    # returns data in (x,y) form and in alpha x 2 shape
    return corner_peaks(points, min_distance=2, threshold_rel=0, 
        num_peaks=alpha)
```

### Oneliner
  
``` python 
from skimage.feature import corner_harris, corner_peaks

def HarrisOneLine(I, alpha):
    return corner_peaks(corner_harris(I,k=.04), min_distance=2, \
            num_peaks=alpha, threshold_rel=0)
```

### Benchmarks

The following is the benchmark code. There are slight modifications to
`myHarris` and `NMSmyHarris` where I removed the conversion to grayscale. 
This was to ensure that all functions were tested on their Harris calculating
ability.


``` python
import numpy as np
import cv2 as cv
from math import ceil
from scipy import signal
from skimage.feature import corner_harris
from skimage.feature import corner_peaks
from skimage.feature import corner_fast
from scipy import ndimage
import time

def timeit(method):
    def timed(*args, **kw):
        ts = time.time()
        result = method(*args)
        te = time.time()        
        if 'log_time' in kw:
            name = kw.get('log_name', method.__name__)
            kw['log_time'][name] = int((te - ts) * 1000)
        else:
            print('name{}  {:.4e} ms'.format(method.__name__, (te - ts) * 1000))
        return result    
    return timed

@timeit
def myHarris(I, alpha, k=0.04, P=5):
    ...

@timeit
def NMSmyHarris(I, alpha, k=0.04, P=5):
    ...

@timeit
def HarrisOneline(I, alpha):
    ...

@timeit
def fastHarris(I, alpha):
    return corner_peaks(corner_fast(I), min_distance=2, \
            num_peaks=alpha, threshold_rel=0)
    
def plotHarris(axs, I, p, title):
    axs.imshow(I)
    # Remember x and y values are flipped
    # p rows are y values
    # p columns are x values
    axs.scatter(p[:,1], p[:,0])
    axs.title.set_text(title)
     
if __name__ == "__main__":
    # Import data
    from skimage import data
    # Import plotting library
    import matplotlib.pyplot as plt

    # Load an image
    I = data.astronaut()

    logtime_data = {}
    alpha = 500

    # Note p is not sorted
    # Convert image to gray because
    grayImage = cv.cvtColor(I, cv.COLOR_RGB2GRAY)
    p1, R = myHarris(grayImage, alpha, log_time=logtime_data)
    p2 = NMSmyHarris(grayImage, alpha, log_time=logtime_data)
    p3 = HarrisOneline(grayImage, alpha, log_time=logtime_data)
    p4 = fastHarris(grayImage, alpha, log_time=logtime_data)
    fig, axis = plt.subplots(2,2)

    title = "Benchmarks Harris Corner Detectors w/ alpha={}".format(alpha)
    fig.suptitle(title)
    plotHarris(axis[0,0], I, p1, "Output of " \
            "myHarris t={:.5e}".format(logtime_data["myHarris"]))
    plotHarris(axis[0,1], I, p1, "Output of " \
            "NMSmyHarris t={:.5e}".format(logtime_data["NMSmyHarris"]))
    plotHarris(axis[1,0], I, p1, "Output of " \
            "HarrisOneline t={:.5e}".format(logtime_data["HarrisOneline"]))
    plotHarris(axis[1,1], I, p1, "Output of " \
            "fastHarris t={:.5e}".format(logtime_data["fastHarris"]))
```

And here are the outputs.

![Figure [Harris Output w/ Caching]: ](../images/cachedHarris.png)
![Figure [Harris Output w/ Caching alpha=100]: ](../images/cached100.png)
![Figure [Harris Output w/ No Caching alpha=500]: ](../images/uncached500.png)

The cached timing benchmarks are somewhat meaningless but they do give you a
good idea of how much of the code is cacheable. 

The most important result is the last one where I removed `__pycache__` As you
can see, my results are slightly faster than the Harris oneliner. They're not
quite as fast however as the `corner_fast` I think this detector relies on
`FAST` image descriptors but I'm not entirely certain without looking at the
source code.

As a last last note - my timing decorator is not perfect and these tests are not
scientific. They should be run multiple times but I'm lazy. The rough idea is
there. 

TL;DR My naive code &rarr;  slow, my non-naive code &rarr;  fast

## After thoughts

So what did we learn? Caching is good. But results are bad? Like all things in
Computer Vision the results can kinda be hit or miss and require a lot of
adjusting of parameters. If you want to improve the results I'd adjust inputs to
`corner_peaks` so that the output has less clustering. This image is also a
tough one because it's large and doesn't have super hard corners.

I will say though, with very similar code as above I've gotten incredible
results before.

Happy experimenting!

