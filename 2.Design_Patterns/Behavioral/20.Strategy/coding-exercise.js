/* Strategy Coding Exercise
A creature is walking through the dungeon. It is expected to have the following attributes:

attack is its attack value

health is its health value

alive indicates whether the creature is alive or not

The creature is part of a game that involves traps. When a creature springs a trap, two things can happen:

In a ConstantDamageStrategy, the creature's health is reduced by exactly 1 (one) point. So if a creature had 5 health and it springs a trap, it now has 4 health.

In a GrowingDamageStrategy, each spring trap does 1 more damage to the creature than the previous one. So the creature takes 1 damage on the first trap, 2 on the second, 3 on the third, and so on.

Please help complete the implementation of both Creature and associated strategies using the provided implementation. */
class Creature {
  constructor(attack, health) {
    this.attack = attack;
    this.health = health;
    this.alive = this.health > 0;
    // todo
    this.trapsFallen = 0;
  }
}

class Game {
  constructor(damageStrategy) {
    this.damageStrategy = damageStrategy;
  }

  springTrapOn(creature) {
    this.damageStrategy.damage(creature);
    return creature.alive;
  }
}

class DamageStrategy {
  damage(creature) {
    if (creature.health <= 0) {
      creature.alive = false;
    }
  }
}

class ConstantDamageStrategy extends DamageStrategy {
  constructor() {
    super();
  }
  damage(creature) {
    // todo
    if (!creature.alive) return;
    creature.health--;
    creature.trapsFallen++;
    super.damage(creature);
  }
}

class GrowingDamageStrategy extends DamageStrategy {
  constructor() {
    super();
  }
  damage(creature) {
    // todo
    if (!creature.alive) return;
    creature.health -= ++creature.trapsFallen;
    super.damage(creature);
  }
}


let cg = new Game(new ConstantDamageStrategy());
let c = new Creature(1, 3);

console.assert(c.health === 3);
console.assert(c.alive === true);
cg.springTrapOn(c);
console.assert(c.health === 2);
console.assert(c.alive === true);
cg.springTrapOn(c);
console.assert(c.health === 1);
console.assert(c.alive === true);
cg.springTrapOn(c);
console.assert(c.health === 0);
console.assert(c.alive === false);

cg = new Game(new GrowingDamageStrategy());
c = new Creature(1, 3);

console.assert(c.health === 3);
console.assert(c.alive === true);

cg.springTrapOn(c);

console.assert(c.health === 2);
console.assert(c.alive === true);

cg.springTrapOn(c);

console.assert(c.health === 0);
console.assert(c.alive === false);

console.log('two creatures are used here...');
cg = new Game(new GrowingDamageStrategy());
let c1 = new Creature(1, 3);
let c2 = new Creature(1, 3);

console.log('springing a trap on both creatures');
console.log('expecting each creature to be damaged by 1');
cg.springTrapOn(c1);
cg.springTrapOn(c2);

console.assert(c1.health === 2);
console.assert(c1.alive === true);
console.assert(c2.health === 2);
console.assert(c2.alive === true);

cg.springTrapOn(c2);

console.assert(c2.health === 0);
console.assert(c2.alive === false);