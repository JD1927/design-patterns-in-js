/** 
 * We can have a hierarchy of objects and we can have a related hierarchy of types. Then what we can do is grouping the factories and expose them as some sort of list.
 */
import { createInterface } from 'readline';

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

class HotDrink {
  consume() {/* abstract */ }
}

class Tea extends HotDrink {
  consume() {
    console.log(`This tea is nice with lemon!`);
  }
}

class Coffee extends HotDrink {
  consume() {
    console.log(`This coffee is delicious!`);
  }
}

class HotDrinkFactory {
  prepare(amount) {/* abstract */ }
}

class TeaFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`Put in tea bag, boil water, pour ${amount}ml`);
    return new Tea(); // <-- Customize
  }
}
class CoffeeFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`Grind some beans, boil water, pour ${amount}ml`);
    return new Coffee(); // <-- Customize
  }
}

const AvailableDrink = Object.freeze({
  coffee: CoffeeFactory,
  tea: TeaFactory,
});

class HotDrinkMachine {
  constructor() {
    this.factories = {};
    for (const drink in AvailableDrink) {
      this.factories[drink] = new AvailableDrink[drink]();
    }
  }

  interact(consumer) {
    readline.question(
      `Please specify drink and amount (e.g. tea 50): `,
      answer => {
        const parts = answer.split(' ');
        const name = parts[0];
        const amount = parseInt(parts[1]);

        const drink = this.factories[name].prepare(amount);
        readline.close();
        consumer(drink);
      }
    );
  }

  // makeDrink(type, amount = 200) {
  //   switch (type) {
  //     case 'tea':
  //       return new TeaFactory().prepare(amount);
  //     case 'coffee':
  //       return new CoffeeFactory().prepare(500);
  //     default:
  //       throw new Error(`Do not know how to make this drink :s`);
  //   }
  // }
}

const machine = new HotDrinkMachine();
// readline.question(`Which drink do you want? - R/`, (answer) => {
//   const drink = machine.makeDrink(answer);
//   drink.consume();
//   readline.close();
// })
const callbackToExecuteInside = (drink) => drink.consume();
machine.interact(callbackToExecuteInside);