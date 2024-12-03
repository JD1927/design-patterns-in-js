/* # Motivation
- Want to augment an object with additional functionality
- Do not want to rewrite or alter existing code (OCP)
- Want to keep new functionality separate (SRP)
- Need to be able to interact with existing structures
- Two options: 
    - Inherit from required object (if possible)
    - Build a Decorator, which simply references the decorated object(s)
*/

/*
  Decorator: Adding behavior without altering the class itself

  Facilitates the addition of behaviors to individual objects without inheriting from them.

  Summary:
  - A decorator keeps the reference to the decorated object(s)
  - Adds utility fields and methods to augment the object's features
  - May or may not forward calls to the underlying object
 */

// ==================Code==========================

class Shape { }

class Circle extends Shape {
  constructor(radius = 0) {
    super();
    this.radius = radius;
  }

  resize(factor) {
    this.radius *= factor;
  }

  toString() {
    return `A circle of radius ${this.radius}.`;
  }
}

class ColoredShape extends Shape {
  constructor(shape, color) {
    super();
    this.shape = shape;
    this.color = color;
  }

  toString() {
    return `${this.shape.toString()} Has the color ${this.color}.`;
  }
}

class TransparentShape extends Shape {
  constructor(shape, transparency) {
    super();
    this.shape = shape;
    this.transparency = transparency;
  }

  toString() {
    return `${this.shape.toString()} Has ${this.transparency * 100.0}% transparency.`;
  }
}

const circle = new Circle(2);
console.log("🚀 ~ circle:", circle.toString());

const redCircle = new ColoredShape(circle, 'red');
redCircle.shape.resize(3);
console.log("🚀 ~ red circle:", redCircle.toString());

const redHalfCircle = new TransparentShape(redCircle, 0.5);
redHalfCircle.shape.shape.resize(0.5);
console.log("🚀 ~ red half circle:", redHalfCircle.toString());
