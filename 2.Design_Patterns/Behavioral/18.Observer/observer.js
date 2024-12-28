/* # Motivation
- We need to be informed when certain things happen
    - Object's property changes
    - Object does something
    - Some external event occurs
- We want to listen to events and be notified when they occur
    - Notifications should include useful data
- Want to unsubscribe from events if we're not longer interested
*/

/*
  Observer: An observer is an object that wishes to be informed about events happening in the system. The entity generating the events is an observable

  Summary:
  - Observer is an intrusive approach: An observable must provide an event to subscribe to
  - Subscription and unsubscription handled with addition/removal of items in a list
  - Property notifications are easy; dependent property notifications are tricky
 */

// ==================Code==========================
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

class FallsIllArgs {
  constructor(address) {
    this.address = address;
  }
}

class Person {
  constructor(address) {
    this.address = address;
    this.fallsIll = new ObservableEvent();
  }

  catchCold() {
    this.fallsIll.fire(this, new FallsIllArgs(this.address));
  }
}


const person = new Person('Any Colombian Avenue');
const subscriptionKey = person.fallsIll.subscribe((sender, args) => console.log(`A doctor has been called to ${args.address}`));

person.catchCold();
person.catchCold();

person.fallsIll.unsubscribe(subscriptionKey);
person.catchCold();