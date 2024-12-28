class ObservableEvent {
  constructor() {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler) {
    this.handlers.set(++this.count, handler);
    return this.count;
  }

  unsubscribe(key) {
    this.handlers.delete(key);
  }

  // 1. Who fired the event
  // 2. Additional data (event args)
  fire(sender, args) {
    this.handlers.forEach((handler, _) => handler(sender, args));
  }

}

class PropertyChangeArgs {
  constructor(name, newValue) {
    this.name = name;
    this.newValue = newValue;
  }
}

class Person {
  constructor(age) {
    this._age = age;
    this.propertyChanged = new ObservableEvent();
  }

  get age() {
    return this._age;
  }

  set age(value) {
    if (!value || this._age === value) return;

    this._age = value;
    this.propertyChanged.fire(this, new PropertyChangeArgs('age', value));
  }
}

class RegistrationChecker {
  constructor(person) {
    this.person = person;
    this.subscriptionKey = person.propertyChanged.subscribe(this.ageChange.bind(this));
  }

  ageChange(sender, args) {
    if (sender !== this.person || args.name !== 'age') return;

    if (args.newValue <= 13) {
      console.log(`Too young to register. Sorry!`);
      return;
    }

    console.log(`Okay, you can register`);
    sender.propertyChanged.unsubscribe(this.subscriptionKey);
  }
}

const person = new Person('Juan');
const checker = new RegistrationChecker(person);
for (let i = 10; i < 20; i++) {
  console.log(`Changing age to ${i}`);
  person.age = i;
}