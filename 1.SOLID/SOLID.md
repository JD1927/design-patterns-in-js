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

