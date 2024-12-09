/* # Motivation
- Textual input need to be processed
    - E.g turned into OOP structures
- Some examples
    - Programming language compilers, interpreters and IDE's
    - HTML, XML and similar
    - Numeric expressions
    - Regular expressions
- Turning strings into OOP based structures in a complicated process
*/

/*
  Interpreter: A component that processes structured text data. Does so by turning it into separate lexical tokens (lexing) and then interpreting sequences of said tokens parsing.

  Summary:
  - Barring simple cases, an interpreter acts in two stages
  - Lexing turns text into a set of tokens
  - Parsing tokens into meaningful constructs
  - Parsed data can then be traversed
 */

// ==================Code==========================
const TokenType = Object.freeze({
  Integer: 0,
  Plus: 1,
  Minus: 2,
  LeftParen: 3,
  RightParen: 4
});

class Integer {
  constructor(value) {
    this.value = value;
  }
}

const Operation = Object.freeze({
  Addition: 0,
  Subtraction: 1,
});

class BinaryOperation {
  constructor() {
    this.left = null;
    this.operator = null;
    this.right = null;
  }

  get value() {
    const left = this.left.value;
    const right = this.right.value;

    switch (this.operator) {
      case Operation.Addition:
        return left + right;
      case Operation.Subtraction:
        return left - right;
    }
    return 0;
  }
}

class Token {
  constructor(type, text) {
    this.type = type;
    this.text = text;
  }

  toString() {
    return `'${this.text}'`;
  }
}

function lex(input) {
  input = input.replaceAll(' ', '');
  console.log(input);

  const result = [];
  for (let i = 0; i < input.length; ++i) {
    const text = input[i];
    switch (text) {
      case '+':
        result.push(new Token(TokenType.Plus, text));
        break;
      case '-':
        result.push(new Token(TokenType.Minus, text));
        break;
      case '(':
        result.push(new Token(TokenType.LeftParen, text));
        break;
      case ')':
        result.push(new Token(TokenType.RightParen, text));
        break;
      default:
        let buffer = [input[i]];
        for (let j = i + 1; j < input.length; ++j) {
          if ('0123456789'.includes(input[j])) {
            buffer.push(input[j]);
            ++i;
          } else {
            result.push(new Token(TokenType.Integer, buffer.join('')));
            break;
          }
        }
        break;
    }
  }
  return result;
}

function parse(tokens) {
  let result = new BinaryOperation();
  let haveLHS = false;

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];

    switch (token.type) {
      case TokenType.Integer:
        const integer = new Integer(parseInt(token.text));
        if (!haveLHS) {
          result.left = integer;
          haveLHS = true;
        } else {
          result.right = integer;
        }
        break;
      case TokenType.Plus:
        result.operator = Operation.Addition;
        break;
      case TokenType.Minus:
        result.operator = Operation.Subtraction;
        break;
      case TokenType.LeftParen:
        let k = i;
        for (; k < tokens.length; ++k) {
          if (tokens[k].type === TokenType.RightParen) break;
        }
        // Process sub-expression
        const subExpr = tokens.slice(i + 1, k);
        let element = parse(subExpr);
        if (!haveLHS) {
          result.left = element;
          haveLHS = true;
        } else {
          result.right = element;
        }
        i = k;
        break;
    }
  }
  return result;
}
const input = "(13 + 4) - (12 + 1)";
const tokens = lex(input);
console.log("🚀 ~ tokens:", tokens.join(' '));

const parsed = parse(tokens);

console.log(`${input} = ${parsed.value}`);