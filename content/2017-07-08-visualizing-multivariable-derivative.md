---
title: Visualizing multivariable functions and their derivative
---

{% aside %}
This summer I'm working with [Project Project](http://people.reed.edu/~ormsbyk/projectproject/), a summer research group at Reed College. Our goal is to visualize mathematical concepts. This post details some work with introductory calculus material.
{% /aside %}

In a first course in calculus, many students encounter a image similar to the following:

{% img src="/tangent.svg" alt="" width=412 height=293 caption="Image courtesy Wikipedia." /%}

Such an illustration highlights a key property of the single variable derivative: it’s the _best linear approximation_ of a function at a point. For functions of more than one variable, the derivative exhibits this same characteristic, yet there is no obvious corresponding picture. What would an analogous visualization look like for a multivariable function?

For the past few weeks, I’ve been working towards a visualization of multivariable functions and their derivatives. Check out the end result [here][0], or read on to hear about my process. I assume some knowledge of calculus and mathematical notation.

## Visualizing vector fields in the plane

To make matters simple, I narrowed my focus to functions {% tex %}f : \mathbf{R}^2 \to \mathbf{R}^2{% /tex %}. The derivative of such a function is also a transform {% tex %}\mathbf{R}^2 \to \mathbf{R}^2{% /tex %}. Thus to build a visual representation of the derivative, I first needed a general purpose visualization of vector fields in the plane.

Consider a particular function {% tex %}f : \mathbf{R}^2 \to \mathbf{R^2}{% /tex %} given by

{% tex display=true %}
f(x,\ y) = \left( \frac{x^3 + y^3}{3}, \frac{x^3}{3} - y \right)
{% /tex %}

What does {% tex %}f{% /tex %} look like? A common representation of such functions selects a uniformly-spaced set of points in {% tex %}\mathbf{R}^2{% /tex %}, and draws an arrow at each point representing the magnitude and direction of the vector field:

{% img src="/vector-field.svg" alt="Diagram of a vector field near the origin" width=359 height=357 /%}

This is sometimes called a **vector plot**. For static mediums like a textbook or chalk board, this is a intuitive visualization of {% tex %}f{% /tex %}. However, I wanted to make use of additional visual techniques made possible with computer graphics. I came up with the following:

1.  Draw a line in {% tex %}\mathbf{R}^2{% /tex %}.
2.  Consider the line as a discrete collection of points (a **polyline**).
3.  Apply a function {% tex %}\mathbf{R}^2 \to \mathbf{R}^2{% /tex %} to those points.
4.  Draw a new line through the transformed points.

{% img src="/viz-steps.svg" alt="A four step diagram. The first step shows a solid straight line. The 2nd step shows a dotted straight line. The 3rd step shows a curved dotted line. The 4th step shows a curved straight line." width=321 height=164 /%}

Performing those steps on a grid of lines in {% tex %}[-2,2] \times [-2,2]{% /tex %} with the function {% tex %}f{% /tex %} from above produces the following visual:

{% img src="/grid-and-transform.svg" alt="A grip mapped by the function f into a curvy grid." width=542 height=301 /%}

Neat! The transformed grid gives some sense of how {% tex %}f{% /tex %} deforms and stretches the Euclidean plane. As another example, the linear map given by

{% tex display=true %}
A = \begin{pmatrix}
2 & 1 \\
0 & 2
\end{pmatrix} \in \textrm{Mat}\_{2 \times 2}(\mathbf{R})
{% /tex %}

yields the following picture when applied to a grid around the origin:

{% img src="/grid-transformed-linear.svg" alt="A grid transformed by a linear transform." width=500 height=178 /%}

As one might expect, the linear map sends linear subspaces to linear subspaces (straight lines to straight lines). The visualization has a rather vivid aesthetic—there is no curvature in the transformed result. This will be helpful for understanding the multivariable derivative, which is always a linear map.

