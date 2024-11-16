// Composite Coding Exercise
// Consider the code presented below. We have two classes called SingleValue and ManyValues. SingleValue stores just one numeric value (initialized in the constructor), but ManyValues can store either numeric values or SingleValue objects (assume it implements a push() method for adding items).

// You are asked to write a function called sum that takes an array of items (any item can be either SingleValue or ManyValues).

// Here is a sample Jasmine unit test:

// describe('composite', function () {
//   it('should sum up different objects', function () {
//     const singleValue = new SingleValue(11);
//     const otherValues = new ManyValues();
//     otherValues.push(22);
//     otherValues.push(33);
//     expect(sum([singleValue, otherValues])).toEqual(66);
//   });
// });

class SingleValue {
  constructor(value) {
    // todo
    this.value = value;
  }
}

class ManyValues {
  // ensure there's a push(value) method
  constructor() {
    this.values = [];
  }
  push(value) {
    this.values.push(new SingleValue(value));
  }
}

let sum = function (containers) {
  // todo

  let total = 0;
  for (const container of containers) {
    if (container instanceof SingleValue) {
      total += container.value;
    } else if (container instanceof ManyValues) {
      for (const singleValue of container.values) {
        total += sum([singleValue]);
      }
    }
  }
  return total;
};

const singleValue = new SingleValue(11);
const otherValues = new ManyValues();
otherValues.push(22);
otherValues.push(33);

console.log("🚀 ~ sum([singleValue, otherValues]):", sum([singleValue, otherValues]));
