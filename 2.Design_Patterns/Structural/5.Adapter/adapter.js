/* # Motivation
- How to make an "adapter" that works similar like when you try to charge your phone in a different country. 
- Works like a plug
*/

/*
  Adapter: A construct which adapts an existing interface X to conform to the required interface Y

  Summary:
  - Implementing an Adapter is easy
  - Determine the API you have and the API you need
  - Create a component which aggregates (has a reference to,...) the adaptee
  - Intermediate representations can pile up: use caching and other optimizations
 */

// ==================Code==========================
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

class Line {
  constructor(start, end) {// Points
    this.start = start;
    this.end = end;
  }

  toString() {
    return `${this.start.toString()} -> ${this.end.toString()}`;
  }
}

class VectorObject extends Array { }

class VectorRectangle extends VectorObject {
  constructor(x, y, width, height) {
    super();
    this.push(new Line(new Point(x, y), new Point(x + width, y)));
    this.push(new Line(new Point(x + width, y), new Point(x + width, y + height)));
    this.push(new Line(new Point(x, y), new Point(x, y + height)));
    this.push(new Line(new Point(x, y + height), new Point(x + width, y + height)));
  }
}

// ↑↑↑ this is your API ↑↑↑

// ↓↓↓ this is what you have to work with ↓↓↓
const drawPoint = (point) => {
  process.stdout.write('.');
};

class LineToPointAdapter extends Array {
  constructor(line) {
    super();
    console.log(`${LineToPointAdapter.count++}`);
    console.log(`Generating point for line ${line.toString()} no caching`);

    const left = Math.min(line.start.x, line.end.x);
    const right = Math.max(line.start.x, line.end.x);
    const top = Math.min(line.start.y, line.end.y);
    const bottom = Math.max(line.start.y, line.end.y);

    if (right - left === 0) {
      for (let y = top; y < bottom; ++y) {
        this.push(new Point(left, y));
      }
    } else if (line.end.y - line.start.y === 0) {
      for (let x = left; x <= right; ++x) {
        this.push(new Point(x, top));
      }
    }
  }
}
LineToPointAdapter.count = 0;

const vectorObjects = [
  new VectorRectangle(1, 1, 10, 10),
  new VectorRectangle(3, 3, 6, 6),
];

const drawPoints = () => {
  for (const vObj of vectorObjects) {
    for (const line of vObj) {
      const adapter = new LineToPointAdapter(line);
      adapter.forEach(drawPoint);
    }
  }
};

drawPoints();