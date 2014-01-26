---
layout: post
title: When am I ever going to use this
---

As part of my recent Calc III midterm, I had to classify some critical points of a multivariable function. Briefly, it went something like this:

{% math %}

f(x, y) = x^3 - y^3 + 3xy \\

f_{x} = 3x^2 + 3y, \quad f_{y} = -3y^2 + 3x \\

f_{x} = f_{y} = 0 \\

3x^2 + 3y = 0 \Rightarrow y = -x^2 \\

-3(-x^2)^2 + 3x = 0 \\

-3x^4  + 3x = 0 \\

3x(-x^3 + 1) = 0 \Rightarrow x = 0, 1 \\

f_{xx} = 6x, \quad f_{xy} = 3, \quad f_{yy} = -6y \\

D(a, b) = f_{xx}(a, b) f_{yy}(a, b) - [f_{xy}(a,b)]^2 \\

D(0, f(0)) = -9  < 0 \Rightarrow \boxed{(0,0) \; \text{is a saddle point}} \\

D(-1, f(-1)) = -45 < 0 \Rightarrow \boxed{(-1, -1) \; \text{is a saddle point}}

{% endmath %}

Can you spot the error? Yup, {% m %} -(-1)^3 \neq -1 {% em %}. The above solution is incorrect because of a simple alegebra level mistake. That doesn't matter though, it's still incorrect.

That's nothing new. I've made so many “silly” mistakes on exams in the past to expect something like this to happen. Whatever though, as long as I understand the concepts behind the question, right? 

The problem is that I don't. I once had a fuzzy intuition of what a derivative is from high school math. I watched some [Khan Academy videos](https://www.khanacademy.org/math/calculus/differential-calculus) before the teacher went over the whole definition of a derivative spiel in class. I mostly forgot that knowledge over summer. 

* I'm *really good* at plugging in math into Wolfram Alpha. 
