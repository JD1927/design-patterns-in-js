/**
 * Singleton Coding Exercise

  Since implementing a singleton is easy, you have a different challenge: write a function called isSingleton() . This method takes a factory (i.e., a function that returns an object);  it's up to you to determine whether or not that object is a singleton instance or not.
 */

class SingletonTester {
  static isSingleton(generator) {
    return generator() === generator();
  }
}