/* # Motivation
- Iteration (traversal) is a core functionality of various data structures
- An iterator is a class that facilitates the traversal
    - Keeps a reference to the current element
    - Knows how to move to a different element
    - Knows when it's done and there are no elements to move to
- Javascript supports this through:
    - Symbol.iterator member that returns
    - An iterator object with a function called next() that returns an object containing:
        - The value being iterated
        - The done flag indicating whether iteration is finished
      - An iterator object itself can also be made iterable
*/

/*
  Iterator: An object that facilitates the traversal of a data structure

  Summary:
  - An iterator specified how you can traverse and object
  - Stateful iterators cannot be recursive
  - yield allows for much more succinct iteration
 */

// ==================Code==========================
class Creature {
  constructor() {
    // this.strength = this.agility = this.intelligence = 10;
    this.stats = new Array(3).fill(10);
  }

  get strength() {
    return this.stats[0];
  }
  set strength(value) {
    this.stats[0] = value;
  }
  get agility() {
    return this.stats[1];
  }
  set agility(value) {
    this.stats[1] = value;
  }
  get intelligence() {
    return this.stats[2];
  }
  set intelligence(value) {
    this.stats[2] = value;
  }

  get sumOfStats() {
    return this.stats.reduce((x, y) => x + y, 0);
  }

  get averageStat() {
    return this.sumOfStats / this.stats.length;
  }

  get maxStat() {
    return Math.max(...this.stats);
  }

  // get sumOfStats() {
  //   return this.strength + this.agility + this.intelligence;
  // }

  // get averageStat() {
  //   return this.sumOfStats / 3.0;
  // }

  // get maxStat() {
  //   return Math.max(this.strength, this.agility, this.intelligence);
  // }
}

const creature = new Creature();
creature.strength = 10;
creature.agility = 11;
creature.intelligence = 15;
console.log("🚀 ~ creature has average stat:", creature.averageStat);
console.log("🚀 ~ creature has max stat:", creature.maxStat);
console.log("🚀 ~ creature has sum of stats:", creature.sumOfStats);

// ==================================================================================

class Stuff {
  constructor() {
    this.a = 11;
    this.b = 22;
  }

  get backwards() {
    let counter = 0;
    const self = this;
    return {
      next: () => {
        return {
          done: counter > 1,
          value: self[counter++ === 0 ? 'b' : 'a']
        };
      },
      [Symbol.iterator]: function () { return this; }
    };
  }
}

const values = [100, 200, 300];
for (const idx in values) {
  console.log(`🚀 ~ values[${idx}] = ${values[idx]}`);
}
for (const value of values) {
  console.log(`🚀 ~ value = ${value}`);
}

const stuff = new Stuff();

for (const item of stuff.backwards) {
  console.log(`🚀 ${item}`);
}

// ==================================================================================

class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.parent = null;

    if (this.left) {
      left.parent = this;
    }
    if (this.right) {
      right.parent = this;
    }
  }
}

function makeInOrderIterator(root) {
  let current = root;
  while (current.left) {
    current = current.left;
  }
  let yielded = false;

  return {
    next: function () {
      if (!yielded) {
        yielded = true;
        return {
          value: current,
          done: false,
        };
      }
      if (current.right) {
        current = current.right;
        while (current.left) {
          current = current.left;
        }
        return {
          value: current,
          done: false,
        };
      } else {
        let parent = current.parent;
        while (parent && current === parent.right) {
          current = parent;
          parent = parent.parent;
        }
        current = parent;
        return {
          value: current,
          done: current === null,
        };
      }
    },
    [Symbol.iterator]: function () { return this; }
  };

}

class BinaryTree {
  constructor(rootNode) {
    this.rootNode = rootNode;
  }

  [Symbol.iterator]() {
    return makeInOrderIterator(this.rootNode);
  }

  *betterInOrder() {
    function* traverse(current) {
      if (current.left) {
        for (const left of traverse(current.left)) {
          yield left;
        }
      }
      yield current;
      if (current.right) {
        for (const right of traverse(current.right)) {
          yield right;
        }
      }
    }
    for (const node of traverse(this.rootNode)) {
      yield node;
    }
  }
}


//   1
//  / \
// 2   3
// in-order = 213
// pre-order = 123
// post-order = 231

const root = new Node(1, new Node(2), new Node(3));

let it = makeInOrderIterator(root);
// let result = it.next();
// while (!result.done) {
//   console.log(result.value.value);
//   result = it.next();
// }

for (const node of new BinaryTree(root).betterInOrder()) {
  console.log(node.value);
}