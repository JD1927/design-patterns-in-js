// Iterator Coding Exercise
// Given the following definition of a Node , please implement preorder traversal right inside Node. The sequence returned should be the sequence of values, not their containing nodes.

class Node {
  constructor(value, left = null, right = null) {
    // todo
    this.value = value;
    this.left = left;
    this.right = right;
  }

  *preorder() {
    function* traverse(current) {
      yield current;
      if (current.left) {
        for (const left of traverse(current.left)) {
          yield left;
        }
      }
      if (current.right) {
        for (const right of traverse(current.right)) {
          yield right;
        }
      }
    }
    for (const node of traverse(this)) {
      yield node.value;
    }
  }
}
//       a
//     /  \
//    b    e
//  /  \
// c    d

const node = new Node('a',
  new Node('b',
    new Node('c'),
    new Node('d'),
  ),
  new Node('e')
);


let values = [];
for (let value of node.preorder()) {
  values.push(value);
}

console.assert(values.join('') === 'abcde', `It was expecting 'abcde' and got ${values.join('')}`); console.log("🚀 ~ 'abcde' tree:", values.join(''));
