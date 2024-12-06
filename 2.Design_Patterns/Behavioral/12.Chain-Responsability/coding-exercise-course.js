/* Chain of Responsibility Coding Exercise
You are given a game scenario with classes Goblin and GoblinKing. Please implement the following rules:

A goblin has base 1 attack/1 defense (1/1), a goblin king is 3/3.

When the Goblin King is in play, every other goblin gets +1 Attack.

Goblins get +1 to Defense for every other Goblin in play (a GoblinKing is a Goblin!).

Example:

Suppose you have 3 ordinary goblins in play. Each one is a 1/3 (1/1 + 0/2 defense bonus).

A goblin king comes into play. Now every goblin is a 2/4 (1/1 + 0/3 defense bonus from each other + 1/0 from goblin king)

The state of all the goblins has to be consistent as goblins are added and removed from the game.

Here is an example of the kind of test that will be run on the system:

let game = new Game();
let goblin = new Goblin(game);
expect(goblin.attack).toEqual(1);
expect(goblin.defense).toEqual(1);
Note: creature removal (unsubscription) does not need to be implemented. */

// Course solution

const WhatToQuery = Object.freeze({
  'Attack': 1,
  'Defense': 2
});

class Query {
  constructor(whatToQuery, result) {
    this.whatToQuery = whatToQuery;
    this.result = result;
  }
}

class Goblin {
  constructor(game, baseAttack = 1, baseDefense = 1) {
    this.game = game;
    this.game.creatures.push(this);
    this.baseAttack = baseAttack;
    this.baseDefense = baseDefense;
  }

  handleQuery(source, query) {
    if (source === this) {
      switch (query.whatToQuery) {
        case WhatToQuery.Attack:
          query.result += this.baseAttack;
          break;
        case WhatToQuery.Defense:
          query.result += this.baseDefense;
          break;
      }
    } else if (query.whatToQuery === WhatToQuery.Defense) {
      query.result++;
    }
  }

  get defense() {
    const query = new Query(WhatToQuery.Defense, 0);
    for (const creature of this.game.creatures) {
      creature.handleQuery(this, query);
    }
    return query.result;
  }

  get attack() {
    const query = new Query(WhatToQuery.Attack, 0);
    for (let creature of this.game.creatures) {
      creature.handleQuery(this, query);
    }
    return query.result;
  }
  toString() {
    return `Goblin (${this.attack}/${this.defense})`;
  }
}

class GoblinKing extends Goblin {
  constructor(game) {
    super(game, 3, 3);
  }

  handleQuery(source, query) {
    if (source !== this && query.whatToQuery === WhatToQuery.Attack) {
      query.result++;
    }
    super.handleQuery(source, query);
  }

  toString() {
    return `Goblin King (${this.attack}/${this.defense})`;
  }
}

class Game {
  constructor() {
    this.creatures = [];
  }

  toString() {
    let str = '';
    for (const creature of this.creatures) {
      str += `${creature.toString()}, `;
    }
    console.log("🚀 ~ Game ~ toString ~ str:", str);
  }
}


const game = new Game();
const goblin = new Goblin(game);
game.toString();
const goblin2 = new Goblin(game);
const goblin3 = new Goblin(game);
const goblinKing = new GoblinKing(game);
game.toString();