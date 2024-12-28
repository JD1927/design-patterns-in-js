/* 
Memento Coding Exercise

A TokenMachine is in charge of keeping tokens. Each Token  is a reference type with a single numeric value. The machine supports adding tokens and, when it does, it returns a memento representing the state of that system at that given time.

You are asked to fill in the gaps and implement the Memento design pattern for this scenario. Pay close attention to the situation where a token is fed in as a reference and its value is subsequently changed on that reference - you still need to return the correct system snapshot! 

*/

class Token {
  constructor(value = 0) {
    this.value = value;
  }
}

class TokenMachineState {
  constructor() {
    this.tokens = [];
  }
}

class TokenMachine {
  constructor() {
    // todo
    this.tokens = [];
  }

  addTokenValue(value) {
    return this.addToken(new Token(value));
  }

  addToken(token) {
    // todo
    const state = new TokenMachineState();
    this.tokens.push(new Token(token.value));
    state.tokens = [...this.tokens];
    return state;
  }

  revert(state) {
    // todo
    this.tokens = [...state.tokens];
  }
}

// TEST 1
console.log('TEST #1');
let tokenMachine = new TokenMachine();

let tokenMachineState = tokenMachine.addTokenValue(123);

tokenMachine.addTokenValue(456);

tokenMachine.revert(tokenMachineState);

console.assert(tokenMachine.tokens.length === 1);
console.assert(tokenMachine.tokens[0].value === 123);

// TEST 2
console.log('TEST #2');

tokenMachine = new TokenMachine();

tokenMachine.addTokenValue(1);

tokenMachineState = tokenMachine.addTokenValue(2);

tokenMachine.addTokenValue(3);

tokenMachine.revert(tokenMachineState);

console.assert(tokenMachine.tokens.length === 2);
console.assert(tokenMachine.tokens[0].value === 1);
console.assert(tokenMachine.tokens[1].value === 2);

// TEST 3
console.log('TEST #3');
tokenMachine = new TokenMachine();

console.log('made a token with value 111 and kept a reference');
let token = new Token(111);

console.log('added this token to the list');
tokenMachine.addToken(token);

const state = tokenMachine.addTokenValue(222);
console.log('changed this token\'s value to 333 :)');

token.value = 333;
tokenMachine.revert(state);

console.table(tokenMachine.tokens);

console.assert(tokenMachine.tokens.length === 2, `Expected 2 to equal ${tokenMachine.tokens.length}`);
console.assert(tokenMachine.tokens[0].value === 111, `Expected tokenMachine.tokens[0].value to equal 111 but it was ${tokenMachine.tokens[0].value}`);