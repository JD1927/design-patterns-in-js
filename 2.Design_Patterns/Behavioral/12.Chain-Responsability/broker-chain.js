class GameEvent {
  constructor() {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler) {
    this.handlers.set(this.count++, handler);
  }

  unsubscribe(index) {
    this.handlers.delete(index);
  }

  fire(sender, args) {
    this.handlers.forEach((value, key) => {
      value(sender, args);
    });
  }
}

const WhatToQuery = Object.freeze({
  'attack': 1,
  'defense': 2,
});

class Query {
  constructor(creatureName, whatToQuery, value) {
    this.creatureName = creatureName;
    this.whatToQuery = whatToQuery;
    this.value = value;
  }
}

class Game {
  constructor() {
    this.queries = new GameEvent();
  }

  performQuery(sender, query) {
    this.queries.fire(sender, query);
  }
}

class Creature {
  constructor(game, name, attack, defense) {
    this.game = game;
    this.name = name;
    this.initialAttack = attack;
    this.initialDefense = defense;
  }

  get attack() {
    const query = new Query(this.name, WhatToCommand.attack, this.initialAttack);
    this.game.performQuery(this, query);
    return query.value;
  }

  get defense() {
    const query = new Query(this.name, WhatToCommand.defense, this.initialDefense);
    this.game.performQuery(this, query);
    return query.value;
  }

  toString() {
    return `${this.name} (${this.attack}/${this.defense})`;
  }
}

class CreatureModifier {
  constructor(game, creature) {
    this.game = game;
    this.creature = creature;
    this.token = game.queries.subscribe(this.handle.bind(this));
  }

  handle(sender, query) {

  }
  dispose(sender, query) {
    this.token = game.commands.unsubscribe(this.token);
  }
}

class DoubleAttackModifier extends CreatureModifier {
  constructor(game, creature) {
    super(game, creature);
  }

  handle(sender, query) {
    if (query.creatureName === this.creature.name && query.whatToQuery === WhatToCommand.attack) {
      console.log(`Doubling ${query.creatureName}'s attack`);
      query.value *= 2;
    }
  }
}
class IncreaseDefenseModifier extends CreatureModifier {
  constructor(game, creature) {
    super(game, creature);
  }

  handle(sender, query) {
    if (query.creatureName === this.creature.name && query.whatToQuery === WhatToCommand.defense) {
      console.log(`Increasing ${query.creatureName}'s defense`);
      query.value++;
    }
  }
}

const game = new Game();
const goblin = new Creature(game, 'Strong Goblin', 3, 1);
console.log("🚀 ~ goblin:", goblin.toString());

const dam = new DoubleAttackModifier(game, goblin);
console.log("🚀 ~ goblin:", goblin.toString());
dam.dispose();

const idm = new IncreaseDefenseModifier(game, goblin);
console.log("🚀 ~ goblin:", goblin.toString());
idm.dispose();