To give the visualization more [object constancy](https://bost.ocks.org/mike/constancy/), I animate between the starting and ending states of each line as well. As a fun aside, the data of such an animation are computed by what mathematicians call a **straight line homotopy**; as a coder, this is a tween function of SVG `path` elements. If you would like to peek under the hood of the visualization, be sure to check out the main [d3.js](https://d3js.org/)-based drawing method [here](https://github.com/chnn/multivariable-derivative-viz/blob/a3f0f96610475006b6491c75c473ecda03a784de/app/components/grid-plot/component.js#L68-L110).

## The multivariable derivative

Inspired by the common single variable visualization of the derivative, I wanted to plot functions {% tex %}f : \mathbf{R}^2 \to \mathbf{R}^2{% /tex %} alongside a derivative-based approximation function. What does this approximation look like in the multivariable case?

If it exists, the derivative of a multivariable function {% tex %}f : \mathbf{R}^n \to \mathbf{R}^m{% /tex %} at a point {% tex %}\mathbf{a}{% /tex %} is a linear function {% tex %}T{% /tex %} such that {% tex %}h : \mathbf{R}^n \to \mathbf{R}^m{% /tex %} given by

{% tex display=true %}
h(\mathbf{x}) = f(\mathbf{a}) + T(\mathbf{x - a})
{% /tex %}

approximates {% tex %}f{% /tex %} well near {% tex %}\mathbf{a}{% /tex %}. More precisely, we require that

{% tex display=true %}
\lim\_{\mathbf{x} \to \mathbf{a}} \frac{\lVert f(\mathbf{x}) - h(\mathbf{x}) \rVert}{\lVert \mathbf{x - a} \rVert} = 0
{% /tex %}

If such a linear transform {% tex %}T{% /tex %} exists, it is unique and is given by the **Jacobian matrix of partial derivatives**

{% tex display=true %}
Df(x_1,\ x_2,\ \ldots,\ x_n) := \begin{pmatrix}
\frac{\partial f_1}{\partial x_1} & \frac{\partial f_1}{\partial x_2 } & \ldots & \frac{\partial f_1}{\partial x_n} \\[1.1em]
\frac{\partial f_2}{\partial x_1} & \frac{\partial f_2}{\partial x_2 } & \ldots & \frac{\partial f_2}{\partial x_n} \\[1.1em]
\vdots & \vdots & \ddots & \vdots \\[0.4em]
\frac{\partial f_m}{\partial x_1} & \frac{\partial f_m}{\partial x_2} & \ldots & \frac{\partial f_m}{\partial x_n}
\end{pmatrix}
{% /tex %}

Suppose we choose {% tex %}\mathbf{a} = (1.8,\ 1.4){% /tex %} and compute {% tex %}h{% /tex %} for the particular {% tex %}f{% /tex %} given before. Plotting both {% tex %}h{% /tex %} and {% tex %}f{% /tex %} together (with {% tex %}h{% /tex %} in green) yields the following visual:

{% img src="/grid-transformed-overlaid.svg" alt="A grid transformed into a curvy grid by the function f, with the straight slanted grid of the derivative overlaid." width=600 height=500 /%}

Immediately we can see the essential properties of the derivative: near the chosen point {% tex %}\mathbf{a}{% /tex %}, the function {% tex %}h{% /tex %} closely approximates {% tex %}f{% /tex %}. Moreover, this approximation is linear; the grid transformed by {% tex %}h{% /tex %} consists only of straight lines, indicating that it is a linear function. Be sure to check out the [full animated version][0] of this visualization to see different functions at work!

## Extending the visualization to complex functions

Conveniently, this visualization can also be adapted to visualizing functions {% tex %}\mathbf{C} \to \mathbf{C}{% /tex %}. Just like functions of real numbers, complex functions can be differentiated and have an approximation function

{% tex display=true %}
h(z) = f(a) + f'(a)(z - a)
{% /tex %}

where {% tex %}a,\ z \in \mathbf{C}{% /tex %} and {% tex %}f'{% /tex %} is the derivative of {% tex %}f{% /tex %}.

Typically a point in the complex plane is written as {% tex %}a + bi{% /tex %} for some {% tex %}a,\ b \in \mathbf{R}{% /tex %}. We could alternatively notate this point as {% tex %}(a, b){% /tex %}, which looks just like a point in {% tex %}\mathbf{R}^2{% /tex %}! These points operate under a different arithmetic, but can be fed to the same visualization algorithm. In this case, we get a depiction of the points on the real-imaginary plane. Here, for example, is a visualization of the complex exponential function {% tex %}f(z) = e^z{% /tex %} and its derivative:

{% img src="/complex-exponential.svg" alt="Another transformed grid with the derivative grid overlaid. This one is for the complex exponential function in the imaginary plane." width=600 height=400 /%}

## Closing thoughts

Next up I’m planning a 3D-printable version of this same visualization. The idea is to perform similar deformation of a lattice in {% tex %}\mathbf{R}^3{% /tex %}. More on this coming soon!

For the curious or computer-minded, the code for this d3.js-based visualization is [on GitHub](https://github.com/chnn/multivariable-derivative-viz). Highlights include a [totally bonkers JavaScript implementation of complex arithmetic](https://github.com/chnn/multivariable-derivative-viz/blob/a3f0f96610475006b6491c75c473ecda03a784de/app/utils/complex-numbers.js) or the main [plot component](https://github.com/chnn/multivariable-derivative-viz/blob/a3f0f96610475006b6491c75c473ecda03a784de/app/components/grid-plot/component.js). I would also [love to hear](mailto:chris@chrishenn.net) any further ideas for visualization in this area.

[0]: http://people.reed.edu/~ormsbyk/projectproject/assets/posts/multivariable-derivative/multivariable-derivative-viz/
