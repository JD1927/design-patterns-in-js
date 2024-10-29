/* 
Bridge Coding Exercise
You are given an example of an inheritance hierarchy which results in Cartesian-product duplication.

Please refactor this hierarchy, giving the base class Shape  a constructor that takes a renderer, whose expected interface is:

class <SomeRenderer>
{
  get whatToRenderAs()
  {
    // todo
  }
}
There's no need to implement the type above (due to duck typing), but I do want you to implement classes VectorRenderer  and RasterRenderer . Each inheritor of the Shape  class should have a constructor that takes a Renderer  such that, subsequently, each constructed object's toString()  operates correctly, for example,

new Triangle(new RasterRenderer()) # returns "Drawing Triangle as pixels"  */

// class Shape
// {
//   constructor(name)
//   {
//     this.name = name;
//   }
// }
//
// class Triangle extends Shape
// {
//   constructor()
//   {
//     super('triangle');
//   }
// }
//
// class Square extends Shape
// {
//   constructor()
//   {
//     super('square');
//   }
// }
//
// class VectorSquare extends Square
// {
//   toString()
//   {
//     return `Drawing square as lines`;
//   }
// }
//
// class RasterSquare extends Square
// {
//   toString()
//   {
//     return `Drawing square as pixels`;
//   }
// }

// imagine VectorTriangle and RasterTriangle are here too

class Shape {
  constructor(renderer) {
    this.renderer = renderer;
  }
}

class Square extends Shape {
  constructor(renderer) {
    super(renderer);
  }

  toString() {
    return this.renderer.renderSquare();
  }
}

class Triangle extends Shape {
  constructor(renderer) {
    super(renderer);
  }

  toString() {
    return this.renderer.renderTriangle();
  }
}

class VectorRenderer {
  renderSquare() {
    return `Drawing square as lines`;
  }
  renderTriangle() {
    return `Drawing triangle as lines`;
  }
}

class RasterRenderer {
  renderSquare() {
    return `Drawing square as pixels`;
  }
  renderTriangle() {
    return `Drawing triangle as pixels`;
  }
}