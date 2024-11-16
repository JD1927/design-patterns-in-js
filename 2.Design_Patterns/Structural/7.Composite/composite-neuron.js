function Classes(bases) {
  class Bases {
    constructor() {
      bases.forEach(base => Object.assign(this, new base()));
    }
  }
  bases.forEach(base => {
    Object.getOwnPropertyNames(base.prototype)
      .filter(prop => prop != 'constructor')
      .forEach(prop => Bases.prototype[prop] = base.prototype[prop]);
  });
  return Bases;
}

class Connectable {
  connectTo(other) {
    for (const from of this) {
      for (const to of other) {
        from.out.push(to);
        to.in.push(from);
      }
    }
  }
}

class Neuron extends Connectable {
  constructor() {
    super();
    this.in = [];
    this.out = [];
  }

  // connectTo(other) {
  //   this.out.push(other);
  //   other.in.push(this);
  // }

  toString() {
    return `A neuron with ${this.in.length} inputs and ${this.out.length} outputs`;
  }

  [Symbol.iterator]() {
    let returned = false;
    return {
      next: () => ({
        value: this,
        done: returned++
      })
    };
  }
}

class NeuronLayer extends Classes([Array, Connectable]) {
  constructor(count) {
    super();
    while (count-- > 0) {
      this.push(new Neuron());
    }
  }

  toString() {
    return `A layer with ${this.length} neurons`;
  }
}

const neuron1 = new Neuron();
const neuron2 = new Neuron();

const neuronLayer1 = new NeuronLayer(3);
const neuronLayer2 = new NeuronLayer(4);

neuron1.connectTo(neuron2);
neuron1.connectTo(neuronLayer1);
neuronLayer2.connectTo(neuron1);
neuronLayer1.connectTo(neuronLayer2);


console.log("🚀 ~ neuron1:", neuron1.toString());
console.log("🚀 ~ neuron2:", neuron2.toString());
console.log("🚀 ~ neuronLayer1:", neuronLayer1.toString());
console.log("🚀 ~ neuronLayer2:", neuronLayer2.toString());

