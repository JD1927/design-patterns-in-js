/* # Motivation
- Complicated objects (cars) are not designed from scratch
  - They reiterate existing designs
- An existing (partially or fully constructed) design is a Prototype
- We make a copy (clone) the prototype and customize it
  - Requires 'deep copy' support
*/

/*
  Prototype: A partially or fully initialized object that you copy (clone) and make use of

  Summary:
  - To implement a prototype, partially construct an object and store it somewhere
  - Deep copy the prototype
  - Customize the resulting instance
  - A factory provides a convenient API for using prototypes

 */

// ==================Code==========================
class Serializer {
  constructor(types) {
    this.types = types;
  }

  markRecursive(obj) {
    const idx = this.types.findIndex(t => t.name === obj.constructor.name);

    if (idx === -1) return;
    obj['typeIndex'] = idx;

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        this.markRecursive(obj[key]);
      }
    }
  }

  clone(obj) {
    this.markRecursive(obj);
    const copy = JSON.parse(JSON.stringify(obj));
    return this.reconstructRecursive(copy);
  }

  reconstructRecursive(obj) {
    if (!obj.hasOwnProperty('typeIndex')) return obj;
    const type = this.types[obj.typeIndex];
    const _obj = new type();
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== null) {
        _obj[key] = this.reconstructRecursive(obj[key]);
      }
    }
    delete _obj.typeIndex;
    return _obj;
  }
}

class Address {
  constructor(street, city, country) {
    this.street = street;
    this.city = city;
    this.country = country;
  }
  toString() {
    return `Address: ${this.street}, ${this.city}, ${this.country}`;
  }
}

class Person {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  toString() {
    return `${this.name} lives at ${this.address.toString()}`;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}, I live at ${this.address.toString()}`);
  }
}
const john = new Person('John', new Address('Colombian street', 'Medellin', 'CO'));
const serializer = new Serializer([Person, Address]);

const jane = serializer.clone(john);
jane.name = 'Jane';
jane.address.street = 'Colombian street 2';

console.log("🚀 ~ john:", john.toString());
console.log("🚀 ~ jane:", jane.toString());

jane.greet();
