// Mediator Coding Exercise
// Our system has any number of instances of Participant  classes. Each Participant has a value integer attribute, initially zero.

// A participant can say()  a particular value, which is broadcast to all other participants. At this point in time, every other participant is obliged to increase their value  by the value being broadcast.

// Example:

// Two participants start with values 0 and 0 respectively

// Participant 1 broadcasts the value 3. We now have Participant 1 value = 0, Participant 2 value = 3

// Participant 2 broadcasts the value 2. We now have Participant 1 value = 2, Participant 2 value = 3

class Mediator {
  constructor() {
    // todo
    this.participants = new Map();
  }

  broadcast(sourceKey, value) {
    for (let [key, participant] of this.participants) {
      if (sourceKey !== key) {
        participant.value = value;
      }
    }
  }

  print() {
    for (let [key, participant] of this.participants) {
      console.log(`Participant(${key + 1}) => ${participant.toString()}`);
    }
  }
}
class Participant {
  constructor(mediator) {
    // todo
    this.id = Participant.id++;
    this.mediator = mediator;
    this._value = 0;
    mediator.participants.set(this.id, this);
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
  }

  say(value) {
    this.mediator.broadcast(this.id, value);
  }

  toString() {
    return `${this.id} - ${this.value}`;
  }
}
Participant.id = 0;

let mediator = new Mediator();
let p1 = new Participant(mediator);
let p2 = new Participant(mediator);

console.assert(p1.value === 0);
console.assert(p2.value === 0);

p1.say(2);
mediator.print();

console.assert(p1.value === 0);
console.assert(p2.value === 2);

p2.say(4);
mediator.print();

console.assert(p1.value === 4);
console.assert(p2.value === 2);