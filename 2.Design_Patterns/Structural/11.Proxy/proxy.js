/* # Motivation
- You are calling foo.Bar()
- This assumes that foo is in the same process as Bar()
- What if, later on, you want to put all Foo-related operations into a separate process
    - Can you avoid changing your code?
- Proxy to the rescue!
    - Same interface, entirely different behavior
- This is called a communication proxy
    - Other types: logging, virtual, guarding,...


*/

/*
  Proxy: An interface for accessing a particular resource

  A class that functions as an interface to a particular resource. That resource may be remote, expensive to construct, or may require logging or some other added functionality

  Summary: 
  - A proxy has the same interface as the underlying object
  - To create a proxy, simply replicate the existing interface of an object
  - Add relevant functionality to the redefined member functions
  - Different proxies (communication, logging, caching, etc) have completely different behaviors
 */

// ==================Code==========================
// Value Proxy
class Percentage {
  constructor(percent) {
    this.percent = percent; // 0-100
  }

  toString() {
    return `${this.percent}%`;
  }

  valueOf() {
    return this.percent / 100;
  }
}

const fivePercent = new Percentage(5);
console.log(fivePercent.toString());
console.log(`🚀 ~ 5% of 50 is ${50 * fivePercent}`);

// Property Proxy
class Property {
  constructor(value, name = '') {
    this._value = value;
    this.name = name;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    if (this._value === newValue) return;
    console.log(`Assigning ${newValue} to ${this.name}`);
    this._value = newValue;
  }
}
class Creature {
  constructor() {
    this._agility = new Property(10, 'agility');
  }

  get agility() {
    return this._agility.value;
  }
  set agility(newValue) {
    return this._agility.value = newValue;
  }
}

const creature = new Creature();
creature.agility = 12;
creature.agility = 13;

// Protection Proxy
class Car {
  drive() {
    console.log(`Car is being driven`);
  }
}

class CarDriver {
  constructor(driver) {
    this.driver = driver;
    this._car = new Car();
  }

  drive() {
    if (this.driver.age >= 16) {
      this._car.drive();
    } else {
      console.log(`Driver too young`);
    }
  }
}

class Driver {
  constructor(age) {
    this.age = age;
  }
}

const car = new Car();
car.drive();

const carDriver = new CarDriver(new Driver(12));
carDriver.drive();

const carDriverTwo = new CarDriver(new Driver(18));
carDriverTwo.drive();

// Virtual Proxy
class ImageLoader {
  constructor(url) {
    this.url = url;
    console.log(`Loading image from ${url}`);
  }

  draw() {
    console.log(`Drawing image from ${this.url}`);
  }
}

class LazyImage {
  constructor(url) {
    this.url = url;
  }

  draw() {
    if (!this.image) {
      this.image = new ImageLoader(this.url);
    }
    this.image.draw();
  }
}

function drawImage(img) {
  console.log(`About to draw the image`);
  img.draw();
  console.log(`Done drawing the image`);
}

// const img = new ImageOne('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');

// drawImage(img);

const lazyImage = new LazyImage('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');

// drawImage(lazyImage);