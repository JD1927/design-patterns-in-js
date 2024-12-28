class BankAccountState {
  constructor(balance) {
    this.balance = balance;
  }

  toString() {
    return `BankAccountState ${this.balance}`;
  }
}
class BankAccount {
  constructor(balance = 0) {
    this.balance = balance;
    this.changes = [new BankAccountState(this.balance)];
    this.current = 0;
  }

  deposit(amount) {
    this.balance += amount;
    const state = new BankAccountState(this.balance);
    this.changes.push(state);
    this.current++;
    return state;
  }

  restore(state) {
    if (!state) return;

    this.balance = state.balance;
    this.changes.push(state);
    this.current = this.changes.length - 1;
  }

  undo() {
    if (this.current <= 0) return undefined; // Many ways to handle it.

    const state = this.changes[--this.current]; // Position before
    this.balance = state.balance;
    return state;
  }

  redo() {
    if (this.current + 1 > this.changes.length) return undefined; // Many ways to handle it.

    const state = this.changes[++this.current]; // Position after
    this.balance = state.balance;
    return state;
  }

  toString() {
    return `Balance: ${this.balance}`;
  }

}

const ba = new BankAccount(100);
ba.deposit(50);
ba.deposit(100);

console.table(ba.changes);
console.log("🚀 ~ Current:", ba.toString());

ba.undo();
console.log("🚀 ~ Undo 1: ", ba.toString());

ba.undo();
console.log("🚀 ~ Undo 2: ", ba.toString());

ba.redo();
console.log("🚀 ~ Redo 1: ", ba.toString());

ba.redo();
console.log("🚀 ~ Redo 2: ", ba.toString());