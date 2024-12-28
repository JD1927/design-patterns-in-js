/* 
Observer Coding Exercise

Imagine a game where one or more rats can attack a player. Each individual rat has an initial attack value of 1. However, rats attack as a swarm, so each rat's attack value is actually equal to the total number of rats in play.

Given that a rat enters play through the initializer and leaves play (dies) via its die() method, please implement the Game and Rat classes so that, at any point in the game, the attack value of a rat is always consistent.

Here's a sample unit test your code should pass:

let game = new Game();
let rat = new Rat(game);
let rat2 = new Rat(game);
expect(rat.attack).toEqual(2);
expect(rat2.attack).toEqual(2);
*/

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

class Game {
  // todo
  constructor() {
    this.ratAdded = new ObservableEvent();
    this.ratDead = new ObservableEvent();
    this.notifyRat = new ObservableEvent();
  }

  fireRatAdded(sender) {
    this.ratAdded.fire(sender, null);
  }

  fireRatDead(sender) {
    this.ratDead.fire(sender, null);
  }

  fireNotifyRat(sender, whichRat) {
    this.notifyRat.fire(sender, whichRat);
  }
}

class Rat {
  constructor(game) {
    // todo
    this.attack = 1;
    game.ratAdded.subscribe(this.handleRatAdded.bind(this));
    game.ratDead.subscribe(this.handleRatDead.bind(this));
    game.notifyRat.subscribe(this.handleNotifyRat.bind(this));

    game.ratAdded.fire(this);
    this.game = game;
  }

  handleRatAdded(sender, args) {
    if (sender !== this) {
      this.attack++;
      this.game.fireNotifyRat(this, sender);
    }
  }

  handleRatDead(sender, args) {
    this.attack--;
  }

  handleNotifyRat(sender, whichRat) {
    if (whichRat === this) this.attack++;
  }

  die() {
    this.game.fireRatDead(this);
  }
}

const game = new Game();
const rat = new Rat(game);
const rat2 = new Rat(game);
console.log(`rat.attack === 2`, rat.attack === 2);
console.assert(rat.attack === 2);
console.log(`rat2.attack === 2`, rat2.attack === 2);
console.assert(rat2.attack === 2);