/* # Motivation
- Bridge prevents a 'Cartesian product' complexity explosion
- Example:
    - Base class ThreadScheduler
    - Can be preemptive or cooperative
    - Can run on Windows or Unix
    - End up with a 2x2 scenario: WindowsPTS, UnixPTS, WindowsCTS, UnixCTS
- Bridge pattern avoid the entity explosion
*/

/*
  Bridge: A mechanism that decouples an interface (hierarchy) from an implementation (hierarchy)

  JS has duck typing, so definitions of interfaces are not strictly necessary

  Summary: 
  - Decouple abstraction from implementation
  - Both can exist as hierarchies
  - A stronger form of encapsulation
 */

// ==================Code==========================
// It's just a way to connect 2 hierarchies together
// It does take away the necessity of multiple classes but not multiple method implementations
class VectorRenderer {
  renderCircle(radius) {
    console.log(`Drawing a circle of radius ${radius}`);
  }
}
class RasterRenderer {
  renderCircle(radius) {
    console.log(`Drawing pixels for a circle of radius ${radius}`);
  }
}

class Shape {
  constructor(renderer) {
    this.renderer = renderer;
  }
}

class Circle extends Shape {
  constructor(renderer, radius) {
    super(renderer);
    this.radius = radius;
  }

  draw() {
    this.renderer.renderCircle(this.radius);
  }

  resize(factor) {
    this.radius *= factor;
  }
}

// Shape - Square, Circle, Triangle
// Renderer - Raster, Vector...

const raster = new RasterRenderer();
const vector = new VectorRenderer();

const circle = new Circle(vector, 5);

circle.draw();
circle.resize(2);
circle.draw();

