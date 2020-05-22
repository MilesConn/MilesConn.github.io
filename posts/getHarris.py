import numpy as np
import cv2 as cv
from scipy import ndimage
from utils import imfilter
from skimage.feature import corner_peaks


def get_harris_points(I, alpha, k, P=5):
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
    return corner_peaks(points, min_distance=2, threshold_rel=0, num_peaks=alpha)


