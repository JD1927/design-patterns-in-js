/* You are asked to implement the Builder design pattern for rendering simple chunks of code.

Sample use of the builder you are asked to create:

let cb = new CodeBuilder('Person');
cb.addField('name').addField('age');
console.log(cb.toString());
The expected output of the above code is:

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
Please observe the same placement of spaces and indentation. */

class CodeBuilder {
  static get indentSize() { return 2 }
  constructor(className) {
    // todo
    this.className = className;
    this.fields = [];
  }

  addField(name) {
    // todo
    // reminder: we want a fluent interface
    this.fields.push(name);
    return this;
  }

  toStringImplementation(indent) {
    if (!this.className) throw new Error('Cannot generate output without a class!');

    const codeLines = [];
    const spaces = (indent) => ' '.repeat(indent * CodeBuilder.indentSize);

    codeLines.push(`class ${this.className} {\n`);// Class name
    if (this.fields.length > 0) {
      codeLines.push(`${spaces(indent + 1)}constructor(${this.fields.join(', ')}) {\n`); // Constructor
      for (const field of this.fields) {// Fields
        codeLines.push(`${spaces(indent + 2)}this.${field} = ${field};\n`);
      }
      codeLines.push(`${spaces(indent + 1)}}\n`); // Closing constructor
    }
    codeLines.push(`}`); // Closing class

    return codeLines.join(''); // Glue them together;
  }


  toString() {
    // todo
    return this.toStringImplementation(0);
  }
}

const cb = new CodeBuilder('Person');
// cb.addField('name').addField('age');
console.log(cb.toString());