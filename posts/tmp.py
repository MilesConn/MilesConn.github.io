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

def myImageFilter(img0, h):
    """
    This function takes an image and a kernel and returns the convolution of them. 
    Note: the math in the for loop is actually perform correlation on a flipped kernel.
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


@timeit
def myHarris(I, alpha, k=0.04, P=5):
    """
    My Harris Corner Detector
    """
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

@timeit
def NMSmyHarris(I, alpha, k=0.04, P=5):
    # P defines the kernel size

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
    return corner_peaks(points, min_distance=8, threshold_rel=0, 
        num_peaks=alpha)

@timeit
def HarrisOneline(I, alpha):
    return corner_peaks(corner_harris(I,k=.04), min_distance=8, \
            num_peaks=alpha, threshold_rel=0)

@timeit
def fastHarris(I, alpha):
    return corner_peaks(corner_fast(I), min_distance=8, \
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
