class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  deepCopy() {
    return new Point(
      this.x,
      this.y,
    );
  }
}

class Line {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  deepCopy() {
    // todo
    return new Line(
      this.start.deepCopy(),
      this.end.deepCopy()
    );
  }
}