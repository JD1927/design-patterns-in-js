/* # Motivation
- For some components it only makes sense to have one in the system
    - Database repository
    - Object factory
- E.g the constructor call is expensive
    - We want initialization to only happen once
    - We provide everyone with the same instance
- Want to prevent anyone creating additional copies
*/

/*
  Singleton: A component which is instantiated only once!

  Summary:
  - A constructor can choose what to return; we can keep returning same instance
  - Mono-state: many instances shared data - Not recommended
  - Directly depending on the Singleton is a bad idea; introduce a dependency instead
 */

// ==================Code==========================
class Singleton {
  constructor() {
    const instance = this.constructor.instance;
    if (instance) {
      return instance;
    }
    this.constructor.instance = this;
  }

  foo() {
    console.log('Doing something...');

  }
}

const s1 = new Singleton();
const s2 = new Singleton();

console.log('Are they identical?' + (s1 === s2));

s1.foo();