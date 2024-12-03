// Decorator Coding Exercise

// You are given two classes, Bird and Lizard, that both take the creature's age and allow the creature to fly/crawl (or not) depending on its age.

// Please create a decorator called Dragon that acts as both a bird and a lizard, i.e., it has an age value and can both fly() and crawl(), reusing the original classes' functionality.

class Bird {
  constructor(age = 0) {
    this.age = age;
  }

  fly() {
    return this.age < 10 ? 'flying' : 'too old';
  }
}

class Lizard {
  constructor(age = 0) {
    this.age = age;
  }

  crawl() {
    return this.age > 1 ? 'crawling' : 'too young';
  }
}

class Dragon {
  constructor(age = 0) {
    // todo
    this.bird = new Bird(age);
    this.lizard = new Lizard(age);
  }

  set age(age) {
    this.bird.age = age;
    this.lizard.age = age;
  }

  get age() {
    const birdAge = this.bird.age;
    const lizardAge = this.lizard.age;
    return birdAge === lizardAge ? birdAge : 0;
  }

  // todo: API members
  fly() {
    return this.bird.fly();
  }
  crawl() {
    return this.lizard.crawl();
  }
}