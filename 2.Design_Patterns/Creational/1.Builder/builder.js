/* # Motivation
- Some objects are simple and can be created in a single initializer call
- Other objects require a lot of ceremony to create
- Having an object with 10 initializer arguments is not productive
- Instead, we should opt out for piecewise construction
- Build provides an API for constructing an object step-by-step
*/

/* 
  Builder: When piece wise object construction is complicated, provide and API for doing it succinctly

  Summary:
  - A builder is a separate component for building an object
  - Can either give builder an initializer or return it via a static function
  - To make builder fluent, return self
  - Different facets of an object can be built with different builders working in tandem via a base class
 */



// ==================Code==========================
class Tag {
  static get indentSize() { return 2; }

  constructor(name = '', text = '') {
    this.name = name;
    this.text = text;
    this.children = [];
  }

  toStringImplementation(indent) {
    const html = [];
    const spaces = '  '.repeat(indent * Tag.indentSize);

    html.push(`${spaces}<${this.name}>\n`);// Opening tag

    if (this.text.length > 0) {
      html.push('  '.repeat(Tag.indentSize * (indent + 1)));
      html.push(this.text);
      html.push('\n');
    }

    // If it has children
    for (const child of this.children) {
      html.push(child.toStringImplementation(indent + 1));
    }

    html.push(`${spaces}</${this.name}>\n`);// Closing tag

    return html.join('');
  }

  toString() {
    return this.toStringImplementation(0);
  }

  static create(name) {
    return new HtmlBuilder(name);
  }

}

class HtmlBuilder {
  constructor(rootName) {
    this.root = new Tag(rootName);
    this.rootName = rootName;
  }

  // non-fluent
  addChild(childName, childText) {
    const child = new Tag(childName, childText);
    this.root.children.push(child);
  }

  // fluent
  addChildFluent(childName, childText) {
    let child = new Tag(childName, childText);
    this.root.children.push(child);
    return this;
  }

  toString() {
    return this.root.toString();
  }

  clear() {
    this.root = new Tag(this.rootName);
  }

  build() {
    return this.root;
  }
}

const hello = 'Hello';
let html = [];

html.push(`<p>`);
html.push(hello);
html.push(`</p>`);

console.log(html.join(''));

const words = ['hello', 'world'];

html = [];
html.push('<ul>\n');
for (const word of words) {
  html.push(`  <li>${word}</li>\n`);
}
html.push('</ul>');

console.log(html.join(''));

// const builder = new HtmlBuilder('ul');
const builder = Tag.create('ul');

for (const word of words) {
  builder.addChild('li', word);
}
console.log(builder.root.toString());

builder.clear();
builder
  .addChildFluent('li', 'foo')
  .addChildFluent('li', 'bar')
  .addChildFluent('li', 'baz');

console.log(builder.toString());