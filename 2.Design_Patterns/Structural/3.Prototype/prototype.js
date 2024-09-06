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
  -

 */

// ==================Code==========================
class Address {
  constructor(street, city, country) {
    this.street = street;
    this.city = city;
    this.country = country;
  }
  deepCopy() {
    return new Address(this.street, this.city, this.country);
  }
  toString() {
    return `Address: ${this.street}, ${this.city}, ${this.country}`
  }
}
class Person {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  deepCopy() {
    return new Person(
      this.name,
      this.address,
    )
  }

  toString() {
    return `${this.name} lives at ${this.address.toString()}`
  }
}

const john = new Person('John', new Address('Colombian street', 'Medellin', 'CO'));
const jane = john.deepCopy();
jane.name = 'Jane';
jane.address.street = 'Colombian street 2';
console.log("🚀 ~ john:", john.toString())
console.log("🚀 ~ jane:", jane.toString())

