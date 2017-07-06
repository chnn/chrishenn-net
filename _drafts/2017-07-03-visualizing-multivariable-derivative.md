---
title: Visualizing 2D vector fields and the multivariable derivative
layout: post
---

In a first course in calculus, many students encounter a image similar to the following:

<div class="figure">
  <img width="350px" src="{{ site.baseurl }}/assets/images/visualizing-multivariable-derivative/tangent.svg" />
  <div class="caption">Image courtesy <a href="https://commons.wikimedia.org/wiki/File:Tangent-calculus.svg">Wikipedia</a>.</div>
</div>

Such an illustration seeks to highlight the key property of the single variable derivative: it's the *best linear approximation* of a function at a point. For functions of more than one variable, the derivitive exhibits this same characteristic, yet there is no obvious corresponding picture. What would an analogous visualization look like for a multivariable function?

For the past few weeks, I've been working torwards a visualization of multivariable functions and their derivatives. Check out the end result [here][3], or read on to hear the reasoning behind this visualization. I assume some knowledge of mathematical notation and the single variable derivative.

[3]: http://demo.chrishenn.net

## Visualizing vector fields in the plane

To make matters simple, I narrowed my focus to functions $$f : \mathbf{R}^2 \to \mathbf{R}^2$$. The derivative of such a function is also a transform $$\mathbf{R}^2 \to \mathbf{R}^2$$. Thus to build a visual representation of the derivative, I first set out to build a general purpose visualization of vector fields in the plane.

Consider a particular function $$f : \mathbf{R}^2 \to \mathbf{R^2}$$ given by

$$
f(x,\ y) = \left( \frac{x^3 + y^3}{3}, \frac{x^3}{3} - y \right)
$$

What does $$f$$ look like? A common representation such functions selects a uniform set of points in $$\mathbf{R}^2$$, and draws an arrow from each point to its new position under $$f$$:

<img width="300px" src="{{site.baseurl}}/assets/images/visualizing-multivariable-derivative/vector-field.svg" />

This is sometimes called a **vector plot**. For static mediums like a textbook or chalk board, this is a intuitive visualization of $$f$$. However, I wanted to make use of additional visual techniques made possible with computer graphics. I came up with the following.

1. Draw a line in $$\mathbf{R}^2$$.
2. Consider the line as a discrete collection of points (a **polyline**).
2. Apply a function $$\mathbf{R}^2 \to \mathbf{R}^2$$ to those points.
3. Draw a new line through the transformed points.

<img src="{{site.baseurl}}/assets/images/visualizing-multivariable-derivative/viz-steps.svg" />

Performing those steps on a grid of lines in $$[-2,2] \times [-2,2]$$ with the function $$f$$ from above produces the following visual:

<img src="{{site.baseurl}}/assets/images/visualizing-multivariable-derivative/grid-and-transform.svg" />

Nice! The transformed grid gives some sense of how $$f$$ deforms and stretches the Euclidean plane. As another example, if $$f$$ were instead the linear map given by

$$
A = \begin{pmatrix}
2 & 1 \\
0 & 2
\end{pmatrix} \in \textrm{Mat}_{2 \times 2}(\mathbf{R})
$$

then apply $$f$$ to the grid yields this result:

<img src="{{site.baseurl}}/assets/images/visualizing-multivariable-derivative/grid-transformed-linear.svg" />

As one might expect, a linear map sends linear subspaces to linear subspaces (straight lines to straight lines). The visualization has a vivid straight line aesthetic—this will be useful for understanding the multivariable derivitive, which is always a linear map.

To give the visualization more [object constancy][0], I animate between the starting and ending states of each line as well. As a fun aside, the data of such an animation are computed by what mathematicians call a **straight line homotopy**; as a coder, this is a tween function of SVG `path` elements. If you would like to peek under the hood of the visualization, be sure to check out the main [d3][2]-based drawing method [here][1].

[0]: https://bost.ocks.org/mike/constancy/
[1]: https://github.com/chnn/multivariable-derivative-viz/blob/a3f0f96610475006b6491c75c473ecda03a784de/app/components/grid-plot/component.js#L68-L110
[2]: https://d3js.org/

## The multivariable derivative

The multivariable derivative is a generalization of the single variable case, with a construction as follows:

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

- Why is this a sensible generalization of single var?
- How can we see this in the plot?

<!-- This last condition describes the essential behavior of the derivative most directly, and is what we will attempt to visualize. For some visual representation of the function $$f$$, a similar representation of $$h$$ should approximate $$f$$ in a neighborhood of $$\mathbf{a}$$. Furthermore, this approximation should be "linear"; while this property has precise algebraic meaning, we should also be able to see this vividly through the visual representation of $$h$$. -->


## Extending the visualization to complex functions

## Last thoughts

- code is on GitHub
- complex arithmitic
- 3D version?
