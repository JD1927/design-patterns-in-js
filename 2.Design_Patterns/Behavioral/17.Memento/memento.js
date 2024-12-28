/* # Motivation
- An object or system goes through changes
    - E.g., a bank account gets deposits and withdrawals
- There are different ways of navigating those changes
- One way is to record every change (Command pattern) and teach a command to 'undo' itself
- 
*/

/*
  Memento: Keep a memento of an object's state to return that state

  A token/handle representing the system state. Lets us roll back to the state when the token was generated. May or may not directly expose state information.

  Summary:
  - Mementos are used to roll back states arbitrarily
  - A memento is simple a token/handle class with (typically) no functions of its own
  - A memento is not required to expose directly the state(s) to which it reverts the system
  - Can be used to implement undo/redo
 */

// ==================Code==========================
class BankAccountState {
  constructor(balance) {
    this.balance = balance;
  }
}
class BankAccount {
  constructor(balance = 0) {
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    return new BankAccountState(this.balance);
  }

  restore(state) {
    this.balance = state.balance;
  }

  toString() {
    return `Balance: ${this.balance}`;
  }

}

const ba = new BankAccount(100);
const ba_s1 = ba.deposit(50);
const ba_s2 = ba.deposit(100);

console.log("🚀 ~ bank account:", ba.toString());

ba.restore(ba_s1);
console.log("🚀 ~ bank account:", ba.toString());

ba.restore(ba_s2);
console.log("🚀 ~ bank account:", ba.toString());