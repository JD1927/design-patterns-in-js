// ==================Code==========================
class ChiefExecutiveOfficer {
  get name() { return ChiefExecutiveOfficer._name; }
  set name(value) {
    ChiefExecutiveOfficer._name = value;
  }

  get age() { return ChiefExecutiveOfficer._age; }
  set age(value) {
    ChiefExecutiveOfficer._age = value;
  }

  toString() {
    return `CEO's name if ${this.name} and he is ${this.age} years old.`;
  }
}

ChiefExecutiveOfficer._age = undefined;
ChiefExecutiveOfficer._name = undefined;

const ceo = new ChiefExecutiveOfficer();

ceo.name = 'John Doe';
ceo.age = 44;

const ceo2 = new ChiefExecutiveOfficer();

ceo.name = 'Jane Doe';
ceo.age = 45;

console.log("🚀 ~ ceo.toString():", ceo.toString());
console.log("🚀 ~ ceo2.toString():", ceo2.toString());
