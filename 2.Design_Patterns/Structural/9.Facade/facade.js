/* # Motivation
- Balancing complexity and presentation/usability
- Typical house
    - Many subsystems (electrical, sanitation)
    - Complex internal structure (e.g floor layers)
    - End user is not exposed to internals
- Same with software!
    - Many systems working to provide flexibility, but...
    - API consumers want it to "just work"
*/

/*
  Decorator: Exposing several components through a single interface

  Provides a simple, easy to understand/user interface over a large and sophisticated body of code

  Summary:
  - Build a Facade to provide a simplified API over a set of classes
  - May wish to (optional) expose internals through the facade
  - May allow users to 'escalate' to use more complex API's if they need to
 */

// ==================Code==========================

class Buffer extends Array {
  constructor(width = 30, height = 20) {
    super();
    this.width = width;
    this.height = height;
    this.alloc(width * height);// -> Amount of memory for width and height size
  }

  write(text, position = 0) {
    // Write elements to the buffer
  }
}

class Viewport { // Present buffer elements
  constructor(buffer = new Buffer()) {
    this.buffer = buffer;
    this.offset = 0;
  }

  append(text, position) {
    this.buffer.write(text, position + this.offset);
  }

  getCharAt(index) {
    return this.buffer[this.offset + index];
  }
}

// Single Unified Interface - With a sets of defaults
class Console {
  constructor() {
    this.buffer = new Buffer();
    this.currentViewport = new Viewport(this.buffer);
    this.buffers = [this.buffer];
    this.viewportList = [this.currentViewport];
  }

  write(text) {
    this.currentViewport.buffer.write(text);
  }

  getCharAt(index) {
    return this.currentViewport.getCharAt(index);
  }
}

const c = new Console();
c.write('Hello');
const char = c.getCharAt(0);
c.buffers.push(new Buffer());