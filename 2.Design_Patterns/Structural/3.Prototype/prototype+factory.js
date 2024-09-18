// ==================Code==========================
class Serializer {
  constructor(types) {
    this.types = types;
  }

  markRecursive(obj) {
    if (!obj) return;
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
  constructor(suite, streetAddress, city) {
    this.suite = suite;
    this.streetAddress = streetAddress;
    this.city = city;
  }
  toString() {
    return `Suite: ${this.suite}, ${this.streetAddress}, ${this.city}`;
  }
}

class Employee {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  toString() {
    return `${this.name} works at ${this.address.toString()}`;
  }
}

class EmployeeFactory {
  static _newEmployee(proto, name, suite) {
    const copy = EmployeeFactory.serializer.clone(proto);
    copy.name = name;
    copy.address.suite = suite;
    return copy;
  }

  static newMainOfficeEmployee(name, suite) {
    return this._newEmployee(
      EmployeeFactory.main, name, suite,
    );
  }

  static newAuxOfficeEmployee(name, suite) {
    return this._newEmployee(
      EmployeeFactory.aux, name, suite,
    );
  }
}
EmployeeFactory.serializer = new Serializer([Employee, Address]);
EmployeeFactory.main = new Employee(null, new Address(null, '123 Colombian Street', 'Medellin'));
EmployeeFactory.aux = new Employee(null, new Address(null, '200 Colombian Street', 'Sabaneta'));

const john = EmployeeFactory.newMainOfficeEmployee('John', 4243);
const jane = EmployeeFactory.newAuxOfficeEmployee('Jane', 422);

console.log("🚀 ~ john:", john.toString());
console.log("🚀 ~ jane:", jane.toString());