---
slug: solidPrinciples
title: The SOLID Principles of Object-Oriented Design Explained
authors: quennel
tags: [DesignModel, solidPrinciples]
date: 2024-04-15T10:50
---

## S Single responsibility principle.
The Single Responsibility Principle is described as a class should have only one reason to change. It is a powerful tool for refactoring code, as it suggests not putting all the code into a single class. Doing so would be a disaster for extensibility, maintenance, and reusability.

## O  Open–closed principle.
- The Open-Closed Principle states that "a class should be open for extension but closed for modification." Modification refers to changing the existing code in a class, while extension refers to adding new functionality.
- The principle emphasizes that we should be able to add new functionality without modifying the existing code in a class. Modifying existing code introduces the risk of creating potential bugs. Therefore, if possible, we should avoid touching (most of the time) reliable production code that has passed tests.
- When designing software, it's better to provide extensible channels in advance instead of rigidly defining types. This allows us to deliver quickly and safely in diverse requirements.
- To achieve this principle, we can prioritize refactoring previously fixed types and abstract them to meet future changes in requirements.
## L Liskov substitution principle.
- If a software is using a parent class, it should be able to use its subclasses without being aware of the differences between the parent and child objects. In other words, in the software, replacing the parent class with its child class should not change the program's behavior. In simple terms, a subtype must be substitutable for its base type.
- Only when a subclass can replace its superclass, and the functionality of the software is not affected, can the superclass be truly reusable, and the subclass can add new behaviors based on the superclass. This is inheritance, and only in this case can the Open-Closed Principle be achieved.
## I Interface segregation principle.
- Segregation means keeping things separate. The Interface Segregation Principle focuses on the independence of interfaces.
- This principle states that client-specific interfaces are better than one-size-fits-all interfaces. Clients should not be forced to implement functions they do not need.
- In other words, an interface should ideally be responsible for one thing only. For example, a book-related interface should only handle CRUD operations on books, not include payment-related logic.
## D Dependency inversion principle.
The Dependency Inversion Principle states that our classes should depend on interfaces and abstractions rather than concrete classes and functions.\

Dependency inversion can be considered a hallmark of object-oriented design. Regardless of the programming language used, if the focus is on programming against abstractions rather than details, where all dependencies terminate at abstract classes or interfaces, it is a design based on object-oriented principles. Conversely, if the focus is on details, it is a procedural design.\

For example, in the context of assembling a computer, whether it's the motherboard, CPU, memory, or hard drive, they are all designed against interfaces. If the design were based on implementations, the memory would have to be specific to a particular brand of motherboard. In that case, replacing the memory would require replacing everything.
- A. High-level modules should not depend on low-level modules. Both should depend on abstractions.
- B. Abstractions should not depend on details. Details should depend on abstractions.
- Example：
```
public class Bank {

    public void GIVE_CUSTOMER_MONEY_OTC() {
        // some logic
    }
}

public class Customer {
    private Bank myBank = new Bank();
    
    public void withdraw() {
        myBank.GIVE_CUSTOMER_MONEY_OTC();
    }
}
```
上述代码中，Customer依赖Bank，违反了这个原则
如果我们定义一个接口，在两个类中：
```
public interface ATM {
    void ATM_OPERATION();
}

public class Bank implements ATM {
    @Override
    ATM_OPERATION(){
        // code to add money to ATM and increase the ATM balance
    }
}

public class Customer implements ATM {
    
    @Override
    ATM_OPERATION(){
        // code to withdraw money from ATM and decrease the ATM balance
    }
}
```
这样，无论银行或者顾客有什么问题，他们都够进行操作\
参考：
https://www.freecodecamp.org/news/solid-principles-single-responsibility-principle-explained/