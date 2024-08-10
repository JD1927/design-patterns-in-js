class Person {
  constructor() {
    // address
    this.streetAddress = '';
    this.postcode = '';
    this.city = '';
    // employment
    this.companyName = '';
    this.position = '';
    this.annualIncome = 0;
  }

  toString() {
    return `Person lives at ${this.streetAddress}, ${this.city}, ${this.postcode}\n` +
      `and works at ${this.companyName} as a ${this.position} earning ${this.annualIncome}`;
  }
}

class PersonBuilder {
  constructor(person = new Person()) {
    this.person = person;
  }

  get lives() {
    return new PersonAddressBuilder(this.person);
  }

  get works() {
    return new PersonJobBuilder(this.person);
  }

  build() {
    return this.person;
  }
}

class PersonAddressBuilder extends PersonBuilder {
  constructor(person) {
    super(person);
  }

  at(streetAddress) {
    this.person.streetAddress = streetAddress;
    return this;
  }

  withPostcode(postcode) {
    this.person.postcode = postcode;
    return this;
  }

  in(city) {
    this.person.city = city;
    return this;
  }
}
class PersonJobBuilder extends PersonBuilder {
  constructor(person) {
    super(person);
  }

  at(companyName) {
    this.person.companyName = companyName;
    return this;
  }

  asA(position) {
    this.person.position = position;
    return this;
  }

  earning(annualIncome) {
    this.person.annualIncome = annualIncome;
    return this;
  }
}

const personBuilder = new PersonBuilder();
const person = personBuilder
  .lives.at('Street 123').in('Medellin').withPostcode('MED123')
  .works.at('DS Companies').asA('Software Developer').earning(200_000)
  .build();
console.log("🚀 ~ person:", person.toString());

