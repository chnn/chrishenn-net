---
title: Visualizing multivariable functions and their derivative
layout: post
---

<div class="aside">
  <p>This summer I'm working with Project Project, a summer research group at Reed College. Our goal is to visualize mathematical concepts; this post details some work with introductory calculus material.</p>
</div>

In a first course in calculus, many students encounter a image similar to the following:

{% include image.html name="tangent.svg" width="350px" caption="Image courtesy [Wikipedia](https://commons.wikimedia.org/wiki/File:Tangent-calculus.svg)." %}

Such an illustration highlights a key property of the single variable derivative: it’s the *best linear approximation* of a function at a point. For functions of more than one variable, the derivative exhibits this same characteristic, yet there is no obvious corresponding picture.  What would an analogous visualization look like for a multivariable function?

For the past few weeks, I’ve been working towards a visualization of multivariable functions and their derivatives. Check out the end result [here][0], or read on to hear about my process.  I assume some knowledge of calculus and mathematical notation.

## Visualizing vector fields in the plane

To make matters simple, I narrowed my focus to functions $$f : \mathbf{R}^2 \to \mathbf{R}^2$$. The derivative of such a function is also a transform $$\mathbf{R}^2 \to \mathbf{R}^2$$. Thus to build a visual representation of the derivative, I first needed a general purpose visualization of vector fields in the plane.

Consider a particular function $$f : \mathbf{R}^2 \to \mathbf{R^2}$$ given by

$$
f(x,\ y) = \left( \frac{x^3 + y^3}{3}, \frac{x^3}{3} - y \right)
$$

What does $$f$$ look like? A common representation of such functions selects a uniformly-spaced set of points in $$\mathbf{R}^2$$, and draws an arrow at each point representing the magnitude and direction of the vector field:

{% include image.html width="300px" name="vector-field.svg" %}

This is sometimes called a **vector plot**. For static mediums like a textbook or chalk board, this is a intuitive visualization of $$f$$.  However, I wanted to make use of additional visual techniques made possible with computer graphics. I came up with the following:

1.  Draw a line in $$\mathbf{R}^2$$.
2.  Consider the line as a discrete collection of points (a **polyline**).
3.  Apply a function $$\mathbf{R}^2 \to \mathbf{R}^2$$ to those points.
4.  Draw a new line through the transformed points.

{% include image.html name="viz-steps.svg" %}

Performing those steps on a grid of lines in $$[-2,2] \times [-2,2]$$ with the function $$f$$ from above produces the following visual:

{% include image.html name="grid-and-transform.svg" %}

Neat-o! The transformed grid gives some sense of how $$f$$ deforms and stretches the Euclidean plane. As another example, the linear map given by

$$
A = \begin{pmatrix}
2 & 1 \\
0 & 2
\end{pmatrix} \in \textrm{Mat}_{2 \times 2}(\mathbf{R})
$$

yields the following picture when applied to a grid around the origin:

{% include image.html name="grid-transformed-linear.svg" %}

As one might expect, the linear map sends linear subspaces to linear subspaces (straight lines to straight lines). The visualization has a rather vivid aesthetic—there is no curvature in the transformed result.  This will be helpful for understanding the multivariable derivative, which is always a linear map.

