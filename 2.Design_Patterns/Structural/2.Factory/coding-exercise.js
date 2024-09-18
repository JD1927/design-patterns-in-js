class Person {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class PersonFactory {
  constructor() {
    this.id = 0;
  }
  createPerson(name) {
    // todo
    return new Person(this.id++, name);
  }
}

const pf = new PersonFactory();

console.log(pf.createPerson('Juan'));
console.log(pf.createPerson('John'));