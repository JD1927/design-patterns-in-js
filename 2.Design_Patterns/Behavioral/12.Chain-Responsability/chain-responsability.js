/* # Motivation
- Unethical behavior by an employee; who takes the blame?
    - Employee
    - Manager
    - CEO
- You click a graphical element on a form
    - Button handles it, stops further processing
    - Underlying group box
    - Underlying window
- CCG Computer Game
    - Creature has attack and defense values
    - Those can be boosted by other cards

*/

/*
  Chain of Responsibility: Sequence of handlers processing an event one after another.

  A Chain of components who all get a chance to process a command or a query, optionally having a default processing implementation and ability to terminate the processing chain.

  Command Query Separation

  Command: Asking for an action or change
  Query: Asking for information
  CQS: Having separate means of sending commands and queries to. 


  Summary: 
  - Chain of Responsibility can be implemented as a chain of references or a centralized construct
  - Enlist objects in the chain, possibly controlling their order/priority
  - In a linked-list implementation, one member can impede further processing
  - Support removal of objects from the chain (lifetime control)
 */

// ==================Code==========================
class Creature {
  constructor(name, attack, defense) {
    this.name = name;
    this.attack = attack;
    this.defense = defense;
  }

  toString() {
    return `${this.name} (${this.attack}/${this.defense})`;
  }
}

class CreatureModifier {
  constructor(creature) {
    this.creature = creature;
    this.next = null;// Linked list
  }

  add(modifier) {
    if (this.next) {
      this.next.add(modifier);
    } else {
      this.next = modifier;
    }
  }

  handle() {
    if (this.next) {
      this.next.handle();
    }
  }
}

class DoubleAttackModifier extends CreatureModifier {
  constructor(creature) {
    super(creature);

  }

  handle() {
    console.log(`Doubling ${this.creature.name}'s attack`);
    this.creature.attack *= 2;
    super.handle();
  }
}

class IncreaseDefenseModifier extends CreatureModifier {
  constructor(creature) {
    super(creature);
  }

  handle() {
    if (this.creature.attack <= 2) {
      console.log(`Increasing ${this.creature.name}'s defense`);
      this.creature.defense++;
    }
    super.handle();
  }
}

class NoBonusesModifier extends CreatureModifier {
  constructor(creature) {
    super(creature);
  }

  handle() {
    console.log(`No bonuses for ${this.creature.name}`);
  }
}

const goblin = new Creature('Goblin', 1, 1);
console.log("🚀 ~ goblin:", goblin.toString());

const rootCreatureModifier = new CreatureModifier(goblin);
// rootCreatureModifier.add(new NoBonusesModifier(goblin)); // Does not follow the rest of the chain
rootCreatureModifier.add(new DoubleAttackModifier(goblin));
rootCreatureModifier.add(new IncreaseDefenseModifier(goblin));
rootCreatureModifier.handle();
console.log("🚀 ~ goblin:", goblin.toString());
