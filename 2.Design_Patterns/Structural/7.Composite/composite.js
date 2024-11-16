/* # Motivation
- Objects use other objects fields/methods through inheritance and composition
- Composition lets us make compound objects
    - Mathematical expression composed of simple expressions; or
    - A shape group made of several different shapes
- Composite design pattern is used to treat both single and composite objects uniformly
    - class Foo and an array (containing Foo's) having the same API
*/

/*
  Composite: A mechanism for threating individual objects and compositions of objects in a uniforms manner

  Summary:
  - Objects can use other objects via inheritance/composition
  - Some composed and singular objects similar/identical behaviors
  - Composite design pattern lets us treat both types of objects uniformly
  - Javascript supports iteration with `Symbol.iterator`
  - A single object can make itself iterable by yielding `this`!
 */

// ==================Code==========================
class GraphicObject {

  get name() {
    return this._name;
  }

  constructor(name = 'Group' + GraphicObject.count++) {
    this._name = name;
    this.color = undefined;
    this.children = [];
  }

  toString() {
    let buffer = [];
    this.print(buffer, 0);
    return buffer.join('');
  }

  print(buffer, depth) {
    buffer.push('*'.repeat(depth));
    if (depth > 0) buffer.push(' ');
    if (this.color) buffer.push(this.color + ' ');
    buffer.push(this.name);
    buffer.push('\n');

    for (const child of this.children) {
      child.print(buffer, depth + 1);
    }
  }
}
GraphicObject.count = 0;

class Circle extends GraphicObject {
  constructor(color) {
    super('Circle');
    this.color = color;
  }
}

class Square extends GraphicObject {
  constructor(color) {
    super('Square');
    this.color = color;
  }
}

const drawing = new GraphicObject();
drawing.children.push(new Square('red'));
drawing.children.push(new Circle('blue'));

const group = new GraphicObject();
group.children.push(new Square('red'));
group.children.push(new Circle('blue'));
// Threated in a uniform matter.
drawing.children.push(group);
console.log(drawing.toString());

