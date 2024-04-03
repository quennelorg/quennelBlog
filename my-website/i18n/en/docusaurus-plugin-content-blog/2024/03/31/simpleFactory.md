---
slug: simpleFactory
title: Study for simple factory
authors: quennel
tags: [DesignModel, simpleFactory]
---

## Typography
In practical development, requirements often undergo many changes. Similarly, there are cases where development is completed, but there are changes in the requirements. At such times, the written code needs to be flexible, just like typography.

- Easy to modify
- Easy to reuse
- Easy to maintain
- Easy to extend

## Encapsulation
Encapsulation is a conceptual thing. In my understanding, it involves combining common and repetitive code together, acting like typography.
- In previous development experiences, there were two business requirements that needed to implement the same functionality. In such cases, I would encapsulate that functionality once and let the two business requirements implement it separately.
- Within a single functionality, encapsulate the logic that needs to be repeated.
- Separate view code, business code, and logic code. The logic code can be reused in different businesses, and different business codes can be reused in different views. This relationship is similar to view -> viewController -> viewModel.
- Reducing code coupling is beneficial for maintenance and expansion. In simple terms, it means splitting the code, so modifying or adding one functionality does not affect the normal operation of other functionalities.

Inheritance and Polymorphism
In JavaScript, inheritance is not widely used, but it has many applications in Java and Swift.  
In Java, inheritance is a very common technique. It can be said that when I first learned about object-oriented programming, encapsulation, inheritance, and polymorphism were the three major concepts in Java.  
In Swift, not only in the context of view, viewController, viewModel, but also in every type of code, the reuse and inheritance between subclasses and superclasses can be seen everywhere.

Factory
The purpose of a factory class is to create different instances based on different types.
In simpler terms, it means that we have already split the functionality into fine-grained components through encapsulation and inheritance.  
Now, if we merge these fine-grained functionalities into a business, we can use a factory class to provide a parameter for obtaining instances of these small functionalities.  
This way, whether it is adding new functionality or modifying existing functionality, it will be convenient and will not affect the old functionalities.  