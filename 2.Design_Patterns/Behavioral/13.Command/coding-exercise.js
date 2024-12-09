/* 
Command Coding Exercise
Implement the Account.process()  method to process different account commands.

The rules are obvious:

success indicates whether the operation was successful

You can only withdraw money if you have enough in your account 
*/


const Action = Object.freeze({
  deposit: 0,
  withdraw: 1
});

class Command {
  constructor(action, amount) {
    this.action = action;
    this.amount = amount;
    this.success = false;
  }
}

class Account {
  constructor() {
    this.balance = 0;
  }

  process(cmd) {
    switch (cmd.action) {
      case Action.deposit:
        cmd.success = this.deposit(cmd.amount);
        break;
      case Action.withdraw:
        cmd.success = this.withdraw(cmd.amount);
        break;

      default:
        throw new Error('There is not implementation for this action yet!');
    }
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`Deposited ${amount}, remaining balance: ${this.balance}`);
    return true;
  }


  withdraw(amount) {
    if (this.balance - amount >= 0) {
      this.balance -= amount;
      console.log(`Withdrew ${amount}, remaining balance: ${this.balance}`);
      return true;
    }
    return false;
  }
}

const account = new Account();

console.log('depositing $100');
let command = new Command(Action.deposit, 100);
account.process(command);

console.assert(account.balance === 100);
console.assert(command.success === true);

console.log('withdrawing $50');
command = new Command(Action.withdraw, 50);
account.process(command);

console.assert(account.balance === 50);
console.assert(command.success === true);

console.log('attempting to withdraw $150');
command.amount = 150;
account.process(command);

console.assert(account.balance === 50);
console.assert(command.success === false);