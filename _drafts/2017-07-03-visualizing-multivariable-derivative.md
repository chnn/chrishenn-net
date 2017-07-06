---
title: Visualizing 2D vector fields and the multivariable derivative
layout: post
---

In a first course in calculus, many students encounter a image similar to the following:

<div class="figure">
  <img width="350px" src="{{ site.baseurl }}/assets/images/visualizing-multivariable-derivative/tangent.svg" />
  <div class="caption">Image courtesy <a href="https://commons.wikimedia.org/wiki/File:Tangent-calculus.svg">Wikipedia</a>.</div>
</div>

Such an illustration highlights a key property of the single variable derivative: it's the *best linear approximation* of a function at a point. For functions of more than one variable, the derivative exhibits this same characteristic, yet there is no obvious corresponding picture. What would an analogous visualization look like for a multivariable function?

For the past few weeks, I've been working towards a visualization of multivariable functions and their derivatives. Check out the end result [here][3], or read on to hear about my process. I assume some knowledge of calculus and mathematical notation.

[3]: http://demo.chrishenn.net

## Visualizing vector fields in the plane

To make matters simple, I narrowed my focus to functions $$f : \mathbf{R}^2 \to \mathbf{R}^2$$. The derivative of such a function is also a transform $$\mathbf{R}^2 \to \mathbf{R}^2$$. Thus to build a visual representation of the derivative, I first needed a general purpose visualization of vector fields in the plane.

Consider a particular function $$f : \mathbf{R}^2 \to \mathbf{R^2}$$ given by

$$
f(x,\ y) = \left( \frac{x^3 + y^3}{3}, \frac{x^3}{3} - y \right)
$$

What does $$f$$ look like? A common representation of such functions selects a uniform set of points in $$\mathbf{R}^2$$, and draws an arrow from each point to its new position under $$f$$:

<img width="300px" src="{{site.baseurl}}/assets/images/visualizing-multivariable-derivative/vector-field.svg" />

This is sometimes called a **vector plot**. For static mediums like a textbook or chalk board, this is a intuitive visualization of $$f$$. However, I wanted to make use of additional visual techniques made possible with computer graphics. I came up with the following:

1. Draw a line in $$\mathbf{R}^2$$.
2. Consider the line as a discrete collection of points (a **polyline**).
2. Apply a function $$\mathbf{R}^2 \to \mathbf{R}^2$$ to those points.
3. Draw a new line through the transformed points.

<img src="{{site.baseurl}}/assets/images/visualizing-multivariable-derivative/viz-steps.svg" />

Performing those steps on a grid of lines in $$[-2,2] \times [-2,2]$$ with the function $$f$$ from above produces the following visual:

<img src="{{site.baseurl}}/assets/images/visualizing-multivariable-derivative/grid-and-transform.svg" />

Neat-o! The transformed grid gives some sense of how $$f$$ deforms and stretches the Euclidean plane. As another example, the linear map given by

$$
A = \begin{pmatrix}
2 & 1 \\
0 & 2
\end{pmatrix} \in \textrm{Mat}_{2 \times 2}(\mathbf{R})
$$

yields the following picture when applied to a grid around the origin:

<img src="{{site.baseurl}}/assets/images/visualizing-multivariable-derivative/grid-transformed-linear.svg" />

As one might expect, the linear map sends linear subspaces to linear subspaces (straight lines to straight lines). The visualization has a rather vivid aesthetic—there are no round curves in the transformed result. This will be helpful for understanding the multivariable derivative, which is always a linear map.

To give the visualization more [object constancy][0], I animate between the starting and ending states of each line as well. As a fun aside, the data of such an animation are computed by what mathematicians call a **straight line homotopy**; as a coder, this is a tween function of SVG `path` elements. If you would like to peek under the hood of the visualization, be sure to check out the main [d3][2]-based drawing method [here][1].

[0]: https://bost.ocks.org/mike/constancy/
[1]: https://github.com/chnn/multivariable-derivative-viz/blob/a3f0f96610475006b6491c75c473ecda03a784de/app/components/grid-plot/component.js#L68-L110
[2]: https://d3js.org/

## The multivariable derivative

Inspired by the common single variable visualization of the derivative, I wanted to plot functions $$f : \mathbf{R}^2 \to \mathbf{R}^2$$ alongside a derivative-based approximation function. What does this approximation look like for the multivariable case?

The derivative can be generalized to multiple dimensions with the following construction:

Let $$f : \mathbf{R}^n \to \mathbf{R}$$ be a real-valued function of $$n$$ variables. Define a **partial function $$F$$ of $$f$$ with respect the variable $$x_i$$** to be the one-variable function obtained from $$f$$ by holding all variables constant expect $$x_i$$. That is,