To give the visualization more [object constancy](https://bost.ocks.org/mike/constancy/), I animate between the starting and ending states of each line as well. As a fun aside, the data of such an animation are computed by what mathematicians call a **straight line homotopy**; as a coder, this is a tween function of SVG `path` elements. If you would like to peek under the hood of the visualization, be sure to check out the main [d3.js](https://d3js.org/)-based drawing method [here](https://github.com/chnn/multivariable-derivative-viz/blob/a3f0f96610475006b6491c75c473ecda03a784de/app/components/grid-plot/component.js#L68-L110).

## The multivariable derivative

Inspired by the common single variable visualization of the derivative, I wanted to plot functions $$f : \mathbf{R}^2 \to \mathbf{R}^2$$ alongside a derivative-based approximation function. What does this approximation look like in the multivariable case?

If it exists, the derivative of a multivariable function $$f : \mathbf{R}^n \to \mathbf{R}^m$$ at a point $$\mathbf{a}$$ is a linear function $$T$$ such that $$h : \mathbf{R}^n \to \mathbf{R}^m$$ given by

$$
h(\mathbf{x}) = f(\mathbf{a}) + T(\mathbf{x - a})
$$

approximates $$f$$ well near $$\mathbf{a}$$. More precisely, we require that

$$
\lim_{\mathbf{x} \to \mathbf{a}} \frac{\lVert f(\mathbf{x}) - h(\mathbf{x}) \rVert}{\lVert \mathbf{x - a} \rVert} = 0
$$

If such a linear transform $$T$$ exists, it is unique and is given by the **Jacobian matrix of partial derivatives**

$$
Df(x_1,\ x_2,\ \ldots,\ x_n) := \begin{pmatrix}
\frac{\partial f_1}{\partial x_1} & \frac{\partial f_1}{\partial x_2 } & \ldots & \frac{\partial f_1}{\partial x_n} \\[1.1em]
\frac{\partial f_2}{\partial x_1} & \frac{\partial f_2}{\partial x_2 } & \ldots & \frac{\partial f_2}{\partial x_n} \\[1.1em]
\vdots & \vdots & \ddots & \vdots \\[0.4em]
\frac{\partial f_m}{\partial x_1} & \frac{\partial f_m}{\partial x_2}  & \ldots & \frac{\partial f_m}{\partial x_n}
\end{pmatrix}
$$

Suppose we choose $$\mathbf{a} = (1.8,\ 1.4)$$ and compute $$h$$ for the particular $$f$$ given before. Plotting both $$h$$ and $$f$$ together (with $$h$$ in green) yields the following visual:

{% include image.html name="grid-transformed-overlaid.svg" width="500px" %}

Immediately we can see the essential properties of the derivative: near the chosen point $$\mathbf{a}$$, the function $$h$$ closely approximates $$f$$. Moreover, this approximation is linear; the grid transformed by $$h$$ consists only of straight lines, indicating that it is a linear function. Be sure to check out the [full animated version][0] of this visualization to see different functions at work!

## Extending the visualization to complex functions

Conveniently, this visualization can also be adapted to visualizing functions $$\mathbf{C} \to \mathbf{C}$$. Just like functions of real numbers, complex functions can be differentiated and have an approximation function

$$
h(z) = f(a) + f'(a)(z - a)
$$

where $$a,\ z \in \mathbf{C}$$ and $$f'$$ is the derivative of $$f$$.

Typically a point in the complex plane is written as $$a + bi$$ for some $$a,\ b \in \mathbf{R}$$. We could alternatively notate this point as $$(a, b)$$, which looks just like a point in $$\mathbf{R}^2$$! These points operate under a different arithmetic, but can be fed to the same visualization algorithm. In this case, we get a depiction of the points on the real-imaginary plane. Here, for example, is a visualization of the complex exponential function $$f(z) = e^z$$ and its derivative:

{% include image.html name="complex-exponential.svg" width="500px" %}

## Closing thoughts

Next up I’m planning a 3D-printable version of this same visualization.  The idea is to perform similar deformation of a lattice in $$\mathbf{R}^3$$.

{% include stl.html name="lattice.stl" %}

More on this coming soon!

For the curious or computer-minded, the code for this d3.js-based visualization is [on GitHub](https://github.com/chnn/multivariable-derivative-viz).  Highlights include a [totally bonkers JavaScript implementation of complex arithmetic](https://github.com/chnn/multivariable-derivative-viz/blob/a3f0f96610475006b6491c75c473ecda03a784de/app/utils/complex-numbers.js) or the main [plot component](https://github.com/chnn/multivariable-derivative-viz/blob/a3f0f96610475006b6491c75c473ecda03a784de/app/components/grid-plot/component.js).  I would also [love to hear](mailto:chris@chrishenn.net) any further ideas for visualization in this area.

[0]: http://people.reed.edu/~ormsbyk/projectproject/assets/posts/multivariable-derivative/multivariable-derivative-viz/
