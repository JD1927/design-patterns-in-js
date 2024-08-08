# SOLID Design Principles

Modern design patterns -> Uncle Bob

## Single Responsibility Principle

A class should have a primary single responsibility and as a consequence, it should only have one reason to change. That reason is being somehow related to its responsibility.

In other words, it's a bad idea to add more than one responsibility to a class

Group functionality by class.

*Note: anti-pattern the GOD Object*

Another term is **SoC -> Separation of Concerns**

## Open-Closed Principle

The open-closed principle states that objects are open for extension, but closed for modifications. That means that you should never jump into an existing class and start to modify it, unless you absolutely have to, or there is a bug, then yeah, but extending functionality is not such a good thing.

State space explosion. Implementing a whole bunch of methods for filtering won't fix the issue

Specification Pattern: Allows to write something that is very modular and very easy to work with. Use separation of concerns with some sort of inheritance that way combinations can be possible.

**Obs: It is important to design properly the system and the classes to implement**

## Liskov Substitution Principle

If you have some method or function, which takes some base type, it should also equally be able to take a derived type.

Example: Rectangle, and if Square extends from Rectangle, both should be valid if for instance, we decide to check the area. width times height

## Interface Segregation Principle

Formalize the integration with a particular system.

Basically means, segregate (split up) interfaces into different parts so people do not implement more than what they need.

