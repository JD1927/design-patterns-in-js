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

    const oldCanVote = this.canVote;

    this._age = value;
    this.propertyChanged.fire(this, new PropertyChangeArgs('age', value));

    if (oldCanVote !== this.canVote) {
      this.propertyChanged.fire(this, new PropertyChangeArgs('canVote', this.canVote));
    }
  }

  get canVote() {
    return this._age >= 16;
  }
}

class VotingChecker {
  constructor(person) {
    this.person = person;
    this.person.propertyChanged.subscribe(this.votingChanged.bind(this));
  }

  votingChanged(sender, args) {
    if (sender !== this.person || args.name !== 'canVote') return;

    console.log(`Voting status changed to ${args.newValue}`);
  }
}


const person = new Person('Juan');
const checker = new VotingChecker(person);
for (let i = 10; i < 20; i++) {
  console.log(`Changing age to ${i}`);
  person.age = i;
}