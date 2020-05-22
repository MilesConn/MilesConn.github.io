import numpy as np
from matplotlib import cm
import matplotlib.pyplot as plt
import matplotlib as mlp

# Enable latex
plt.rcParams.update({
    "text.usetex": True,
    "font.family": "sans-serif",
    "font.sans-serif": ["Helvetica"]})



def genericCorner():
    fig = plt.figure()
    ax = fig.gca(projection='3d')

    fig.suptitle("Plot of $f(x) = x^2 + y^2$")
    # Make the data
    X = np.arange(-10,10,.1)
    Y = np.arange(-10,10,.1)
    X, Y = np.meshgrid(X,Y)
    Z = (X**2 + Y**2)

    # Plot
    surf = ax.plot_surface(X,Y,Z, cmap=cm.coolwarm,
            linewidth=0)

    # Add colorbar
    fig.colorbar(surf, shrink=0.5, aspect=5)

    plt.show()

def shapes():
    fig = plt.figure()
    ax = fig.add_subplot(131, projection='3d')

    # Make the data
    X = np.arange(-10,10,.1)
    Y = np.arange(-10,10,.1)
    X, Y = np.meshgrid(X,Y)
    Z= (X**2)

    surf = ax.plot_surface(X,Y,Z, cmap=cm.coolwarm,
            linewidth=0)
    ax.title.set_text("Edge")
    ax.set_zlim3d(0,150)
    #fig.suptitle("Plot of $f(x) = x^2 + y^2$")
    ax = fig.add_subplot(132, projection='3d')
    Z = .081 * (X**2 + Y**2)
    surf = ax.plot_surface(X,Y,Z, cmap=cm.coolwarm,
            linewidth=0)
    ax.title.set_text("Flat Region")
    ax.set_zlim3d(0,150)

    Z= (X**2 + Y**2)
    ax = fig.add_subplot(133, projection='3d')
    surf = ax.plot_surface(X,Y,Z, cmap=cm.coolwarm,
            linewidth=0)
    ax.title.set_text("Corner")
    ax.set_zlim3d(0,150)
    plt.show()

def contours():
    fig, axs = plt.subplots()
    X = np.arange(-10,10,.1)
    Y = np.arange(-10,10,.1)
    X, Y = np.meshgrid(X,Y)
    Z = (X**2 + Y**2)
    CS = axs.contour(X,Y,Z, cmap=cm.coolwarm)
    axs.set_title("Countour plot of $f(x,y)=x^2 + y^2$")
    plt.show()

if __name__ == "__main__":
    contours()
