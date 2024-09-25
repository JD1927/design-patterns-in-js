/* # Motivation
- How to make an "adapter" that works similar like when you try to charge your phone in a different country. 
- Works like a plug
*/

/*
  Adapter: A construct which adapts an existing interface X to conform to the required interface Y

  Summary:
  - 
 */

// ==================Code==========================
String.prototype.hashCode = function () {
  if (Array.prototype.reduce) {
    return this.split("").reduce(function (a, b) {
      a = ((a << 5) - a) + b.charCodeAt(0); return a & a;
    }, 0);
  }
  let hash = 0;
  if (this.length === 0) return hash;
  for (let i = 0; i < this.length; i++) {
    const character = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + character;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash;
};

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
  constructor(start, end) {
    // Starting Point
    this.start = start;
    // Ending Point
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
    // Top Line
    this.push(new Line(new Point(x, y), new Point(x + width, y)));
    // Right Line
    this.push(new Line(new Point(x + width, y), new Point(x + width, y + height)));
    // Left Line
    this.push(new Line(new Point(x, y), new Point(x, y + height)));
    // Bottom Line
    this.push(new Line(new Point(x, y + height), new Point(x + width, y + height)));
  }
}

// ↑↑↑ this is your API ↑↑↑

// ↓↓↓ this is what you have to work with ↓↓↓
const drawPoint = (point) => {
  process.stdout.write('.');
};

class LineToPointAdapter {
  constructor(line) {
    this.hash = JSON.stringify(line).hashCode();
    if (LineToPointAdapter.cache[this.hash]) return;

    const points = [];

    console.log(`${LineToPointAdapter.count++}`);
    console.log(`Generating point for line ${line.toString()} no caching`);

    const left = Math.min(line.start.x, line.end.x);
    const right = Math.max(line.start.x, line.end.x);
    const top = Math.min(line.start.y, line.end.y);
    const bottom = Math.max(line.start.y, line.end.y);

    if (right - left === 0) {
      for (let y = top; y < bottom; ++y) {
        points.push(new Point(left, y));
      }
    } else if (line.end.y - line.start.y === 0) {
      for (let x = left; x <= right; ++x) {
        points.push(new Point(x, top));
      }
    }

    LineToPointAdapter.cache[this.hash] = points;
  }

  get items() {
    return LineToPointAdapter.cache[this.hash];
  }
}
LineToPointAdapter.count = 0;
LineToPointAdapter.cache = {};

const vectorObjects = [
  new VectorRectangle(1, 1, 10, 10),
  new VectorRectangle(3, 3, 9, 9),
];

const drawPoints = () => {
  for (const vectorObject of vectorObjects) {
    for (const line of vectorObject) {
      const adapter = new LineToPointAdapter(line);
      adapter.items.forEach(drawPoint);
    }
  }
};

drawPoints();