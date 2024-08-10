const Relationship = Object.freeze({
  parent: 0,
  child: 1,
  sibling: 2,
});

class Person {
  constructor(name) {
    this.name = name;
  }
}

// Low Level Module
class RelationshipBrowser {
  constructor() {
    if (this.constructor.name === 'RelationshipBrowser') {
      throw new Error('RelationshipBrowser is abstract!');
    }
  }

  findAllChildrenOf(name) { }
}

class Relationships extends RelationshipBrowser {
  constructor() {
    super();
    this.data = [];
  }

  addParentAndChild(parent, child) {
    this.data.push({
      from: parent,
      type: Relationship.parent,
      to: child,
    });
  }

  findAllChildrenOf(name) {
    return this.data
      .filter(r => r.from.name === name && r.type === Relationship.parent)
      .map(r => r.to);
  }
}

// High Level Module - Getting the data out

class Research { // Abstract classes/interfaces
  // constructor(relationships) {
  //   // Find all children of Juan
  //   const relations = relationships.data;// Using Low Level Storage
  //   for (const rel of relations.filter(r => r.from.name === 'Juan' && r.type === Relationship.parent)) {
  //     console.log(`Juan has a child named ${rel.to.name}`);
  //   }
  // }

  constructor(browser) {
    for (const child of browser.findAllChildrenOf('Juan')) {
      console.log(`Juan has a child named ${child.name}`);
    }
  }

}


const parent = new Person('Juan');
const child1 = new Person('Juan Jr. 1');
const child2 = new Person('Juan Jr. 2');

const relationships = new Relationships();

relationships.addParentAndChild(parent, child1);
relationships.addParentAndChild(parent, child2);

new Research(relationships);
