/* 
Interpreter Coding Exercise
You are asked to write an expression processor for simple numeric expressions with the following constraints:

Expressions use integral values (e.g., '13' ), single-letter variables defined in Variables, as well as + and - operators only

There is no need to support braces or any other operations

If a variable is not found in variables  (or if we encounter a variable with >1 letter, e.g. ab), the evaluator returns 0 (zero)

In case of any parsing failure, evaluator returns 0

Example:

calculate("1+2+3")  should return 6

calculate("1+2+xy")  should return 0

calculate("10-2-x")  when x=3 is in variables  should return 5 
*/

class ExpressionProcessor {
  constructor() {
    // todo
    this.variables = {};
  }

  splitWithoutRegex(expression) {
    const result = [];
    let buffer = [];

    for (const _char of expression) {
      if (['+', '-'].includes(_char)) {
        result.push(`${buffer.join('')}${_char}`);
        buffer = [];
      } else {
        buffer.push(_char);
      }
    }

    if (buffer.length > 0) result.push(buffer.join(''));

    return result;
  }

  calculate(expression) {
    // todo
    const tokens = this.splitWithoutRegex(expression);
    let nextOperation = '';
    let currentValue = 0;

    for (const token of tokens) {
      const [literal, _] = token.split(/[\+\-]/g);
      let value = 0;

      // Check for current value expression
      const intValue = parseInt(literal);
      if (!isNaN(intValue)) {
        value = intValue;
      } else if (this.variables[literal]) {
        value = this.variables[literal];
      } else {
        return 0;
      }
      // Check operation to make
      switch (nextOperation) {
        case '':
          currentValue = value;
          break;
        case '+':
          currentValue += value;
          break;
        case '-':
          currentValue -= value;
          break;
      }
      // Check following operation
      if (token.endsWith('+')) {
        nextOperation = '+';
      } else if (token.endsWith('-')) {
        nextOperation = '-';
      }
    }

    return currentValue;
  }
}

let ep = new ExpressionProcessor();
ep.variables['x'] = 5;
console.log("🚀 ~ ep.calculate('1+2-x'):", ep.calculate('1+2-x'));

console.assert(ep.calculate('1') === 1);
console.assert(ep.calculate('1+2') === 3);
console.assert(ep.calculate('1+x') === 6);
console.assert(ep.calculate('1+xy') === 0);