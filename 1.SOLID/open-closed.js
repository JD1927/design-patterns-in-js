const Color = Object.freeze({
  red: 'red',
  green: 'green',
  blue: 'blue',
});
const Size = Object.freeze({
  small: 'red',
  medium: 'medium',
  large: 'large',
});

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

// Open for extension, closed for modification
// State space explosion
class ProductFilter {
  filterByColor(products, color) {
    return products.filter(p => p.color === color);
  }

  filterBySize(products, size) {
    return products.filter(p => p.size === size);
  }

  // filterByColorAndSize...
}

// Specification
// In Javascript there are not abstract classes. So using inheritance in such cases is not required
class Specification {
  constructor() {
    if (this.constructor.name === 'Specification') {
      throw new Error('Specification is an abstract class!');
    }
  }

  isSatisfied(item) { }
}

class ColorSpecification extends Specification {
  constructor(color) {
    super();
    this.color = color;
  }

  isSatisfied(item) {
    return item.color === this.color;
  }
}
class SizeSpecification extends Specification {
  constructor(size) {
    super();
    this.size = size;
  }

  isSatisfied(item) {
    return item.size === this.size;
  }
}
// For more than one specification
class AndSpecification extends Specification {
  constructor(...specs) {
    super();
    this.specs = specs;
  }

  isSatisfied(item) {
    return this.specs.every(spec => spec.isSatisfied(item));
  }
}

class BetterFilter {
  filter(items, spec) {
    return items.filter(item => spec.isSatisfied(item));
  }
}

const apple = new Product('Apple', Color.green, Size.small);
const tree = new Product('Tree', Color.green, Size.large);
const house = new Product('House', Color.blue, Size.large);

const products = [apple, tree, house];

const pf = new ProductFilter();

console.log('Green products (old): ');
for (const p of pf.filterByColor(products, Color.green)) {
  console.log(` * ${p.name} is green`);
}
console.log('============================');
const bf = new BetterFilter();
const greenSpec = new ColorSpecification(Color.green);

console.log('Green products (new): ');
for (const p of bf.filter(products, greenSpec)) {
  console.log(` * ${p.name} is green`);
}
console.log('============================');

console.log('Large and Green products:');
const largeSpec = new SizeSpecification(Size.large);
const largeAndGreenSpec = new AndSpecification(largeSpec, greenSpec);
for (const p of bf.filter(products, largeAndGreenSpec)) {
  console.log(` * ${p.name} is large and green`);
}
console.log('============================');