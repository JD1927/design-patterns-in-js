/* # Motivation
- Ordinary statements are perishable
    - Cannot undo member assignment
    - Cannot directly serialize a sequence of actions (calls)
- Want an object that represents an operation
    - person should change its age to value 22
    - car should do explode()
- Uses: GUI commands, multi-level undo/redo, macro recording and more!

*/

/*
  Command: An object which represents an instruction to perform a particular action. Contains all the information necessary for the action to be taken.

  Summary:
  - Encapsulate all details of an operation in a separated object
  - Define instruction for applying the command (either in the command itself, or elsewhere)
  - Optionally define instructions for undoing the command
  - Can create composite commands aka "macros"
 */

// ==================Code==========================
class BankAccount {
  constructor(balance = 0) {
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`Deposited ${amount}, remaining balance: ${this.balance}`);
    return true;
  }


  withdraw(amount) {
    const withdrawal = this.balance - amount;
    if (this.balance - amount >= BankAccount.overdraftLimit && withdrawal >= 0) {
      this.balance -= amount;
      console.log(`Withdrew ${amount}, remaining balance: ${this.balance}`);
      return true;
    }
    return false;
  }

  toString() {
    return `Current balance ${this.balance}`;
  }
}
BankAccount.overdraftLimit = -500;

const Action = Object.freeze({
  'Deposit': 1,
  'Withdraw': 2,
});

class BankAccountCommand {
  constructor(account, action, amount) {
    this.account = account;
    this.action = action;
    this.amount = amount;
    this.hasSucceeded = false;
  }

  call() {
    switch (this.action) {
      case Action.deposit:
        this.hasSucceeded = this.account.deposit(this.amount);
        break;
      case Action.withdraw:
        this.hasSucceeded = this.account.withdraw(this.amount);
        break;

      default:
        throw new Error('There is not implementation for this action yet!');
    }
  }

  undo() {
    if (!this.hasSucceeded) return;
    switch (this.action) {
      case Action.deposit:
        this.this.account.withdraw(this.amount);
        break;
      case Action.withdraw:
        this.account.deposit(this.amount);
        break;

      default:
        throw new Error('There is not implementation for this action yet!');
    }
  }
}

const bankAccount = new BankAccount(100);
const command = new BankAccountCommand(bankAccount, Action.withdraw, 650);
command.call();
console.log(bankAccount.toString());
command.undo();
console.log(bankAccount.toString());