$$
F(x_i) = f(a_1,\ a_2,\ \ldots,\ x_i,\ \ldots a_n)
$$

where $$a_j$$ is a constant for $$j \neq i$$. Then the **partial derivative of $$f$$ with respect to $$x_i$$** is the usual derivative of the partial function of $$f$$ with respect to $$x_i$$, denoted $$\partial f / \partial x_i$$.

Now suppose instead that $$f : \mathbf{R}^n \to \mathbf{R}^m$$ is a vector-valued function of $$n$$ variables with component functions $$f_1,\ f_2,\ \ldots,\ f_m$$. Then the **matrix of partial derivatives of $$f$$** (also called **the derivative of $$f$$** or **the Jacobian**) is the matrix

$$
Df(x_1,\ x_2, \ldots,\ x_n) := \begin{pmatrix}
\frac{\partial f_1}{\partial x_1} & \frac{\partial f_1}{\partial x_2 } & \ldots & \frac{\partial f_1}{\partial x_n} \\[1.1em]
\frac{\partial f_2}{\partial x_1} & \frac{\partial f_2}{\partial x_2 } & \ldots & \frac{\partial f_2}{\partial x_n} \\[1.1em]
\vdots & \vdots & \ddots & \vdots \\[0.4em]
\frac{\partial f_m}{\partial x_1} & \frac{\partial f_m}{\partial x_2}  & \ldots & \frac{\partial f_m}{\partial x_n}
\end{pmatrix}
$$

We say the **$$f$$ is differentiable at $$\mathbf{a} \in \mathbf{R}^n$$** if $$Df(\mathbf{a})$$ exists and the function $$h : \mathbf{R}^n \to \mathbf{R}^m$$ given by

$$
h(\mathbf{x}) = f(\mathbf{a}) + Df(\mathbf{a})(\mathbf{x - a})^T
$$

is a good linear approximation to $$f$$ near $$a$$. More precisely, we need that

$$
\lim_{\mathbf{x} \to \mathbf{a}} \mathbf{\frac{\lVert f(x) - h(x) \rVert}{\lVert x - a \rVert}} = 0
$$

Suppose we choose $$\mathbf{a} = (1.8,\ 1.4)$$ and compute $$h$$ for the particular $$f$$ given before. Plotting both $$h$$ and $$f$$ together (with $$h$$ in green) yields the following visual:

<img width="500px" src="{{site.baseurl}}/assets/images/visualizing-multivariable-derivative/transformed-grids-overlaid.svg" />

Immediately we can see the essential properties of the derivative: near the chosen point $$\mathbf{a}$$, the function $$h$$ closely approximates $$f$$. Moreover, this approximation is linear; the grid transformed by $$h$$ consists only of straight lines, indicating that it is a linear function. Be sure to check out the [full animated version][3] of this visualization to see different functions at work! 

## Extending the visualization to complex functions

Conveniently, this visualization can also be adapted to visualizing functions $$\mathbf{C} \to \mathbf{C}$$. Just like functions of real numbers, complex functions can be differentiated and have an approximation function

$$
h(z) = f(a) + f'(a)(z - a)
$$

where $$a,\ z \in \mathbf{C}$$ and $$f'$$ is the derivative of $$f$$.

Typically a point in the complex plane is written as $$a + bi$$ for some $$a,\ b \in \mathbf{R}$$. We could alternatively notate this point as $$(a, b)$$, which looks just like a point in $$\mathbf{R}^2$$! These points operate under a different arithmetic, but can be fed to the same visualization algorithm. In this case, we get a depiction of the points on the real-imaginary plane. Here, for example, is a visualization of the complex exponential function $$f(z) = e^z$$ and its derivative:

<img width="500px" src="{{site.baseurl}}/assets/images/visualizing-multivariable-derivative/complex-exponential.svg" />

## Closing thoughts

Next up I'm planning a 3D-printable version of this same visualization. The idea is to perform similar deformation of a lattice in $$\mathbf{R}^3$$.

<img width="400px" src="{{ site.baseurl }}/assets/images/visualizing-multivariable-derivative/3d-lattice.jpg" />

More on this soon!

For the curious or computer-minded, the code for this visualization is [on GitHub][4]. Highlights include a [totally bonkers JavaScript implementation of complex arithmitic][5] or the main [plot component][2]. I would also [love to hear](mailto:chris@chrishenn.net) any further ideas for visualization in this area.


[4]: https://github.com/chnn/multivariable-derivative-viz
[5]: https://github.com/chnn/multivariable-derivative-viz/blob/a3f0f96610475006b6491c75c473ecda03a784de/app/utils/complex-numbers.js
