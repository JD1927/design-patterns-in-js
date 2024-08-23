/* # Motivation
- Object creation logic becomes too convoluted
- Initializer is not descriptive
    - Name is always __init__
    - Cannot overload with same sets of arguments with different names
    - Can turn into 'optional parameter hell'
- Wholesale object creation (non-piecewise, unlike Builder) can be outsourced to
    - A separated method (Factory Method)
    - That may exist in a separate class (Factory)
    - Can create hierarchy of factories with Abstract Factory
*/

/*
  Factory: A component responsible solely for the wholesale (not piecewise) creation of objects

  Summary:
  - A factory method is a static method that creates objects
  - A factory is any entity that can take care of object creation
  - A factory can be external or reside inside the object as an inner class
  - Hierarchies of factories can be used to create related objects0

 */

// ==================Code==========================
const CoordinateSystem = Object.freeze({
  cartesian: 0,
  polar: 1,
});


class Point {


  // This is an violation to the open-closed principle
  // constructor(a, b, cs = CoordinateSystem.cartesian) {
  //   switch (cs) {
  //     case CoordinateSystem.cartesian:
  //       this.x = a;
  //       this.y = b;
  //       break;
  //     case CoordinateSystem.polar:
  //       this.x = rho * Math.cos(theta);
  //       this.y = rho * Math.sin(theta);
  //       break;

  //     default:
  //       break;
  //   }
  // }

  // constructor(x, y) {
  //   this.x = x;
  //   this.y = y;
  // }

  // constructor(rho, theta) {// Not allowed! A second constructor
  //   this.x = rho * Math.cos(theta);
  //   this.y = rho * Math.sin(theta);
  // }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // static newCartesianPoint(x, y) {// Factory method
  //   return new Point(x, y);
  // }

  // static newPolarPoint(rho, theta) {// Factory method
  //   return new Point(
  //     rho * Math.cos(theta),
  //     rho * Math.sin(theta)
  //   );
  // }

  static get factory() {
    return PointFactory;
  }
}

// Factory
class PointFactory {

  static newCartesianPoint(x, y) {// Factory method
    return new Point(x, y);
  }

  static newPolarPoint(rho, theta) {// Factory method
    return new Point(
      rho * Math.cos(theta),
      rho * Math.sin(theta)
    );
  }
}

// Factory Method
// const p1 = Point.newCartesianPoint(4, 5);
// const p2 = Point.newPolarPoint(5, Math.PI / 2);
// console.log(p1);
// console.log(p2);

// Factory class: It is just a separate class or separate component which takes on the responsibility of creating objects of a particular type
// Separation of Concerns
// const p1 = PointFactory.newCartesianPoint(4, 5);
// const p2 = PointFactory.newPolarPoint(5, Math.PI / 2);
// console.log(p1);
// console.log(p2);
// Factory class - Improve. Adds coupling but makes better API
const p1 = Point.factory.newCartesianPoint(4, 5);
const p2 = Point.factory.newPolarPoint(5, Math.PI / 2);
console.log(p1);
console.log(p2);
